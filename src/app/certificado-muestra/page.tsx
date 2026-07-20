import type { Metadata } from "next";
import { NovaCertificateTemplate } from "@/components/certificates/nova-certificate-template";
import { CertificateSampleToolbar } from "@/components/certificates/certificate-sample-toolbar";
import { PASSING_SCORE_PERCENT } from "@/lib/certificates/constants";
import { CERTIFICATE_SAMPLE_PLACEHOLDER } from "@/lib/certificates/copy";
import { isCertificateLocale } from "@/lib/certificates/locale";
import type { AppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: "Certificate of Achievement — Sample | NOVA STEM HUB",
    description:
      "Sample NOVA STEM HUB Certificate of Achievement with SAMPLE/VOID watermark — not valid for verification.",
  },
  es: {
    title: "Certificado de Logro — Muestra | NOVA STEM HUB",
    description:
      "Muestra del Certificado de Logro NOVA STEM HUB con marca MUESTRA/VOID — no válido para verificación.",
  },
  pt: {
    title: "Certificado de Conquista — Amostra | NOVA STEM HUB",
    description:
      "Amostra do Certificado de Conquista NOVA STEM HUB com marca AMOSTRA/VOID — não válido para verificação.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await searchParams;
  const locale: AppLocale =
    rawLocale && isCertificateLocale(rawLocale) ? rawLocale : "en";
  const meta = PAGE_META[locale];

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: "/certificado-muestra",
    locale: locale === "pt" ? "en" : locale,
  });
}

export default async function CertificadoMuestraPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const { locale: rawLocale } = await searchParams;
  const locale: AppLocale =
    rawLocale && isCertificateLocale(rawLocale) ? rawLocale : "en";
  const sampleDate = new Date().toISOString();
  const labels = CERTIFICATE_SAMPLE_PLACEHOLDER[locale];

  return (
    <div className="cert-sample-page min-h-screen bg-[#0B1D3A] py-8 text-white sm:py-12">
      <div className="nova-container max-w-4xl">
        <CertificateSampleToolbar locale={locale} />
        <div className="mt-8">
          <NovaCertificateTemplate
            holderName={labels.name}
            programTitle={labels.program}
            code="NOVA-SAMPLE-0000"
            issuedAt={sampleDate}
            scorePercent={PASSING_SCORE_PERCENT}
            locale={locale}
            sampleMode
          />
        </div>
      </div>
    </div>
  );
}
