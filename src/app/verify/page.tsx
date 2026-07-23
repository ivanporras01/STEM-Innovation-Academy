import type { Metadata } from "next";
import { VerifyCertificateSearch } from "@/components/verify/verify-certificate-search";
import { DEMO_CERTIFICATES } from "@/data/novahub/certificates";
import { SAMPLE_CERTIFICATE_PAGE_PATH, SAMPLE_CERTIFICATE_PDF_PATH } from "@/lib/certificates/constants";
import { NOVAHUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = buildPageMetadata({
  title: "Verify Certificate | NOVA College",
  description:
    "Verify NOVA College certificates issued by NOVA STEM HUB. Employers and students can confirm credentials.",
  path: "/verify",
});

export default function VerifyPage() {
  const demoCodes = DEMO_CERTIFICATES.map((c) => c.code);

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-green/10 via-transparent to-nova-cyan/10" />
        <PageHero
          align="center"
          eyebrow={`✦ ${NOVAHUB.name}`}
          title="Verify Certificate"
          subtitle="Confirm that a NOVA College graduate completed their program and earned verifiable credentials. Employers, schools, and partners can confirm certificates here at any time."
        />
      </section>

      <main className="nova-space-section relative flex-1 py-12">
        <div className="nova-container">
          <VerifyCertificateSearch demoCodes={demoCodes} locale="en" />
          <p className="mx-auto mt-10 max-w-lg text-center text-xs text-nova-cyan-light/70">
            Enter a demo code above to preview how verification works. Real certificates are issued
            after program completion, capstone review, and approval under institutional supervision
            or a NOVA STEM HUB scholarship.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-center text-xs text-nova-cyan-light/60">
            Preview the official design:{" "}
            <a href={SAMPLE_CERTIFICATE_PDF_PATH} download className="text-nova-cyan hover:underline">
              Download sample PDF
            </a>
            {" · "}
            <a href={`${SAMPLE_CERTIFICATE_PAGE_PATH}?locale=en`} className="text-nova-cyan hover:underline">
              View sample certificate
            </a>
          </p>
        </div>
      </main>

      </div>
  );
}
