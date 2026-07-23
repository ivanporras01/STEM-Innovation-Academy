import { db } from "@/lib/db";
import type { Certificate } from "@prisma/client";
import { isCertificateLocale } from "@/lib/certificates/locale";
import type { AppLocale } from "@/lib/locale";

export type PublicCertificateStatus = "valid" | "revoked" | "replaced" | "not_found";

export type PublicCertificateView = {
  certificateId: string;
  holderName: string;
  programTitle: string;
  programSlug: string;
  credentialTitle: string;
  category: string;
  credentialLevel: string;
  completionDate: string | null;
  issueDate: string | null;
  learningHours: number | null;
  finalScore: number | null;
  passingScore: number | null;
  status: PublicCertificateStatus;
  issuedBy: string;
  verificationUrl: string;
  locale: AppLocale;
};

function formatDate(date: Date | null | undefined): string | null {
  return date ? date.toISOString().slice(0, 10) : null;
}

function mapStatus(status: Certificate["status"]): PublicCertificateStatus {
  if (status === "REVOKED") return "revoked";
  if (status === "REPLACED") return "replaced";
  return "valid";
}

function toPublicView(cert: Certificate, baseUrl: string): PublicCertificateView {
  return {
    certificateId: cert.certificateId ?? cert.code,
    holderName: cert.holderName,
    programTitle: cert.programTitle,
    programSlug: cert.programSlug,
    credentialTitle: cert.credentialTitle ?? "Certificate of Achievement",
    category: cert.category ?? "",
    credentialLevel: cert.credentialLevel ?? "Certificate of Achievement",
    completionDate: formatDate(cert.completionDate),
    issueDate: formatDate(cert.issueDate ?? cert.issuedAt),
    learningHours: cert.learningHours ?? null,
    finalScore: cert.finalScore ? Math.round(cert.finalScore * 100) : null,
    passingScore: cert.passingScore ? Math.round(cert.passingScore * 100) : null,
    status: mapStatus(cert.status),
    issuedBy: "NOVA STEM HUB",
    verificationUrl: `${baseUrl.replace(/\/$/, "")}/verify/${encodeURIComponent(cert.code)}`,
    locale: isCertificateLocale(cert.locale) ? cert.locale : "en",
  };
}

function baseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.trim();
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const SAMPLE_CERTIFICATE_CODE = "NOVA-SAMPLE-V2-A1B2C3D4";

function getSampleCertificateView(base: string): PublicCertificateView {
  return {
    certificateId: SAMPLE_CERTIFICATE_CODE,
    holderName: "Alexandra Isabella Montgomery",
    programTitle: "Artificial Intelligence, Robotics, and Emerging Technologies",
    programSlug: "ai-robotics-emerging-technologies",
    credentialTitle: "Certificate of Achievement",
    category: "College",
    credentialLevel: "Professional Certificate",
    completionDate: "2026-07-23",
    issueDate: "2026-07-23",
    learningHours: 120,
    finalScore: 95,
    passingScore: 80,
    status: "valid",
    issuedBy: "NOVA STEM HUB",
    verificationUrl: `${base.replace(/\/$/, "")}/verify/${SAMPLE_CERTIFICATE_CODE}`,
    locale: "en",
  };
}

/** Verify a certificate by its public ID. Optionally validates a secure token. */
export async function verifyCertificateByCode(
  code: string,
  token?: string,
): Promise<PublicCertificateView | null> {
  const normalized = code.trim().toUpperCase();

  // Static sample credential for review PDFs; never conflicts with real records.
  if (normalized === SAMPLE_CERTIFICATE_CODE) {
    return getSampleCertificateView(baseUrl());
  }

  const cert = await db.certificate.findUnique({
    where: { code: normalized },
  });

  if (!cert) return null;

  if (token && token !== cert.verificationToken) {
    return null;
  }

  return toPublicView(cert, baseUrl());
}

export async function verifyCertificateByToken(
  token: string,
): Promise<PublicCertificateView | null> {
  const cert = await db.certificate.findUnique({
    where: { verificationToken: token },
  });

  if (!cert) return null;
  return toPublicView(cert, baseUrl());
}

export async function lookupCertificateById(
  certificateId: string,
): Promise<Certificate | null> {
  const normalized = certificateId.trim().toUpperCase();
  return db.certificate.findFirst({
    where: {
      OR: [{ code: normalized }, { certificateId: normalized }],
    },
  });
}
