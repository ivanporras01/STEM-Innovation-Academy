import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CertificatePdfDocument } from "@/components/certificates/certificate-pdf-document";
import type { AppLocale } from "@/lib/locale";
import { generateCertificateQrCode, buildVerificationUrl } from "@/lib/certificates/qr-code";

export type CertificatePdfInput = {
  holderName: string;
  programTitle: string;
  code: string;
  verificationToken?: string | null;
  credentialTitle?: string | null;
  category?: string | null;
  credentialLevel?: string | null;
  completionDate?: Date | string | null;
  issueDate?: Date | string | null;
  learningHours?: number | null;
  finalScore?: number | null;
  passingScore?: number | null;
  locale?: AppLocale;
};

export function certificatePdfUrl(code: string): string {
  return `/api/certificates/${encodeURIComponent(code)}/pdf`;
}

/**
 * Render a certificate as a PDF buffer.
 *
 * No headless browser is required: this uses @react-pdf/renderer, which is
 * Vercel-compatible and runs entirely in JavaScript.
 */
export async function generateCertificatePdfBuffer(
  input: CertificatePdfInput,
): Promise<Buffer> {
  const verificationUrl = buildVerificationUrl(input.code, input.verificationToken ?? undefined);
  const qrCodeDataUrl = await generateCertificateQrCode(
    input.code,
    input.verificationToken ?? undefined,
  );

  const element = (
    <CertificatePdfDocument
      holderName={input.holderName}
      programTitle={input.programTitle}
      code={input.code}
      credentialTitle={input.credentialTitle ?? undefined}
      category={input.category ?? undefined}
      credentialLevel={input.credentialLevel ?? undefined}
      completionDate={input.completionDate ?? undefined}
      issueDate={input.issueDate ?? undefined}
      learningHours={input.learningHours ?? undefined}
      finalScore={input.finalScore ?? undefined}
      passingScore={input.passingScore ?? undefined}
      verificationUrl={verificationUrl}
      qrCodeDataUrl={qrCodeDataUrl}
      locale={input.locale ?? "en"}
    />
  );

  return renderToBuffer(element) as Promise<Buffer>;
}

/**
 * Alias for the public API. The PDF is generated deterministically on demand;
 * no persistent storage is required on Vercel.
 */
export async function generateCertificatePdf(input: CertificatePdfInput): Promise<Buffer> {
  return generateCertificatePdfBuffer(input);
}
