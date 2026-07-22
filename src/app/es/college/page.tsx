import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CollegeTrackCard } from "@/components/college/college-track-card";
import { NOVA_COLLEGE_PAGE_ES } from "@/data/nova-college/catalog-es";
import {
  NOVA_COLLEGE,
  NOVA_SCHOOL,
  QUANTUM_WORKFORCE,
  NOVA_STEM_HUB,
  novaCollegeAdvancedTracks,
  novaCollegeEntryTracks,
  novaCollegeTrackIndex,
} from "@/lib/novahub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_COLLEGE.name} — Edición en Español`,
  description: NOVA_COLLEGE.descriptionEs,
  path: "/es/college",
  locale: "es",
});

export default function SpanishCollegeCatalogPage() {
  const copy = NOVA_COLLEGE_PAGE_ES;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-orange/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{NOVA_COLLEGE.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{copy.heroSubtitle}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-3 py-1 text-xs font-semibold text-nova-cyan-light">
              {NOVA_COLLEGE.trackCount} tracks en total
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              {NOVA_COLLEGE.tier1TrackCount} Tier 1 · 1 Tier 2 ({QUANTUM_WORKFORCE.shortName})
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/es/school" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_SCHOOL.name}
            </Link>
            <Link href="/college" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              {copy.englishEditionLink}
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section id="college-tracks">
            <h2 className="mb-2 text-xl font-bold text-white">
              Tier 1 — Empleabilidad técnica ({NOVA_COLLEGE.tier1TrackCount} tracks)
            </h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              Programas de entrada · ~120h · certificados verificables ·{" "}
              <Link href="#college-tier-2" className="text-nova-orange hover:underline">
                Track {NOVA_COLLEGE.trackCount}: {QUANTUM_WORKFORCE.shortName} (Tier 2) ↓
              </Link>
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {novaCollegeEntryTracks.map((course) => {
                const track = novaCollegeTrackIndex.find((t) => t.slug === course.slug)!;
                return <CollegeTrackCard key={track.slug} track={track} locale="es" />;
              })}
            </div>
          </section>

          <section id="college-tier-2" className="scroll-mt-24">
            <h2 className="mb-2 text-xl font-bold text-white">
              Tier 2 — Avanzado (track {NOVA_COLLEGE.trackCount} de {NOVA_COLLEGE.trackCount})
            </h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              {QUANTUM_WORKFORCE.programLabel} — el track {NOVA_COLLEGE.trackCount} de NOVA College · lecciones interactivas en la app{" "}
              {QUANTUM_WORKFORCE.shortName} · certificado {QUANTUM_WORKFORCE.verifyPrefix}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {novaCollegeAdvancedTracks.map((course) => {
                const track = novaCollegeTrackIndex.find((t) => t.slug === course.slug)!;
                return <CollegeTrackCard key={track.slug} track={track} locale="es" />;
              })}
            </div>
          </section>

          <section className="nova-glass-island p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">B2B · Instituciones</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{copy.b2bTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">{copy.b2bBody}</p>
            <Link href="/es/partnership" className="nova-btn-primary nova-btn-glow mt-6 inline-flex">
              {copy.b2bCta}
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
