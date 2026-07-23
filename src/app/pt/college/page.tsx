import type { Metadata } from "next";
import Link from "next/link";
import { CollegeTrackCard } from "@/components/college/college-track-card";
import {
  NOVA_COLLEGE,
  NOVA_SCHOOL,
  QUANTUM_WORKFORCE,
  novaCollegeTrackIndex
} from "@/lib/novahub";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

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
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <PageHero
          title={NOVA_COLLEGE.name}
          subtitle={NOVA_COLLEGE.taglinePt}
          description={`${NOVA_COLLEGE.trackCount} trilhas técnicas com certificados verificáveis — da sala de aula ao primeiro emprego tech, incluindo ${QUANTUM_WORKFORCE.shortName} (Tier 2).`}
        >
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/pt/school" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_SCHOOL.name}
            </Link>
            <Link href="/college" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              English edition ↗
            </Link>
          </div>
        </PageHero>
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

      </div>
  );
}
