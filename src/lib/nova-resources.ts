import { LOCALE_PATHS, type AppLocale } from "@/lib/locale";

/** Paths for funding & career resource pages (online apply). */
export function getNovaResourcePaths(locale: AppLocale) {
  const base = LOCALE_PATHS[locale];
  const prefix = locale === "es" ? "/es" : "";
  return {
    novaScholarships: base.scholarships,
    novaScholarshipsApply: `${prefix}/scholarships/apply`,
    partnerScholarships: `${prefix}/scholarships/partners`,
    partnerScholarshipsApply: `${prefix}/scholarships/partners/apply`,
    internships: `${prefix}/internships`,
    internshipsApply: `${prefix}/internships/apply`,
    partnershipApply: `${prefix}/partnership/apply`,
  };
}
