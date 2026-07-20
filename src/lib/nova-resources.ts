import { LOCALE_PATHS, type AppLocale } from "@/lib/locale";

/** Paths for funding & career resource pages (online apply). */
export function getNovaResourcePaths(locale: AppLocale) {
  const base = LOCALE_PATHS[locale];
  const prefix = locale === "es" ? "/es" : "";
  return {
    novaScholarships: base.scholarships,
    novaScholarshipsApply: `${prefix}/scholarships/apply`,
    // Partner scholarship pages are EN-first until localized routes ship.
    partnerScholarships: "/scholarships/partners",
    partnerScholarshipsApply: "/scholarships/partners/apply",
    internships: locale === "es" ? "/es/internships" : "/internships",
    internshipsApply: locale === "es" ? "/es/internships/apply" : "/internships/apply",
    partnershipApply: `${prefix}/partnership/apply`,
  };
}
