import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PartnershipApplyForm } from "@/components/partnerships/partnership-apply-form";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { NOVA_STEM_HUB_IMPACT } from "@/lib/novahub-impact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Registro — NOVA Partnership",
  description:
    "Registra tu colegio o institución como partner de NOVA STEM HUB. Revisión humana y onboarding dedicado.",
  path: "/es/partnership/apply",
  locale: "es",
});

export default function SpanishPartnershipApplyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/10 via-transparent to-nova-orange/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">Registra tu institución</h1>
          <p className="mt-4 max-w-2xl text-nova-cyan-light/85">
            Cuéntanos sobre tu colegio o institución y completa el depósito de licencia en la
            siguiente pantalla. Nuestro equipo revisa solicitudes en 5–7 días hábiles.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container">
          <PartnershipApplyForm locale="es" />
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-nova-cyan-light/60">
            ¿Prefieres correo?{" "}
            <a
              href={`mailto:${NOVA_STEM_HUB_IMPACT.contactEmail}?subject=Registro%20NOVA%20Partnership`}
              className="text-nova-cyan hover:underline"
            >
              {NOVA_STEM_HUB_IMPACT.contactEmail}
            </a>
            {" · "}
            <Link href="/es/partnership" className="text-nova-cyan hover:underline">
              Ver ventajas del partnership
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
