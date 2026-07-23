import { randomBytes } from "crypto";
import { db } from "@/lib/db";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Cryptographically-secure random suffix for the public certificate ID. */
export function randomCertificateSuffix(length = 6): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  }
  return out;
}

/** Generate a unique, human-readable public certificate ID. */
export async function generateUniqueCertificateCode(prefix: string): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = `${prefix}-${year}-${randomCertificateSuffix()}`;
    const existing = await db.certificate.findUnique({ where: { code } });
    if (!existing) return code;
  }
  throw new Error("Unable to generate unique certificate code");
}

/** Generate a separate secure verification token. */
export function generateVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

/** @deprecated Reuse the unique certificate code as the public certificateId. */
export async function generateCertificateId(prefix: string): Promise<string> {
  return generateUniqueCertificateCode(prefix);
}
