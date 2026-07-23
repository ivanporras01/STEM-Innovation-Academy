import type { Metadata } from "next";
import Link from "next/link";
import { SCHOLARSHIP_FAQ, SCHOLARSHIP_PROGRAMS } from "@/data/novahub/scholarships";
import { NOVA_COLLEGE } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = buildPageMetadata({
  title: "NOVA STEM HUB Scholarships",
  description:
    "Scholarships for underserved students who need financial support to access NOVA College and verifiable certificates.",
  path: "/scholarships",
});

const COVERAGE_LABELS: Record<string, string> = {
  full: "Full or partial coverage",
  partial: "Partial scholarship",
  "track-specific": "Track-specific / nomination",
};

export default function ScholarshipsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-orange/15 via-transparent to-nova-cyan/10" />
        <PageHero
          title="NOVA Scholarships"
          subtitle={
            <>
              Scholarships funded directly by NOVA for learners who need financial support to access{" "}
              {NOVA_COLLEGE.name}. For partner-funded options, see{" "}
              <Link href="/scholarships/partners" className="text-nova-cyan hover:underline">
                Partner Scholarships
              </Link>
              .
            </>
          }
          description="Verifiable certificates · ~120 hours per track · real employability. Human review — approval is not guaranteed."
        >
          <Link
            href="/scholarships/apply"
            className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90"
          >
            Apply for scholarship
          </Link>
        </PageHero>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-16">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Scholarship programs</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Three paths depending on your situation — choose the best fit when you apply.
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {SCHOLARSHIP_PROGRAMS.map((program) => (
                <div key={program.id} className="nova-glass-card flex flex-col">
                  <span className="mb-2 inline-block w-fit rounded-full bg-nova-cyan/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    {COVERAGE_LABELS[program.coverage] ?? program.coverage}
                  </span>
                  <h3 className="text-lg font-bold text-white">{program.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-nova-cyan-light/75">{program.description}</p>
                  {program.seatNote && (
                    <p className="mt-3 text-xs text-nova-orange/90">{program.seatNote}</p>
                  )}
                  <Link
                    href={program.applicationPath}
                    className="nova-btn-secondary mt-6 inline-flex w-full justify-center border-white/20 text-white"
                  >
                    Apply — {program.name}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Who can apply?</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              Honest criteria — meeting them does not guarantee approval, but helps us prioritize
              those who need it most.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {SCHOLARSHIP_PROGRAMS.map((program) => (
                <div key={program.id} className="nova-glass-card">
                  <h3 className="mb-3 font-semibold text-white">{program.name}</h3>
                  <ul className="space-y-2 text-sm text-nova-cyan-light/75">
                    {program.eligibility.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-nova-cyan">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-bold text-white">FAQ</h2>
            <div className="space-y-4">
              {SCHOLARSHIP_FAQ.map((item) => (
                <div key={item.questionEn} className="nova-glass-card">
                  <h3 className="font-semibold text-white">{item.questionEn}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{item.answerEn}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="nova-glass-island p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              Ready to take the step?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Your talent deserves a real opportunity</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">
              Submit your application today. We review each case carefully and will contact you soon.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/scholarships/apply" className="nova-btn-primary nova-btn-glow inline-flex">
                Apply for scholarship
              </Link>
              <Link href="/mission" className="nova-btn-secondary inline-flex border-white/20 text-white">
                Our mission
              </Link>
              <Link href="/es/scholarships" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
                Edición en Español
              </Link>
            </div>
          </section>
        </div>
      </main>

      </div>
  );
}
