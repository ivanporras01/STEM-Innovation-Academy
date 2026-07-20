import type { AppLocale } from "@/lib/locale";

const LOCALE_SET = new Set<AppLocale>(["en", "es", "pt"]);

export function isCertificateLocale(value: string): value is AppLocale {
  return LOCALE_SET.has(value as AppLocale);
}

/**
 * Default certificate language from LMS course slug / catalog program slug.
 * Client may override with the locale of the route where the student studied.
 */
export function resolveCertificateLocale(
  courseSlug: string,
  programSlug?: string | null,
): AppLocale {
  const slug = (programSlug ?? courseSlug).toLowerCase();
  const combined = `${courseSlug} ${slug}`.toLowerCase();

  if (
    combined.includes("portuguese") ||
    combined.includes("portugues") ||
    combined.includes("nova-language-portuguese")
  ) {
    return "pt";
  }

  if (
    combined.includes("spanish") ||
    combined.includes("espanol") ||
    combined.includes("nova-language-spanish")
  ) {
    return "es";
  }

  if (
    combined.includes("english") ||
    combined.includes("nova-language-english")
  ) {
    return "en";
  }

  // NOVA College full curriculum delivery is published in Spanish (/es/college).
  if (courseSlug.startsWith("nova-college-")) {
    return "es";
  }

  return "en";
}

export function normalizeCertificateLocale(
  value: string | null | undefined,
  courseSlug: string,
  programSlug?: string | null,
): AppLocale {
  if (value && isCertificateLocale(value)) return value;
  return resolveCertificateLocale(courseSlug, programSlug);
}
