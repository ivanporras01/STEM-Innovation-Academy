import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InternshipApplyForm } from "@/components/resources/internship-apply-form";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Apply — Internships",
  description: "Online internship application for the NOVA STEM HUB partner network.",
  path: "/internships/apply",
});

export default function InternshipApplyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <section className="nova-section-cosmic border-b border-white/10 py-14 text-white">
        <div className="nova-container">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">✦ {NOVA_STEM_HUB.name}</p>
          <h1 className="mt-2 text-3xl font-black">Internship — online application</h1>
        </div>
      </section>
      <main className="nova-space-section flex-1 py-12">
        <InternshipApplyForm locale="en" />
      </main>
      <Footer />
    </div>
  );
}
