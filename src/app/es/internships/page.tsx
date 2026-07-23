import type { Metadata } from "next";
import Link from "next/link";
import { NOVA_COLLEGE } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pasantías — NOVA Resources",
  description:
    "Pasantías STEM y primeras colocaciones laborales a través de la red de partners NOVA STEM HUB. Solicitud en línea.",
  path: "/es/internships",
  locale: "es",
});

const INTERNSHIP_AREAS = [
  "Soporte IT y operaciones cloud",
  "Ciberseguridad y shadowing SOC analyst",
  "Análisis de datos y proyectos Python",
  "Laboratorios de robótica y automatización",
  "IoT y sistemas inteligentes en campo",
  "Marketing digital y ventures startup",
  "Quantum workforce (avanzado — vía QCW)",
];

export default function SpanishInternshipsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl">Pasantías / Internships</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Colocaciones STEM de inicio de carrera con empleadores e instituciones partners de NOVA.
            Ideal para estudiantes de {NOVA_COLLEGE.name} que construyen portafolio verificable.
          </p>
          <Link
            href="/es/internships/apply"
            className="nova-btn-primary nova-btn-glow mt-8 inline-flex"
          >
            Solicitar en línea
          </Link>
        </div>
      </section>
      <main className="nova-space-section flex-1">
        <div className="nova-container max-w-2xl">
          <h2 className="text-xl font-bold text-white">Áreas donde colocamos</h2>
          <ul className="mt-4 space-y-2 text-sm text-nova-cyan-light/80">
            {INTERNSHIP_AREAS.map((area) => (
              <li key={area} className="flex gap-2">
                <span className="text-nova-cyan">•</span>
                {area}
              </li>
            ))}
          </ul>
          <Link
            href="/internships"
            className="nova-btn-secondary mt-8 inline-flex border-white/20 text-white/70"
          >
            English edition
          </Link>
        </div>
      </main>
      </div>
  );
}
