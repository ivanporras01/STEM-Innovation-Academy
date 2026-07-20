import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VerifyCertificateSearch } from "@/components/verify/verify-certificate-search";
import { DEMO_CERTIFICATES } from "@/data/novahub/certificates";
import { SAMPLE_CERTIFICATE_PAGE_PATH, SAMPLE_CERTIFICATE_PDF_PATH } from "@/lib/certificates/constants";
import { NOVA_COLLEGE, NOVAHUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Verify Certificate | NOVA College",
  description:
    "Verify NOVA College certificates issued by NOVA STEM HUB. Employers and students can confirm credentials.",
  path: "/verify",
});

export default function VerifyPage() {
  const demoCodes = DEMO_CERTIFICATES.map((c) => c.code);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-green/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name} · Verification
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Verify certificate</h1>
          <p className="mx-auto mt-4 max-w-2xl text-nova-cyan-light/85">
            Confirm that a {NOVA_COLLEGE.name} graduate completed their program and earned
            verifiable credentials. Employers and partners can verify certificates here anytime.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1 py-12">
        <div className="nova-container">
          <VerifyCertificateSearch demoCodes={demoCodes} locale="en" />
          <p className="mx-auto mt-10 max-w-lg text-center text-xs text-nova-cyan-light/50">
            MVP with demo registry. Real certificates will be issued after evaluation and capstone
            completion under institutional supervision or NOVA STEM HUB scholarship.
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

      <Footer />
    </div>
  );
}
