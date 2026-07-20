import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CollegeTrackCard } from "@/components/college/college-track-card";
import {
  NOVA_COLLEGE,
  NOVA_SCHOOL,
  QUANTUM_WORKFORCE,
  NOVA_STEM_HUB,
  novaCollegeTrackIndex,
} from "@/lib/novahub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_COLLEGE.name} — Edição em Português`,
  description: NOVA_COLLEGE.taglinePt,
  path: "/pt/college",
  locale: "pt",
});

export default function PortugueseCollegeCatalogPage() {
  const entryTracks = novaCollegeTrackIndex.filter((track) => track.tier !== "advanced");
  const advancedTracks = novaCollegeTrackIndex.filter((track) => track.tier === "advanced");

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-orange">
            ✦ {NOVA_STEM_HUB.name} · {NOVA_COLLEGE.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{NOVA_COLLEGE.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_COLLEGE.taglinePt}</p>
          <p className="mt-3 max-w-2xl text-sm text-nova-cyan-light/75">
            {NOVA_COLLEGE.trackCount} trilhas técnicas com certificados verificáveis — da sala de aula ao
            primeiro emprego tech, incluindo {QUANTUM_WORKFORCE.shortName} (Tier 2).
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/pt/school" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_SCHOOL.name}
            </Link>
            <Link href="/college" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              English edition ↗
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Trilhas de entrada</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              Fundamentos técnicos · certificados verificáveis · empregabilidade global
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {entryTracks.map((track) => (
                <CollegeTrackCard key={track.slug} track={track} locale="pt" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Trilhas avançadas</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              Especialização · {QUANTUM_WORKFORCE.shortName} · workforce readiness
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {advancedTracks.map((track) => (
                <CollegeTrackCard key={track.slug} track={track} locale="pt" />
              ))}
            </div>
          </section>

          <section className="nova-glass-island text-center">
            <h2 className="text-lg font-bold text-white">
              {novaCollegeTrackIndex.length} trilhas · certificados verificáveis
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80">
              Licencie NOVA College para sua instituição — currículo, plataforma e onboarding dedicado.
            </p>
            <Link href="/partnership" className="nova-btn-secondary mt-4 inline-flex border-white/20 text-white">
              Conhecer NOVA Partnership →
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
