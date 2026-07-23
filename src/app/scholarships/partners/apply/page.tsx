import type { Metadata } from "next";
import { PartnerScholarshipApplyForm } from "@/components/resources/partner-scholarship-apply-form";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Apply — Partner Scholarships",
  description: "Online application for partner-funded scholarships through the NOVA STEM HUB network.",
  path: "/scholarships/partners/apply",
});

export default function PartnerScholarshipApplyPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic border-b border-white/10 py-14 text-white">
        <div className="nova-container">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">✦ {NOVA_STEM_HUB.name}</p>
          <h1 className="mt-2 text-3xl font-black">Partner Scholarship — online application</h1>
        </div>
      </section>
      <main className="nova-space-section flex-1 py-12">
        <PartnerScholarshipApplyForm locale="en" />
      </main>
      </div>
  );
}
