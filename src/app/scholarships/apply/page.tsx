import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScholarshipApplyForm } from "@/components/scholarships/scholarship-apply-form";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";

export const metadata: Metadata = {
  title: "Apply for Scholarship",
  description:
    "Apply for a NOVA STEM HUB scholarship to access NOVA College. Human review — no automatic approval.",
};

export default function ScholarshipApplyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-orange/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name} · Scholarships
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Apply for a scholarship</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            Tell us who you are and why you need support. We review each application carefully —
            we will contact you soon.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container">
          <Suspense
            fallback={
              <div className="nova-glass-island mx-auto max-w-xl animate-pulse p-8 text-center text-nova-cyan-light/60">
                Loading form…
              </div>
            }
          >
            <ScholarshipApplyForm locale="en" />
          </Suspense>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-nova-cyan-light/60">
            Prefer to email us directly?{" "}
            <a
              href="mailto:info@steminnovationacademy.org?subject=NOVA%20STEM%20HUB%20Scholarship%20Application"
              className="text-nova-cyan hover:underline"
            >
              info@steminnovationacademy.org
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
