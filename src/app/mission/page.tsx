import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  NOVAHUB_ACCESS_TIERS,
  NOVAHUB_IMPACT_GOALS,
  NOVAHUB_IMPACT_LADDER,
  NOVAHUB_IMPACT_PILLARS,
  NOVAHUB_MISSION,
  NOVAHUB_IMPACT,
} from "@/lib/novahub-impact";
import { NOVAHUB_INSTITUTIONAL_PROGRAM } from "@/data/novahub/access-programs";
import { SCHOLARSHIP_PROGRAMS } from "@/data/novahub/scholarships";
import { NOVA_COLLEGE, QUANTUM_WORKFORCE, NOVAHUB } from "@/lib/novahub-brand";

export const metadata: Metadata = {
  title: "Mission & Impact",
  description: NOVAHUB_MISSION.bodyEn,
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  active: { label: "Available", className: "bg-nova-green/20 text-nova-green" },
  pilot: { label: "Pilot", className: "bg-nova-orange/20 text-nova-orange" },
  roadmap: { label: "Coming soon", className: "bg-white/10 text-nova-cyan-light/70" },
};

function tierCta(tier: (typeof NOVAHUB_ACCESS_TIERS)[number]) {
  return "ctaEn" in tier && tier.ctaEn ? tier.ctaEn : tier.ctaEs;
}

export default function MissionPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-20 text-white sm:py-28">
        <div className="nova-nebula-glow absolute -left-32 top-0 h-96 w-96 bg-nova-cyan/25" />
        <div className="nova-nebula-glow absolute -right-32 bottom-0 h-[28rem] w-[28rem] bg-nova-orange/15" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-deep-blue/45 via-[#0a1628]/30 to-nova-deep-blue/50" />

        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name} · Impact
          </p>
          <h1 className="max-w-4xl text-3xl font-black sm:text-4xl lg:text-5xl">
            {NOVAHUB_MISSION.headlineEn}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{NOVAHUB_MISSION.bodyEn}</p>
          <p className="mt-3 max-w-2xl text-sm italic text-nova-cyan-light/70">
            {NOVAHUB_MISSION.visionEn}
          </p>
          <p className="mt-4 max-w-2xl text-sm font-medium text-nova-cyan-light/90">
            {NOVAHUB_MISSION.callToActionEn}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={NOVA_COLLEGE.path}
              className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90"
            >
              Explore {NOVA_COLLEGE.name}
            </Link>
            <Link
              href={NOVAHUB_IMPACT.scholarshipsPath}
              className="nova-btn-secondary inline-flex border-white/20 text-white"
            >
              View scholarships
            </Link>
            <Link href="/partnership" className="nova-btn-secondary inline-flex border-white/20 text-white/80">
              Contact {NOVAHUB.name}
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-16">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">How NOVA STEM HUB helps</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Four ways to access {NOVA_COLLEGE.name} — scholarships for those who cannot pay,
              institutions for full cohorts.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVAHUB_ACCESS_TIERS.map((tier) => {
                const status = STATUS_LABELS[tier.status] ?? STATUS_LABELS.roadmap;
                return (
                  <div key={tier.id} className="nova-glass-card flex flex-col">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white">{tier.labelEn}</h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mb-4 flex-1 text-sm text-nova-cyan-light/75">{tier.descriptionEn}</p>
                    <Link href={tier.ctaHref} className="text-sm font-medium text-nova-cyan hover:underline">
                      {tierCta(tier)} →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Impact pillars</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              What guides every decision at {NOVAHUB.name} — starting with {NOVA_COLLEGE.name}.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVAHUB_IMPACT_PILLARS.map((pillar) => (
                <div key={pillar.id} className="nova-glass-card border-t-4 border-t-nova-cyan">
                  <h3 className="text-lg font-bold text-white">{pillar.titleEn}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{pillar.descriptionEn}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">The ladder</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              From classroom to job — and beyond. NOVA STEM HUB begins at {NOVA_COLLEGE.name}, including
              the {QUANTUM_WORKFORCE.shortName} quantum program at Tier 2.
            </p>
            <div className="mx-auto grid max-w-3xl gap-6">
              {NOVAHUB_IMPACT_LADDER.map((step) => (
                <div
                  key={step.product}
                  className="nova-glass-card flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue text-lg font-bold text-nova-deep-blue">
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-nova-orange">
                        {step.tier}
                      </span>
                      <span className="text-xs text-nova-cyan-light/60">· {step.ages}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.product}</h3>
                    <p className="mt-1 text-sm text-nova-cyan-light/75">{step.focus}</p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                    <Link href={step.cta} className="nova-btn-primary nova-btn-glow">
                      Explore
                    </Link>
                    {step.deliveryAppUrl && (
                      <a
                        href={step.deliveryAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-nova-orange hover:underline"
                      >
                        {QUANTUM_WORKFORCE.shortName} delivery app ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Access programs</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Scholarships and partner institutions — limited seats, no inflated numbers.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {SCHOLARSHIP_PROGRAMS.filter((p) => p.id === "techhub-beca").map((program) => (
                <div key={program.id} className="nova-glass-island flex flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-white">{program.name}</h3>
                    <span className="shrink-0 rounded-full bg-nova-orange/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-nova-orange">
                      Pilot
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-nova-cyan-light/80">{program.description}</p>
                  {program.seatNote && (
                    <p className="mb-4 text-xs text-nova-cyan-light/50">{program.seatNote}</p>
                  )}
                  <Link
                    href={program.applicationPath}
                    className="nova-btn-primary nova-btn-glow mt-auto text-center"
                  >
                    Apply for scholarship
                  </Link>
                </div>
              ))}
              <div className="nova-glass-island flex flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-white">{NOVAHUB_INSTITUTIONAL_PROGRAM.nameEn}</h3>
                  <span className="shrink-0 rounded-full bg-nova-orange/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-nova-orange">
                    Pilot
                  </span>
                </div>
                <p className="mb-4 text-sm text-nova-cyan-light/80">
                  {NOVAHUB_INSTITUTIONAL_PROGRAM.descriptionEn}
                </p>
                <ul className="mb-4 flex-1 space-y-2 text-sm text-nova-cyan-light/70">
                  {NOVAHUB_INSTITUTIONAL_PROGRAM.benefitsEn.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="text-nova-cyan">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <p className="mb-4 text-xs text-nova-cyan-light/50">
                  Pilot goal: up to {NOVAHUB_INSTITUTIONAL_PROGRAM.seatCap} institutions ·{" "}
                  {NOVAHUB_INSTITUTIONAL_PROGRAM.region}
                </p>
                <a
                  href={NOVAHUB_INSTITUTIONAL_PROGRAM.contactHref}
                  className="nova-btn-primary nova-btn-glow mt-auto text-center"
                >
                  {NOVAHUB_INSTITUTIONAL_PROGRAM.contactLabel}
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Impact goals</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Aspirational targets — honest about what we aim to achieve, not promises already
              delivered.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVAHUB_IMPACT_GOALS.map((goal) => (
                <div key={goal.id} className="nova-glass-card text-center">
                  <span className="rounded-full bg-nova-orange/20 px-2 py-0.5 text-xs font-semibold uppercase text-nova-orange">
                    goal {goal.timeframe}
                  </span>
                  <p className="mt-3 text-2xl font-black text-white">{goal.metricEn.split(" ")[0]}</p>
                  <h3 className="mt-1 text-sm font-semibold text-nova-cyan-light">
                    {goal.metricEn.replace(/^[\d,+]+\s*/, "")}
                  </h3>
                  <p className="mt-2 text-xs text-nova-cyan-light/60">{goal.noteEn}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="nova-glass-island p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              Want to be part of this?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Student, institution, or partner — let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">
              If you have talent and motivation but not the resources, we want to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href={NOVAHUB_IMPACT.applyPath}
                className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange"
              >
                Apply for scholarship
              </Link>
              <Link
                href={NOVA_COLLEGE.path}
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Explore {NOVA_COLLEGE.name}
              </Link>
              <Link href="/es" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
                Edición en Español
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
