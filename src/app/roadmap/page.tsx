import type { Metadata } from "next";
import Link from "next/link";
import {
  NOVAHUB_IMPACT,
  NOVAHUB_IMPACT_GOALS,
  NOVAHUB_ROADMAP,
  type RoadmapStatus,
} from "@/lib/novahub-impact";
import { NOVA_COLLEGE, NOVAHUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Roadmap | NOVA STEM HUB",
  description: "Where NOVA STEM HUB is headed: platform, scholarships, certificates, and global scale.",
  path: "/roadmap",
});

const statusLabel: Record<RoadmapStatus, string> = {
  done: "Done",
  in_progress: "In progress",
  planned: "Planned",
};

const statusStyle: Record<RoadmapStatus, string> = {
  done: "border-nova-green/40 bg-nova-green/10 text-nova-green",
  in_progress: "border-nova-orange/40 bg-nova-orange/10 text-nova-orange",
  planned: "border-white/20 bg-white/5 text-nova-cyan-light/70",
};

export default function RoadmapPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">The path to the dream</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            We build step by step — firm and steady — so thousands of students without real
            opportunities can access {NOVA_COLLEGE.name}, verifiable certificates, and their first
            tech job.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-12">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NOVAHUB_IMPACT_GOALS.slice(0, 4).map((goal) => (
              <div key={goal.id} className="nova-glass-card p-5">
                <p className="text-xs font-semibold uppercase text-nova-orange">Goal</p>
                <p className="mt-2 font-bold text-white">{goal.metricEn}</p>
                <p className="mt-1 text-xs text-nova-cyan-light/60">{goal.timeframe}</p>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            {NOVAHUB_ROADMAP.map((phase) => (
              <article key={phase.phase} className="nova-glass-island p-6">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{phase.phase}</h2>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase ${statusStyle[phase.status]}`}
                  >
                    {statusLabel[phase.status]}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-nova-cyan-light/85">
                      <span className="text-nova-cyan">
                        {phase.status === "done" ? "✓" : "○"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="nova-glass-island flex flex-col items-center gap-4 p-8 text-center">
            <h2 className="text-xl font-bold text-white">Start today</h2>
            <p className="max-w-lg text-sm text-nova-cyan-light/80">
              Explore tracks, apply for a scholarship, or verify a demo certificate.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={NOVA_COLLEGE.path} className="nova-btn-primary nova-btn-glow inline-flex">
                {NOVA_COLLEGE.name}
              </Link>
              <Link
                href={NOVAHUB_IMPACT.scholarshipsPath}
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Scholarships
              </Link>
              <Link
                href={NOVAHUB_IMPACT.verifyPath}
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Verify certificate
              </Link>
            </div>
          </section>
        </div>
      </main>

      </div>
  );
}
