import QRCode from "qrcode";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function buildVerificationUrl(code: string, token?: string): string {
  const base = getBaseUrl();
  const url = new URL(`/verify/${encodeURIComponent(code)}`, base);
  if (token) {
    url.searchParams.set("token", token);
  }
  return url.toString();
}

export async function generateCertificateQrCode(
  code: string,
  token?: string,
): Promise<string> {
  const url = buildVerificationUrl(code, token);
  return QRCode.toDataURL(url, {
    width: 180,
    margin: 1,
    color: {
      dark: "#0B1D3A",
      light: "#FFFFFF",
    },
  });
}

export async function generateCertificateQrCodeBuffer(
  code: string,
  token?: string,
): Promise<Buffer> {
  const url = buildVerificationUrl(code, token);
  return QRCode.toBuffer(url, {
    width: 180,
    margin: 1,
    color: {
      dark: "#0B1D3A",
      light: "#FFFFFF",
    },
  });
}
