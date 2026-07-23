/**
 * Demo certificates for verify.novahub.education MVP.
 * Replace with database-backed issuance when enrollment + assessment ship.
 */

export type CertificateStatus = "valid" | "revoked" | "expired";

export type VerifiedCertificate = {
  code: string;
  holderName: string;
  trackTitle: string;
  trackSlug: string;
  prefix: string;
  issuedAt: string;
  expiresAt?: string;
  status: CertificateStatus;
  cohort?: string;
  isDemo?: boolean;
  scorePercent?: number;
  locale?: "en" | "es" | "pt";
  /** v2.0 public fields */
  certificateId?: string;
  programTitle?: string;
  programSlug?: string;
  credentialTitle?: string;
  category?: string;
  credentialLevel?: string;
  completionDate?: string;
  issueDate?: string;
  learningHours?: number;
  passingScore?: number;
  verificationUrl?: string;
};

export const DEMO_CERTIFICATES: VerifiedCertificate[] = [
  {
    code: "NOVA-COL-IT-2026-DEMO01",
    holderName: "Ana R. (Demo)",
    trackTitle: "IT Support & Cloud Technician",
    trackSlug: "it-support-cloud-technician",
    prefix: "NOVA-COL-IT",
    issuedAt: "2026-05-12",
    status: "valid",
    cohort: "NOVA STEM HUB Piloto 2026",
    isDemo: true,
    locale: "es",
  },
  {
    code: "NOVA-COL-SEC-2026-DEMO01",
    holderName: "Carlos M. (Demo)",
    trackTitle: "Cybersecurity Analyst",
    trackSlug: "cybersecurity-analyst",
    prefix: "NOVA-COL-SEC",
    issuedAt: "2026-05-18",
    status: "valid",
    cohort: "NOVA STEM HUB Piloto 2026",
    isDemo: true,
    locale: "es",
  },
  {
    code: "NOVA-COL-DA-2026-DEMO01",
    holderName: "Lucía P. (Demo)",
    trackTitle: "Data Analytics Technician",
    trackSlug: "data-analytics-technician",
    prefix: "NOVA-COL-DA",
    issuedAt: "2026-06-01",
    status: "valid",
    isDemo: true,
    locale: "es",
  },
  {
    code: "NOVA-COL-QNT-2026-DEMO01",
    holderName: "Diego S. (Demo)",
    trackTitle: "Quantum Workforce",
    trackSlug: "quantum-workforce",
    prefix: "NOVA-COL-QNT",
    issuedAt: "2026-06-20",
    status: "valid",
    isDemo: true,
    locale: "es",
  },
];

export function verifyCertificateCode(raw: string): VerifiedCertificate | null {
  const code = raw.trim().toUpperCase();
  if (!code) return null;
  return DEMO_CERTIFICATES.find((c) => c.code === code) ?? null;
}

export function isValidCertificateFormat(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  // Supports e.g. NOVA-CERT-2026-A1B2C3, NOVA-COL-IT-2026-A1B2C3, NOVA-SCH-COD-2026-A1B2C3
  return /^NOVA-[A-Z0-9-]+-\d{4}-[A-Z0-9]+$/.test(normalized);
}
