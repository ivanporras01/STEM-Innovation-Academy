import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  NOVAHUB_IMPACT_GOALS,
  NOVAHUB_ROADMAP_ES,
  type RoadmapStatus,
} from "@/lib/novahub-impact";
import { NOVA_COLLEGE, NOVAHUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Roadmap | NOVA STEM HUB",
  description: "Hacia dónde va NOVA STEM HUB: plataforma, becas, certificados y escala global.",
  path: "/es/roadmap",
  locale: "es",
});

const statusLabel: Record<RoadmapStatus, string> = {
  done: "Listo",
  in_progress: "En progreso",
  planned: "Planificado",
};

const statusStyle: Record<RoadmapStatus, string> = {
  done: "border-nova-green/40 bg-nova-green/10 text-nova-green",
  in_progress: "border-nova-orange/40 bg-nova-orange/10 text-nova-orange",
  planned: "border-white/20 bg-white/5 text-nova-cyan-light/70",
};

export default function SpanishRoadmapPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">El camino hacia el sueño</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            Construimos paso a paso — firme y seguro — para que miles de estudiantes sin
            oportunidades reales accedan a {NOVA_COLLEGE.name}, certificados verificables y primer
            empleo tech.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-12">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NOVAHUB_IMPACT_GOALS.slice(0, 4).map((goal) => (
              <div key={goal.id} className="nova-glass-card p-5">
                <p className="text-xs font-semibold uppercase text-nova-orange">Objetivo</p>
                <p className="mt-2 font-bold text-white">{goal.metricEs}</p>
                <p className="mt-1 text-xs text-nova-cyan-light/60">{goal.timeframe}</p>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            {NOVAHUB_ROADMAP_ES.map((phase) => (
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
            <h2 className="text-xl font-bold text-white">Empieza hoy</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/es/college" className="nova-btn-primary nova-btn-glow inline-flex">
                {NOVA_COLLEGE.name}
              </Link>
              <Link
                href="/es/scholarships"
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Becas
              </Link>
              <Link
                href="/es/verify"
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Verificar certificado
              </Link>
              <Link href="/roadmap" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
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
