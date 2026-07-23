import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PartnershipApplyForm } from "@/components/partnerships/partnership-apply-form";
import { NovaLogoIcon } from "@/components/ui/nova-logo-mark";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { NOVA_STEM_HUB_IMPACT } from "@/lib/novahub-impact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Register — NOVA Partnership",
  description:
    "Register your school or college as a NOVA STEM HUB partner. Human review and dedicated onboarding.",
  path: "/partnership/apply",
});

export default function PartnershipApplyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/10 via-transparent to-nova-orange/10" />
        <div className="nova-container relative">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            <NovaLogoIcon size="sm" />
            {NOVA_STEM_HUB.name} · NOVA Partnership
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Register your institution</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            Tell us about your school or college, then complete your licensing deposit on the next
            screen. Our partnerships team reviews applications within 5–7 business days.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container">
          <PartnershipApplyForm locale="en" />
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-nova-cyan-light/60">
            Prefer email?{" "}
            <a
              href={`mailto:${NOVA_STEM_HUB_IMPACT.contactEmail}?subject=NOVA%20Partnership%20Registration`}
              className="text-nova-cyan hover:underline"
            >
              {NOVA_STEM_HUB_IMPACT.contactEmail}
            </a>
            {" · "}
            <Link href="/partnership" className="text-nova-cyan hover:underline">
              View partnership benefits
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
