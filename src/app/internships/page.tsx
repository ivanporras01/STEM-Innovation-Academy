import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = buildPageMetadata({
  title: "Internships — NOVA Resources",
  description:
    "STEM internships and early-career placements through the NOVA STEM HUB partner network. Build portfolio work and earn verified experience.",
  path: "/internships",
});

const INTERNSHIP_AREAS = [
  "IT support & cloud operations",
  "Cybersecurity & SOC analyst shadowing",
  "Data analytics & Python projects",
  "Robotics & automation labs",
  "IoT & smart systems field work",
  "Digital marketing & startup ventures",
  "Quantum workforce (advanced — QCW pathway)",
];

export default function InternshipsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <PageHero
          title="Internships"
          subtitle="Hands-on STEM placements with NOVA partner employers and institutions. Build verifiable portfolio work, receive mentor feedback, and turn learning into real experience."
        >
          <Link href="/internships/apply" className="nova-btn-primary nova-btn-glow inline-flex">
            Apply online
          </Link>
        </PageHero>
      </section>

      <main className="nova-space-section flex-1">
        <div className="nova-container max-w-5xl space-y-16">
          <section className="grid gap-8 sm:grid-cols-3">
            <div className="nova-glass-card">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-nova-cyan/15 text-nova-cyan">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">For NOVA College learners</h3>
              <p className="mt-2 text-sm text-nova-cyan-light/80">
                Ideal for students who have completed or are completing a Tier 1 track and want real project exposure.
              </p>
            </div>
            <div className="nova-glass-card">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-nova-cyan/15 text-nova-cyan">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Portfolio work</h3>
              <p className="mt-2 text-sm text-nova-cyan-light/80">
                Contribute to actual projects and graduate with work samples that employers can verify.
              </p>
            </div>
            <div className="nova-glass-card">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-nova-cyan/15 text-nova-cyan">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Mentor-supported</h3>
              <p className="mt-2 text-sm text-nova-cyan-light/80">
                Placements include structured check-ins and a final review to confirm competencies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">How it works</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              <li className="nova-glass-card">
                <span className="text-sm font-bold text-nova-cyan">01</span>
                <h3 className="mt-2 font-semibold text-white">Apply online</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Submit your background, track interest, and availability.
                </p>
              </li>
              <li className="nova-glass-card">
                <span className="text-sm font-bold text-nova-cyan">02</span>
                <h3 className="mt-2 font-semibold text-white">Match with a project</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Our team aligns your skills with a partner that fits your learning goals.
                </p>
              </li>
              <li className="nova-glass-card">
                <span className="text-sm font-bold text-nova-cyan">03</span>
                <h3 className="mt-2 font-semibold text-white">Build & verify</h3>
                <p className="mt-2 text-sm text-nova-cyan-light/80">
                  Contribute to real deliverables and earn a verified placement record.
                </p>
              </li>
            </ol>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-white">Areas we place</h2>
              <p className="mt-2 text-sm text-nova-cyan-light/80">
                Current and upcoming placement tracks aligned to NOVA College and QCW pathways.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-nova-cyan-light/80">
                {INTERNSHIP_AREAS.map((area) => (
                  <li key={area} className="flex gap-2">
                    <span className="text-nova-cyan">✦</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nova-glass-island flex flex-col justify-center border border-nova-cyan/20 p-8">
              <h3 className="text-xl font-bold text-white">Ready to gain real experience?</h3>
              <p className="mt-3 text-sm text-nova-cyan-light/85">
                Start your application today. You do not need prior work experience — just curiosity,
                a completed or in-progress NOVA track, and a willingness to learn.
              </p>
              <Link href="/internships/apply" className="nova-btn-primary nova-btn-glow mt-6 inline-flex w-fit">
                Apply online
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
