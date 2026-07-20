import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partner Scholarships — NOVA Resources",
  description:
    "Scholarships from partner institutions, community colleges, and large tech companies in the NOVA STEM HUB network. Apply online.",
  path: "/scholarships/partners",
});

const PARTNER_TYPES = [
  {
    title: "Large tech companies",
    body: "Corporate STEM scholarships sponsored through NOVA partnership agreements — cloud, cybersecurity, data, and quantum workforce pathways.",
  },
  {
    title: "Community colleges & technical schools",
    body: "Nomination-based seats for students transitioning into NOVA College employability tracks with verifiable certificates.",
  },
  {
    title: "Universities & NGOs",
    body: "Foundation and access programs for underserved learners — human review, no instant approval.",
  },
];

export default function PartnerScholarshipsPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name} · NOVA Resources
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Partner Scholarships</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Funding from institutions and companies in the NOVA ecosystem — not direct NOVA grants.
            For NOVA-funded scholarships, see{" "}
            <Link href="/scholarships" className="text-nova-cyan hover:underline">
              NOVA Scholarships
            </Link>
            .
          </p>
          <Link href="/scholarships/partners/apply" className="nova-btn-primary nova-btn-glow mt-8 inline-flex">
            Apply online
          </Link>
        </div>
      </section>
      <main className="nova-space-section flex-1">
        <div className="nova-container grid gap-6 md:grid-cols-3">
          {PARTNER_TYPES.map((item) => (
            <div key={item.title} className="nova-glass-card">
              <h2 className="text-lg font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-nova-cyan-light/75">{item.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
