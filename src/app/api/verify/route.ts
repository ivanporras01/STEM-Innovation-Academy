import { NextResponse } from "next/server";
import {
  isValidCertificateFormat,
  verifyCertificateCode,
} from "@/data/novahub/certificates";
import { lookupCertificateByCode } from "@/lib/certificates/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code?.trim()) {
    return NextResponse.json({ error: "Ingresa un código de certificado" }, { status: 400 });
  }

  const normalized = code.trim().toUpperCase();

  if (!isValidCertificateFormat(normalized)) {
    return NextResponse.json(
      {
        error:
          "Formato inválido. Ejemplo: NOVA-COL-IT-2026-DEMO01 o NOVA-CERT-2026-A1B2C3",
      },
      { status: 400 },
    );
  }

  const dbCertificate = await lookupCertificateByCode(normalized);
  if (dbCertificate) {
    if (dbCertificate.status !== "valid") {
      return NextResponse.json(
        { error: "Este certificado ya no está activo en el registro NOVA STEM HUB" },
        { status: 404 },
      );
    }
    return NextResponse.json({ certificate: dbCertificate });
  }

  const demoCertificate = verifyCertificateCode(normalized);
  if (!demoCertificate) {
    return NextResponse.json(
      { error: "Certificado no encontrado en el registro NOVA STEM HUB" },
      { status: 404 },
    );
  }

  return NextResponse.json({ certificate: demoCertificate });
}
