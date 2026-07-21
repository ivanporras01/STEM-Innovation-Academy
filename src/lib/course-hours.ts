/**
 * Sitewide course duration helpers — always express student time in hours.
 * Estimates are approximate (reading + interaction + assignments); never fake precision.
 */

/** Format a contact/effort estimate for marketing surfaces. */
export function formatCourseHours(hours: number, locale: "en" | "es" | "pt" = "en"): string {
  const rounded = Math.max(1, Math.round(hours));
  if (locale === "es") return `~${rounded} horas`;
  if (locale === "pt") return `~${rounded} horas`;
  return `~${rounded} hours`;
}

/**
 * Rough student-time estimate from lesson count.
 * Assumes ~45–75 minutes of reading, practice, and assignment per lesson.
 */
export function estimateHoursFromLessons(lessonCount: number): number {
  const n = Math.max(0, lessonCount);
  if (n === 0) return 0;
  return Math.max(4, Math.round(n * 1.1));
}

/** Prefer explicit hours; fall back to lesson-based estimate. */
export function resolveCourseHours(opts: {
  durationHours?: number | null;
  lessonCount?: number;
}): number {
  if (opts.durationHours && opts.durationHours > 0) return Math.round(opts.durationHours);
  return estimateHoursFromLessons(opts.lessonCount ?? 0);
}
