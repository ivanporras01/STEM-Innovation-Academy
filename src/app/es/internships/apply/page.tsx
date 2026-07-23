import type { Metadata } from "next";
import Link from "next/link";
import { InternshipApplyForm } from "@/components/resources/internship-apply-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Solicitar — Pasantías",
  description: "Solicitud en línea de pasantía en la red de partners NOVA STEM HUB.",
  path: "/es/internships/apply",
  locale: "es",
});

export default function SpanishInternshipApplyPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic border-b border-white/10 py-14 text-white">
        <div className="nova-container">
          <h1 className="mt-2 text-3xl font-black">Pasantía — solicitud en línea</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            Cuéntanos sobre ti y tu interés. Te contactaremos cuando haya oportunidades en la red NOVA.
          </p>
        </div>
      </section>
      <main className="nova-space-section flex-1 py-12">
        <InternshipApplyForm locale="es" />
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-nova-cyan-light/60">
          <Link href="/es/internships" className="text-nova-cyan hover:underline">
            Volver a pasantías
          </Link>
        </p>
      </main>
      </div>
  );
}
