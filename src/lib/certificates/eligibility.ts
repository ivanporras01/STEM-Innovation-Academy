import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { getCourseProgress } from "@/lib/courses";
import { PASSING_SCORE_PERCENT } from "@/lib/certificates/constants";
import type { Prisma } from "@prisma/client";

export type CertificateEligibilityConfig = {
  /** Minimum score required to pass. 0–100. */
  passingScorePercent?: number;
  /** Whether all lessons in all modules must be marked completed. */
  requireAllLessonsCompleted?: boolean;
  /** Whether all assignments must be submitted. */
  requireAssignmentsSubmitted?: boolean;
  /** Whether all assignments must be reviewed and passing. */
  requireAssignmentsReviewed?: boolean;
  /** Whether a final assessment must be passed. */
  requireFinalAssessmentPassed?: boolean;
  /** Whether an admin/instructor approval is required. */
  requireAdminApproval?: boolean;
  /** Estimated learning hours for this credential. */
  learningHours?: number;
  /** Display title for the credential. */
  credentialTitle?: string;
  /** Category / vertical (School, College, Language, Workforce). */
  category?: string;
  /** Credential level (Certificate of Achievement, Professional Certificate, etc.). */
  credentialLevel?: string;
};

export type CertificateEligibilityResult = {
  eligible: boolean;
  missingRequirements: string[];
  finalScore: number | null;
  passingScore: number | null;
  completedAt: Date | null;
};

export type CertificateEligibilityContext = {
  tx?: Prisma.TransactionClient;
};

const defaultConfig: Required<CertificateEligibilityConfig> = {
  passingScorePercent: PASSING_SCORE_PERCENT,
  requireAllLessonsCompleted: true,
  requireAssignmentsSubmitted: true,
  requireAssignmentsReviewed: false,
  requireFinalAssessmentPassed: true,
  requireAdminApproval: false,
  learningHours: 0,
  credentialTitle: "Certificate of Achievement",
  category: "",
  credentialLevel: "Certificate of Achievement",
};

function mergeConfig(
  courseConfig: CertificateEligibilityConfig | null | undefined,
): Required<CertificateEligibilityConfig> {
  if (!courseConfig || typeof courseConfig !== "object") return defaultConfig;
  return { ...defaultConfig, ...courseConfig } as Required<CertificateEligibilityConfig>;
}

/**
 * Evaluate whether a learner is eligible for a certificate.
 *
 * This is the single source of truth for completion validation.
 * It does not enforce max attempt limits or duplicate issuance —
 * those concerns belong to the issuance service.
 */
export async function evaluateCertificateEligibility(
  userId: string,
  courseId: string,
  ctx?: CertificateEligibilityContext,
): Promise<CertificateEligibilityResult> {
  const client = ctx?.tx ?? db;
  const missing: string[] = [];

  const enrollment = await client.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (!enrollment) {
    return {
      eligible: false,
      missingRequirements: ["No active enrollment found."],
      finalScore: null,
      passingScore: null,
      completedAt: null,
    };
  }

  if (!hasCourseAccess(enrollment)) {
    missing.push("Enrollment is not active or valid.");
  }

  const course = await client.course.findUnique({
    where: { id: courseId },
    select: { certificateConfig: true },
  });

  const config = mergeConfig(
    (course?.certificateConfig as CertificateEligibilityConfig | null) ?? undefined,
  );

  const progress = await getCourseProgress(userId, courseId, ctx?.tx);
  if (progress.total === 0) {
    missing.push("This course does not have a certifiable curriculum yet.");
  }

  if (config.requireAllLessonsCompleted && progress.percent < 100) {
    missing.push(`Complete all lessons (${progress.completed}/${progress.total}).`);
  }

  const assignments = await client.assignment.findMany({
    where: { courseId },
    select: {
      id: true,
      title: true,
      maxScore: true,
      dueDate: true,
      submissions: {
        where: { userId },
        orderBy: { submittedAt: "desc" },
        take: 1,
        select: { status: true, score: true, submittedAt: true, reviewedAt: true },
      },
    },
  });

  if (config.requireAssignmentsSubmitted || config.requireAssignmentsReviewed) {
    if (assignments.length === 0) {
      missing.push("No completion assignments are configured for this course.");
    }
  }

  let assignmentScoreSum = 0;
  let assignmentScoreCount = 0;

  for (const assignment of assignments) {
    const submission = assignment.submissions[0];

    if (config.requireAssignmentsSubmitted && !submission) {
      missing.push(`Submit required assignment: ${assignment.title}.`);
      continue;
    }

    if (
      config.requireAssignmentsReviewed &&
      (!submission || submission.status !== "REVIEWED" || submission.score === null)
    ) {
      missing.push(`Assignment "${assignment.title}" must be reviewed by a mentor.`);
      continue;
    }

    if (submission?.score !== null && submission?.score !== undefined && assignment.maxScore > 0) {
      const percent = Math.round((submission.score / assignment.maxScore) * 100);
      assignmentScoreSum += percent;
      assignmentScoreCount += 1;
    }
  }

  const attempts = await client.courseAssessmentAttempt.findMany({
    where: { userId, courseId },
    orderBy: { attemptNumber: "asc" },
  });

  const passedAttempt = attempts.find((a) => a.passed);

  if (config.requireFinalAssessmentPassed && !passedAttempt) {
    missing.push("Pass the final assessment.");
  }

  if (config.requireAdminApproval) {
    // Not yet implemented; rely on manual issuance by admin.
    missing.push("Administrative approval is required.");
  }

  const assignmentAverage = assignmentScoreCount > 0 ? Math.round(assignmentScoreSum / assignmentScoreCount) : null;

  // Final score preference: passed assessment score, then assignment average.
  const finalScore = passedAttempt?.scorePercent ?? assignmentAverage;

  // Completion date is either enrollment completion or the latest reviewed submission.
  const completedAt =
    enrollment.completedAt ??
    (() => {
      const reviewedDates = assignments
        .map((a) => a.submissions[0]?.reviewedAt)
        .filter(Boolean) as Date[];
      return reviewedDates.length ? reviewedDates.sort((a, b) => b.getTime() - a.getTime())[0] : null;
    })();

  return {
    eligible: missing.length === 0,
    missingRequirements: missing,
    finalScore,
    passingScore: config.passingScorePercent,
    completedAt,
  };
}
