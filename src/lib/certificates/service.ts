import type { CertificateStatus as PrismaCertificateStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { getCourseProgress } from "@/lib/courses";
import {
  MAX_ASSESSMENT_ATTEMPTS,
  PASSING_SCORE_PERCENT,
} from "@/lib/certificates/constants";
import { gradeFinalExam } from "@/lib/certificates/final-exam";
import { issueCertificate } from "@/lib/certificates/issue-certificate";
import type { VerifiedCertificate } from "@/data/novahub/certificates";
import type { AppLocale } from "@/lib/locale";

export async function canTakeFinalAssessment(userId: string, courseId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: { certificates: true },
  });

  if (!enrollment || !hasCourseAccess(enrollment)) {
    return { allowed: false, reason: "Debes estar inscrito y con acceso activo al curso." };
  }

  const activeCertificate = enrollment.certificates.find((c) => c.status === "VALID");
  if (activeCertificate) {
    return { allowed: false, reason: "Ya obtuviste el certificado de este curso." };
  }

  const attemptCount = await db.courseAssessmentAttempt.count({
    where: { userId, courseId },
  });
  if (attemptCount >= MAX_ASSESSMENT_ATTEMPTS) {
    return { allowed: false, reason: "Agotaste los 3 intentos permitidos." };
  }

  const progress = await getCourseProgress(userId, courseId);
  if (progress.total === 0) {
    return {
      allowed: false,
      reason: "Este curso todavía no tiene una ruta curricular certificable.",
    };
  }
  if (progress.percent < 100) {
    return {
      allowed: false,
      reason: `Completa todas las misiones del curso (${progress.completed}/${progress.total}) antes del examen final.`,
    };
  }

  const assignments = await db.assignment.findMany({
    where: { courseId },
    select: {
      title: true,
      maxScore: true,
      submissions: {
        where: { userId },
        select: { status: true, score: true },
        take: 1,
      },
    },
  });
  if (assignments.length === 0) {
    return {
      allowed: false,
      reason: "Este curso no tiene una evidencia final configurada para certificación.",
    };
  }

  for (const assignment of assignments) {
    const submission = assignment.submissions[0];
    if (!submission || submission.status === "DRAFT") {
      return {
        allowed: false,
        reason: `Debes entregar la evidencia “${assignment.title}” antes de presentar el examen final.`,
      };
    }
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
  locale?: string,
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

  const { scorePercent } = gradeFinalExam(answers);
  const passed = scorePercent >= PASSING_SCORE_PERCENT;

  let attemptNumber = 0;

  const attempt = await db.$transaction(async (tx) => {
    const existingAttempts = await tx.courseAssessmentAttempt.count({
      where: { userId, courseId },
    });
    if (existingAttempts >= MAX_ASSESSMENT_ATTEMPTS) return null;

    attemptNumber = existingAttempts + 1;

    return tx.courseAssessmentAttempt.create({
      data: {
        userId,
        courseId,
        attemptNumber,
        scorePercent,
        passed,
      },
    });
  });

  if (!attempt) {
    return { ok: false as const, error: "Agotaste los 3 intentos permitidos." };
  }

  if (!passed) {
    return {
      ok: true as const,
      passed: false,
      scorePercent,
      attemptNumber,
      attemptsRemaining: Math.max(0, MAX_ASSESSMENT_ATTEMPTS - attempt.attemptNumber),
      certificateCode: null,
    };
  }

  // Issue certificate atomically in a separate transaction now that the attempt is committed.
  const issueResult = await issueCertificate({
    userId,
    courseId,
    enrollmentId: enrollment.id,
    locale,
  });

  if (!issueResult.ok) {
    return { ok: false as const, error: issueResult.error };
  }

  return {
    ok: true as const,
    passed: true,
    scorePercent,
    attemptNumber,
    attemptsRemaining: Math.max(0, MAX_ASSESSMENT_ATTEMPTS - attempt.attemptNumber),
    certificateCode: issueResult.certificate.code,
  };
}

function mapDbStatus(status: PrismaCertificateStatus): VerifiedCertificate["status"] {
  if (status === "REVOKED") return "revoked";
  if (status === "REPLACED") return "expired";
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
