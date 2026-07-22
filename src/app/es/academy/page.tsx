import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NOVA_ACADEMY, NOVA_COLLEGE, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_ACADEMY.name} — Edición en Español`,
  description:
    "NOVA Academy — exploración STEM para jóvenes. Parte del ecosistema NOVA STEM HUB junto a NOVA College.",
  path: "/es/academy",
  locale: "es",
});

export default function SpanishAcademyHomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-20 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/10 via-transparent to-nova-orange/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Explora, construye e innova en STEM
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{NOVA_ACADEMY.description}</p>
          <p className="mt-3 max-w-2xl text-sm text-nova-cyan-light/70">
            Edición en español. Las misiones interactivas de NOVA Academy están en
            inglés — accede desde Mission Paths.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={NOVA_ACADEMY.coursesPath}
              className="nova-btn-primary nova-btn-glow inline-flex"
            >
              Mission Paths
            </Link>
            <Link href="/es/college" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_COLLEGE.name}
            </Link>
            <Link href="/es" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
              {NOVA_STEM_HUB.name}
            </Link>
            <Link href="/" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
              English edition
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container grid gap-6 md:grid-cols-2">
          <Link
            href="/es/academy"
            className="nova-glass-card block p-6 transition hover:border-nova-cyan/30"
          >
            <h2 className="text-lg font-bold text-white">{NOVA_ACADEMY.name}</h2>
            <p className="mt-2 text-sm text-nova-cyan-light/80">
              K-12 · misiones interactivas · buddies · exploración STEM para jóvenes
            </p>
          </Link>
          <Link
            href="/es/college"
            className="nova-glass-card block p-6 transition hover:border-nova-orange/30"
          >
            <h2 className="text-lg font-bold text-white">{NOVA_COLLEGE.name}</h2>
            <p className="mt-2 text-sm text-nova-cyan-light/80">
              {NOVA_COLLEGE.trackCount} tracks técnicos · certificados verificables · programa QCW (Tier 2) incluido
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
