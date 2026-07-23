import { NextResponse } from "next/server";
import {
  isValidCertificateFormat,
  verifyCertificateCode,
} from "@/data/novahub/certificates";
import { verifyCertificateByCode } from "@/lib/certificates/verification";
import type { PublicCertificateView } from "@/lib/certificates/verification";
import type { VerifiedCertificate } from "@/data/novahub/certificates";

function mapPublicToVerified(view: PublicCertificateView): VerifiedCertificate {
  return {
    code: view.certificateId,
    holderName: view.holderName,
    trackTitle: view.programTitle,
    trackSlug: view.programSlug,
    prefix: view.certificateId.split("-")[1] ?? "NOVA",
    issuedAt: view.issueDate ?? "",
    status: view.status === "valid" ? "valid" : "revoked",
    scorePercent: view.finalScore ?? undefined,
    locale: view.locale,
    isDemo: false,
    programTitle: view.programTitle,
    programSlug: view.programSlug,
    credentialTitle: view.credentialTitle,
    category: view.category,
    credentialLevel: view.credentialLevel,
    completionDate: view.completionDate ?? undefined,
    issueDate: view.issueDate ?? undefined,
    learningHours: view.learningHours ?? undefined,
    passingScore: view.passingScore ?? undefined,
    certificateId: view.certificateId,
    verificationUrl: view.verificationUrl,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token = searchParams.get("token");

  if (!code?.trim()) {
    return NextResponse.json({ error: "Ingresa un código de certificado" }, { status: 400 });
  }

  const normalized = code.trim().toUpperCase();
  const isSample = normalized === "NOVA-SAMPLE-V2-A1B2C3D4";

  if (!isSample && !isValidCertificateFormat(normalized)) {
    return NextResponse.json(
      {
        error:
          "Formato inválido. Ejemplo: NOVA-COL-IT-2026-DEMO01 o NOVA-CERT-2026-A1B2C3",
      },
      { status: 400 },
    );
  }

  const view = await verifyCertificateByCode(normalized, token || undefined);

  if (view) {
    if (view.status !== "valid") {
      return NextResponse.json(
        { error: "Este certificado ya no está activo en el registro NOVA STEM HUB" },
        { status: 404 },
      );
    }
    return NextResponse.json({ certificate: mapPublicToVerified(view) });
  }

  const demoCertificate =
    process.env.NODE_ENV !== "production" ? verifyCertificateCode(normalized) : null;
  if (!demoCertificate) {
    return NextResponse.json(
      { error: "Certificado no encontrado en el registro NOVA STEM HUB" },
      { status: 404 },
    );
  }

  return NextResponse.json({ certificate: demoCertificate });
}
