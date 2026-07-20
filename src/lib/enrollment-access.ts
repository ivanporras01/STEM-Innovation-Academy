import type { Enrollment, EnrollmentStatus } from "@prisma/client";

/** Enrollment statuses that grant full mission-path content access */
export const ACTIVE_ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  "ACTIVE",
  "INSTITUTIONAL",
];

export function hasCourseAccess(
  enrollment: Pick<Enrollment, "status"> | null | undefined
): boolean {
  if (!enrollment) return false;
  return ACTIVE_ENROLLMENT_STATUSES.includes(enrollment.status);
}

export function formatPrice(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
