import type { CertificateStatus as PrismaCertificateStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { getCourseProgress } from "@/lib/courses";
import {
  MAX_ASSESSMENT_ATTEMPTS,
  PASSING_SCORE_PERCENT,
} from "@/lib/certificates/constants";
import { gradeFinalExam } from "@/lib/certificates/final-exam";
import { collegeCatalogSlugFromCourseSlug, resolveCertificatePrefix } from "@/lib/certificates/prefix";
import type { AppLocale } from "@/lib/locale";
import type { VerifiedCertificate } from "@/data/novahub/certificates";

function randomCodeSuffix(length = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function generateUniqueCertificateCode(prefix: string): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = `${prefix}-${year}-${randomCodeSuffix()}`;
    const existing = await db.certificate.findUnique({ where: { code } });
    if (!existing) return code;
  }
  throw new Error("Unable to generate unique certificate code");
}

export async function canTakeFinalAssessment(userId: string, courseId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: { certificate: true },
  });

  if (!enrollment || !hasCourseAccess(enrollment)) {
    return { allowed: false, reason: "Debes estar inscrito y con acceso activo al curso." };
  }

  if (enrollment.certificate) {
    return { allowed: false, reason: "Ya obtuviste el certificado de este curso." };
  }

  const attemptCount = await db.courseAssessmentAttempt.count({
    where: { userId, courseId },
  });
  if (attemptCount >= MAX_ASSESSMENT_ATTEMPTS) {
    return { allowed: false, reason: "Agotaste los 3 intentos permitidos." };
  }

  const progress = await getCourseProgress(userId, courseId);
  if (progress.total > 0 && progress.percent < 100) {
    return {
      allowed: false,
      reason: `Completa todas las misiones del curso (${progress.completed}/${progress.total}) antes del examen final.`,
    };
  }

  return { allowed: true };
}

export async function getAssessmentStatus(userId: string, courseId: string) {
  const [attempts, enrollment, certificate] = await Promise.all([
    db.courseAssessmentAttempt.findMany({
      where: { userId, courseId },
      orderBy: { attemptNumber: "asc" },
    }),
    db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    }),
    db.certificate.findFirst({
      where: { userId, courseId, status: "VALID" },
    }),
  ]);

  const eligibility = await canTakeFinalAssessment(userId, courseId);
  const passedAttempt = attempts.find((a) => a.passed);

  return {
    attemptsUsed: attempts.length,
    maxAttempts: MAX_ASSESSMENT_ATTEMPTS,
    passingScorePercent: PASSING_SCORE_PERCENT,
    attempts: attempts.map((a) => ({
      attemptNumber: a.attemptNumber,
      scorePercent: a.scorePercent,
      passed: a.passed,
      createdAt: a.createdAt.toISOString(),
    })),
    passed: Boolean(passedAttempt || certificate),
    certificateCode: certificate?.code ?? null,
    canAttempt: eligibility.allowed,
    blockReason: eligibility.reason ?? null,
    enrolled: Boolean(enrollment && hasCourseAccess(enrollment)),
  };
}

export async function submitFinalAssessment(
  userId: string,
  courseId: string,
  answers: Record<string, number>,
) {
  const eligibility = await canTakeFinalAssessment(userId, courseId);
  if (!eligibility.allowed) {
    return { ok: false as const, error: eligibility.reason ?? "No puedes presentar el examen." };
  }

  const [user, course, enrollment] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.course.findUnique({ where: { id: courseId } }),
    db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    }),
  ]);

  if (!user || !course || !enrollment) {
    return { ok: false as const, error: "Curso o inscripción no encontrados." };
  }

  const existingAttempts = await db.courseAssessmentAttempt.count({
    where: { userId, courseId },
  });
  const attemptNumber = existingAttempts + 1;
  const { scorePercent } = gradeFinalExam(answers);
  const passed = scorePercent >= PASSING_SCORE_PERCENT;

  const attempt = await db.courseAssessmentAttempt.create({
    data: {
      userId,
      courseId,
      attemptNumber,
      scorePercent,
      passed,
    },
  });

  if (!passed) {
    return {
      ok: true as const,
      passed: false,
      scorePercent,
      attemptNumber,
      attemptsRemaining: Math.max(0, MAX_ASSESSMENT_ATTEMPTS - attemptNumber),
      certificateCode: null,
    };
  }

  const prefix = resolveCertificatePrefix(course.slug);
  const code = await generateUniqueCertificateCode(prefix);
  const catalogSlug = collegeCatalogSlugFromCourseSlug(course.slug) ?? course.slug;
  const holderName = `${user.firstName} ${user.lastName}`.trim();
  const certificate = await db.$transaction(async (tx) => {
    const cert = await tx.certificate.create({
      data: {
        code,
        userId,
        courseId,
        enrollmentId: enrollment.id,
        holderName,
        programTitle: course.title,
        programSlug: catalogSlug,
        scorePercent,
        prefix,
        locale: "en",
        status: "VALID",
      },
    });

    await tx.enrollment.update({
      where: { id: enrollment.id },
      data: { completedAt: new Date() },
    });

    return cert;
  });

  return {
    ok: true as const,
    passed: true,
    scorePercent,
    attemptNumber: attempt.attemptNumber,
    attemptsRemaining: Math.max(0, MAX_ASSESSMENT_ATTEMPTS - attempt.attemptNumber),
    certificateCode: certificate.code,
  };
}

function mapDbStatus(status: PrismaCertificateStatus): VerifiedCertificate["status"] {
  if (status === "REVOKED") return "revoked";
  return "valid";
}

export async function lookupCertificateByCode(code: string): Promise<VerifiedCertificate | null> {
  const normalized = code.trim().toUpperCase();
  const cert = await db.certificate.findUnique({
    where: { code: normalized },
    include: { course: { select: { slug: true } } },
  });

  if (!cert) return null;

  return {
    code: cert.code,
    holderName: cert.holderName,
    trackTitle: cert.programTitle,
    trackSlug: cert.programSlug,
    prefix: cert.prefix,
    issuedAt: cert.issuedAt.toISOString().slice(0, 10),
    status: mapDbStatus(cert.status),
    scorePercent: cert.scorePercent,
    locale: (cert.locale as AppLocale) ?? "en",
  };
}

export async function getUserCertificates(userId: string) {
  return db.certificate.findMany({
    where: { userId, status: "VALID" },
    orderBy: { issuedAt: "desc" },
  });
}
