import { db } from "@/lib/db";
import { evaluateCertificateEligibility } from "@/lib/certificates/eligibility";
import {
  generateUniqueCertificateCode,
  generateVerificationToken,
} from "@/lib/certificates/certificate-id";
import { normalizeCertificateLocale } from "@/lib/certificates/locale";
import { resolveCertificatePrefix, collegeCatalogSlugFromCourseSlug } from "@/lib/certificates/prefix";
import { getProgramBySlug, NOVA_PROGRAM_CATALOG } from "@/data/courses";
import { courseSlugForProgram } from "@/lib/program-enrollment";
import type { Certificate, CertificateStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { AppLocale } from "@/lib/locale";

export type IssueCertificateInput = {
  userId: string;
  courseId: string;
  enrollmentId?: string;
  locale?: string;
  /** Set by an admin to bypass automatic eligibility checks. */
  adminOverride?: boolean;
  /** Optional note / audit context. */
  metadata?: Prisma.InputJsonValue;
};

export type IssueCertificateContext = {
  /** Optional transaction client for atomic operations. */
  tx?: Prisma.TransactionClient;
};

export type IssueCertificateResult =
  | { ok: true; certificate: Certificate; created: boolean }
  | { ok: false; error: string };

function findProgramForCourse(course: { slug: string; title: string }) {
  const catalogProgram = NOVA_PROGRAM_CATALOG.find(
    (program) => courseSlugForProgram(program) === course.slug,
  );
  if (catalogProgram) return catalogProgram;

  // Fallback: try catalog slug for college courses.
  const collegeSlug = collegeCatalogSlugFromCourseSlug(course.slug);
  if (collegeSlug) {
    const byCatalogSlug = getProgramBySlug(collegeSlug);
    if (byCatalogSlug) return byCatalogSlug;
  }

  return null;
}

function credentialLevelForProgram(program: ReturnType<typeof findProgramForCourse>): string {
  if (!program) return "Certificate of Achievement";
  if (program.vertical === "college") {
    return program.tier === "advanced" ? "Professional Certificate" : "Workforce Certificate";
  }
  if (program.vertical === "language") return "Language Certificate";
  if (program.vertical === "school") return "School Achievement Certificate";
  return "Certificate of Achievement";
}

function certificateMetadata(
  course: { slug: string; title: string },
  prefix: string,
  locale: AppLocale,
) {
  const program = findProgramForCourse(course);
  const catalogSlug = collegeCatalogSlugFromCourseSlug(course.slug) ?? program?.slug ?? course.slug;

  return {
    program,
    catalogSlug,
    programTitle: program?.title ?? course.title,
    programSlug: catalogSlug,
    category: program?.vertical ? program.vertical.charAt(0).toUpperCase() + program.vertical.slice(1) : "",
    credentialLevel: credentialLevelForProgram(program),
    learningHours: program?.contactHours ?? 0,
    prefix,
    locale,
  };
}

async function runInTransaction<T>(
  ctx: IssueCertificateContext | undefined,
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
): Promise<T> {
  if (ctx?.tx) return fn(ctx.tx);
  return db.$transaction(fn);
}

/** Idempotent certificate issuance. Returns an existing active certificate if one exists. */
export async function issueCertificate(
  input: IssueCertificateInput,
  ctx?: IssueCertificateContext,
): Promise<IssueCertificateResult> {
  const client = ctx?.tx ?? db;

  const [user, course, enrollment] = await Promise.all([
    client.user.findUnique({ where: { id: input.userId } }),
    client.course.findUnique({ where: { id: input.courseId } }),
    input.enrollmentId
      ? client.enrollment.findUnique({ where: { id: input.enrollmentId } })
      : client.enrollment.findUnique({
          where: { userId_courseId: { userId: input.userId, courseId: input.courseId } },
        }),
  ]);

  if (!user) return { ok: false, error: "Student not found." };
  if (!course) return { ok: false, error: "Course not found." };
  if (!enrollment) return { ok: false, error: "Enrollment not found." };
  if (enrollment.userId !== user.id || enrollment.courseId !== course.id) {
    return { ok: false, error: "Enrollment does not match student and course." };
  }

  // Idempotency: if a valid certificate already exists for this enrollment, return it.
  const existingActive = await client.certificate.findFirst({
    where: { enrollmentId: enrollment.id, status: "VALID" },
    orderBy: { issuedAt: "desc" },
  });
  if (existingActive) {
    return { ok: true, certificate: existingActive, created: false };
  }

  const eligibility = await evaluateCertificateEligibility(user.id, course.id, { tx: ctx?.tx });

  if (!input.adminOverride && !eligibility.eligible) {
    return {
      ok: false,
      error: `Not eligible: ${eligibility.missingRequirements.join("; ")}`,
    };
  }

  const prefix = resolveCertificatePrefix(course.slug);
  const catalogSlug = collegeCatalogSlugFromCourseSlug(course.slug) ?? course.slug;
  const locale = normalizeCertificateLocale(input.locale, course.slug, catalogSlug);

  const code = await generateUniqueCertificateCode(prefix);
  const verificationToken = generateVerificationToken();
  const holderName = `${user.firstName} ${user.lastName}`.trim();
  const meta = certificateMetadata(course, prefix, locale);

  const completionDate = eligibility.completedAt;
  const issueDate = new Date();
  const finalScore = eligibility.finalScore;
  const passingScore = eligibility.passingScore;

  const certificate = await runInTransaction(ctx, async (tx) => {
    const created = await tx.certificate.create({
      data: {
        certificateId: code,
        verificationToken,
        code,
        userId: user.id,
        courseId: course.id,
        enrollmentId: enrollment.id,
        holderName,
        programTitle: meta.programTitle,
        programSlug: meta.programSlug,
        credentialTitle: meta.credentialLevel,
        category: meta.category,
        credentialLevel: meta.credentialLevel,
        completionDate,
        issueDate,
        learningHours: meta.learningHours,
        scorePercent: finalScore ?? 0,
        finalScore: finalScore ? finalScore / 100 : null,
        passingScore: passingScore ? passingScore / 100 : null,
        prefix,
        locale,
        status: "VALID",
        templateVersion: "2.0",
        metadata: input.metadata ? (input.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
    });

    if (!enrollment.completedAt) {
      await tx.enrollment.update({
        where: { id: enrollment.id },
        data: { completedAt: completionDate ?? new Date() },
      });
    }

    return created;
  });

  return { ok: true, certificate, created: true };
}

export type ReplaceCertificateInput = {
  certificateId: string;
  reason?: string;
  adminId?: string;
};

export async function replaceCertificate(
  input: ReplaceCertificateInput,
): Promise<{ ok: true; certificate: Certificate } | { ok: false; error: string }> {
  const existing = await db.certificate.findUnique({
    where: { id: input.certificateId },
    include: { user: true, course: true, enrollment: true },
  });

  if (!existing) return { ok: false, error: "Certificate not found." };

  const issueResult = await issueCertificate({
    userId: existing.user.id,
    courseId: existing.course.id,
    enrollmentId: existing.enrollmentId ?? undefined,
    locale: existing.locale,
    adminOverride: true,
    metadata: {
      replacement: true,
      previousCertificateId: existing.id,
      previousCode: existing.code,
      replacedByAdminId: input.adminId,
      reason: input.reason,
    },
  });

  if (!issueResult.ok) return issueResult;

  await db.$transaction([
    db.certificate.update({
      where: { id: existing.id },
      data: {
        status: "REPLACED" as CertificateStatus,
        revokedAt: new Date(),
        revocationReason: input.reason
          ? `Replaced: ${input.reason}`
          : "Replaced by administrative action.",
      },
    }),
    db.certificate.update({
      where: { id: issueResult.certificate.id },
      data: { replacesId: existing.id },
    }),
  ]);

  const updated = await db.certificate.findUnique({
    where: { id: issueResult.certificate.id },
  });

  if (!updated) return { ok: false, error: "Replacement record could not be loaded." };
  return { ok: true, certificate: updated };
}

export type RevokeCertificateInput = {
  certificateId: string;
  reason?: string;
  adminId?: string;
};

export async function revokeCertificate(
  input: RevokeCertificateInput,
): Promise<{ ok: true; certificate: Certificate } | { ok: false; error: string }> {
  const existing = await db.certificate.findUnique({
    where: { id: input.certificateId },
  });

  if (!existing) return { ok: false, error: "Certificate not found." };

  if (existing.status === "REVOKED") {
    return { ok: true, certificate: existing };
  }

  const currentMeta =
    typeof existing.metadata === "object" && existing.metadata ? existing.metadata : {};
  const updated = await db.certificate.update({
    where: { id: input.certificateId },
    data: {
      status: "REVOKED" as CertificateStatus,
      revokedAt: new Date(),
      revocationReason: input.reason
        ? `Revoked: ${input.reason}`
        : "Revoked by institutional authority.",
      metadata: { ...currentMeta, revokedByAdminId: input.adminId } as Prisma.InputJsonValue,
    },
  });

  return { ok: true, certificate: updated };
}
