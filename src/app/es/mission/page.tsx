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
} from "@/lib/novahub-impact";
import { NOVA_COLLEGE, NOVAHUB, QUANTUM_WORKFORCE } from "@/lib/novahub-brand";

export const metadata: Metadata = {
  title: "Misión e impacto",
  description: NOVAHUB_MISSION.bodyEs,
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  active: { label: "Disponible", className: "bg-nova-green/20 text-nova-green" },
  pilot: { label: "Piloto", className: "bg-nova-orange/20 text-nova-orange" },
  roadmap: { label: "Próximamente", className: "bg-white/10 text-nova-cyan-light/70" },
};

function tierCtaEs(tier: (typeof NOVAHUB_ACCESS_TIERS)[number]) {
  const record = tier as Record<string, string | undefined>;
  return record.ctaEs ?? record.ctaEn ?? "Explorar";
}

function ladderHrefEs(path: string) {
  if (path.startsWith("/college")) return `/es${path}`;
  if (path === NOVA_COLLEGE.path) return "/es/college";
  return path;
}

export default function SpanishMissionPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-20 text-white sm:py-28">
        <div className="nova-nebula-glow absolute -left-32 top-0 h-96 w-96 bg-nova-cyan/25" />
        <div className="nova-nebula-glow absolute -right-32 bottom-0 h-[28rem] w-[28rem] bg-nova-orange/15" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-deep-blue/45 via-[#0a1628]/30 to-nova-deep-blue/50" />

        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name} · Impacto
          </p>
          <h1 className="max-w-4xl text-3xl font-black sm:text-4xl lg:text-5xl">
            {NOVAHUB_MISSION.headlineEs}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{NOVAHUB_MISSION.bodyEs}</p>
          <p className="mt-3 max-w-2xl text-sm italic text-nova-cyan-light/70">
            {NOVAHUB_MISSION.visionEs}
          </p>
          <p className="mt-4 max-w-2xl text-sm font-medium text-nova-cyan-light/90">
            {NOVAHUB_MISSION.callToActionEs}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/es/college"
              className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90"
            >
              Explorar {NOVA_COLLEGE.name}
            </Link>
            <Link
              href="/es/scholarships"
              className="nova-btn-secondary inline-flex border-white/20 text-white"
            >
              Ver becas
            </Link>
            <Link href="/es/partnership" className="nova-btn-secondary inline-flex border-white/20 text-white/80">
              Contactar {NOVAHUB.name}
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-16">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Cómo accede NOVA STEM HUB</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Cuatro formas de acceder a {NOVA_COLLEGE.name} — becas para quienes no pueden pagar,
              instituciones para cohortes completas.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVAHUB_ACCESS_TIERS.map((tier) => {
                const status = STATUS_LABELS[tier.status] ?? STATUS_LABELS.roadmap;
                const ctaHref =
                  tier.id === "scholarship" ? "/es/scholarships/apply" : tier.ctaHref;
                return (
                  <div key={tier.id} className="nova-glass-card flex flex-col">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white">{tier.labelEs}</h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mb-4 flex-1 text-sm text-nova-cyan-light/75">{tier.descriptionEs}</p>
                    <Link href={ctaHref} className="text-sm font-medium text-nova-cyan hover:underline">
                      {tierCtaEs(tier)} →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Pilares de impacto</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVAHUB_IMPACT_PILLARS.map((pillar) => (
                <div key={pillar.id} className="nova-glass-card border-t-4 border-t-nova-cyan">
                  <h3 className="text-lg font-bold text-white">{pillar.titleEs}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{pillar.descriptionEs}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">La escalera</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Del aula al empleo — y más allá. NOVA STEM HUB comienza en {NOVA_COLLEGE.name}, incluyendo
              el programa cuántico {QUANTUM_WORKFORCE.shortName} en Tier 2.
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
                    <Link
                      href={ladderHrefEs(step.cta)}
                      className="nova-btn-primary nova-btn-glow"
                    >
                      Explorar
                    </Link>
                    {step.deliveryAppUrl && (
                      <a
                        href={step.deliveryAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-nova-orange hover:underline"
                      >
                        App delivery QCW ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Objetivos de impacto</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {NOVAHUB_IMPACT_GOALS.map((goal) => (
                <div key={goal.id} className="nova-glass-card text-center">
                  <span className="rounded-full bg-nova-orange/20 px-2 py-0.5 text-xs font-semibold uppercase text-nova-orange">
                    objetivo {goal.timeframe}
                  </span>
                  <p className="mt-3 text-2xl font-black text-white">{goal.metricEs.split(" ")[0]}</p>
                  <h3 className="mt-1 text-sm font-semibold text-nova-cyan-light">
                    {goal.metricEs.replace(/^[\d,+]+\s*/, "")}
                  </h3>
                  <p className="mt-2 text-xs text-nova-cyan-light/60">{goal.noteEs}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="nova-glass-island p-8 text-center">
            <h2 className="text-2xl font-bold text-white">¿Quieres ser parte de esto?</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/es/scholarships/apply"
                className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange"
              >
                Solicitar beca
              </Link>
              <Link
                href="/es/college"
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Explorar {NOVA_COLLEGE.name}
              </Link>
              <Link href="/mission" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
                English edition
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
