import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScholarshipApplyForm } from "@/components/scholarships/scholarship-apply-form";
import { NOVAHUB } from "@/lib/novahub-brand";

export const metadata: Metadata = {
  title: "Solicitar Beca",
  description:
    "Solicita una beca NOVA STEM HUB para acceder a NOVA College. Revisión humana — sin aprobación automática.",
};

export default function SpanishScholarshipApplyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-orange/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVAHUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Solicitar una beca</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            Cuéntanos quién eres y por qué necesitas apoyo. Revisamos cada solicitud con cuidado —
            te contactaremos pronto.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container">
          <Suspense
            fallback={
              <div className="nova-glass-island mx-auto max-w-xl animate-pulse p-8 text-center text-nova-cyan-light/60">
                Cargando formulario…
              </div>
            }
          >
            <ScholarshipApplyForm locale="es" />
          </Suspense>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-nova-cyan-light/60">
            ¿Prefieres escribirnos directamente?{" "}
            <a
              href="mailto:info@steminnovationacademy.org?subject=Solicitud%20de%20Beca%20NOVA%20STEM%20HUB"
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
