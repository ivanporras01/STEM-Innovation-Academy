import type { Metadata } from "next";
import Link from "next/link";
import { SCHOLARSHIP_FAQ, SCHOLARSHIP_PROGRAMS } from "@/data/novahub/scholarships";
import { NOVA_COLLEGE, NOVAHUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Becas NOVA STEM HUB",
  description:
    "Becas para estudiantes en contextos de vulnerabilidad que necesitan apoyo económico para acceder a NOVA College y certificados verificables.",
  path: "/es/scholarships",
  locale: "es",
});

const COVERAGE_LABELS: Record<string, string> = {
  full: "Cobertura completa o parcial",
  partial: "Beca parcial",
  "track-specific": "Por track / nominación",
};

export default function SpanishScholarshipsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-orange/15 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Becas para quienes las necesitan
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Si quieres tu primer empleo tech pero no tienes acceso a formación de calidad, estas
            becas pueden abrirte la puerta a {NOVA_COLLEGE.name}.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">
            Certificados verificables · ~120 horas por track · empleabilidad real. Revisión humana —
            la aprobación no está garantizada.
          </p>
          <Link
            href="/es/scholarships/apply"
            className="nova-btn-primary nova-btn-glow mt-8 inline-flex bg-nova-orange hover:bg-nova-orange/90"
          >
            Solicitar beca
          </Link>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-16">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Programas de beca</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">
              Tres caminos según tu situación — elige el más adecuado al aplicar.
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {SCHOLARSHIP_PROGRAMS.map((program) => (
                <div key={program.id} className="nova-glass-card flex flex-col">
                  <span className="mb-2 inline-block w-fit rounded-full bg-nova-cyan/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-nova-cyan">
                    {COVERAGE_LABELS[program.coverage] ?? program.coverage}
                  </span>
                  <h3 className="text-lg font-bold text-white">{program.nameEs}</h3>
                  <p className="mt-2 flex-1 text-sm text-nova-cyan-light/75">{program.descriptionEs}</p>
                  {program.seatNoteEs && (
                    <p className="mt-3 text-xs text-nova-orange/90">{program.seatNoteEs}</p>
                  )}
                  <Link
                    href={`/es/scholarships/apply?program=${program.slug}`}
                    className="nova-btn-secondary mt-6 inline-flex w-full justify-center border-white/20 text-white"
                  >
                    Solicitar — {program.nameEs}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">¿Quién puede aplicar?</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              Criterios honestos — cumplirlos no garantiza aprobación, pero nos ayuda a priorizar a
              quienes más lo necesitan.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {SCHOLARSHIP_PROGRAMS.map((program) => (
                <div key={program.id} className="nova-glass-card">
                  <h3 className="mb-3 font-semibold text-white">{program.nameEs}</h3>
                  <ul className="space-y-2 text-sm text-nova-cyan-light/75">
                    {program.eligibilityEs.map((item) => (
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
            <h2 className="mb-6 text-xl font-bold text-white">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {SCHOLARSHIP_FAQ.map((item) => (
                <div key={item.questionEs} className="nova-glass-card">
                  <h3 className="font-semibold text-white">{item.questionEs}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{item.answerEs}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="nova-glass-island p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              ¿Listo para dar el paso?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Tu talento merece una oportunidad real</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">
              Envía tu solicitud hoy. Revisamos cada caso con cuidado y te contactaremos pronto.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/es/scholarships/apply" className="nova-btn-primary nova-btn-glow inline-flex">
                Solicitar beca
              </Link>
              <Link href="/es/mission" className="nova-btn-secondary inline-flex border-white/20 text-white">
                Nuestra misión
              </Link>
              <Link href="/scholarships" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
                English edition
              </Link>
            </div>
          </section>
        </div>
      </main>

      </div>
  );
}
