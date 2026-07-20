/** Minimum score (0–100) required to pass the final assessment and earn a certificate. */
export const PASSING_SCORE_PERCENT = 80;

/** Maximum number of final assessment attempts per course enrollment. */
export const MAX_ASSESSMENT_ATTEMPTS = 3;

export const CERTIFICATE_VERIFY_BASE = "/verify";

/** Public preview page — Certificate of Achievement sample with MUESTRA/VOID watermark. */
export const SAMPLE_CERTIFICATE_PAGE_PATH = "/certificado-muestra";

/** Static sample PDF (MUESTRA/VOID) — direct download by locale. */
export const SAMPLE_CERTIFICATE_PDF_BY_LOCALE = {
  en: "/downloads/certificate-of-achievement-nova-sample-en.pdf",
  es: "/downloads/certificate-of-achievement-nova-sample-es.pdf",
  pt: "/downloads/certificate-of-achievement-nova-sample-pt.pdf",
} as const;

export const SAMPLE_CERTIFICATE_PDF_PATH = SAMPLE_CERTIFICATE_PDF_BY_LOCALE.en;

export function getSampleCertificatePdfPath(locale: "en" | "es" | "pt" = "en"): string {
  return SAMPLE_CERTIFICATE_PDF_BY_LOCALE[locale] ?? SAMPLE_CERTIFICATE_PDF_BY_LOCALE.en;
}
