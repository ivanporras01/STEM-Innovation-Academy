import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CollegeTrackCard } from "@/components/college/college-track-card";
import { NOVA_COLLEGE_PAGE_EN } from "@/data/nova-college/catalog-en";
import {
  NOVA_COLLEGE,
  NOVA_SCHOOL,
  QUANTUM_WORKFORCE,
  NOVA_STEM_HUB,
  novaCollegeAdvancedTracks,
  novaCollegeEntryTracks,
  novaCollegeTrackIndex,
} from "@/lib/novahub";
import { NOVA_STEM_HUB_IMPACT } from "@/lib/novahub-impact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: NOVA_COLLEGE.metadataTitle,
  description: NOVA_COLLEGE.description,
  path: "/college",
});

export default function NovaCollegeCatalogPage() {
  const copy = NOVA_COLLEGE_PAGE_EN;

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
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_COLLEGE.tagline}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-3 py-1 text-xs font-semibold text-nova-cyan-light">
              {NOVA_COLLEGE.trackCount} tracks total
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              {NOVA_COLLEGE.tier1TrackCount} Tier 1 · 1 Tier 2 ({QUANTUM_WORKFORCE.shortName})
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={NOVA_SCHOOL.path} className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_SCHOOL.name}
            </Link>
            <Link href="/es/college" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              Edición en Español ↗
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section className="nova-glass-island flex flex-col items-start gap-4 border-nova-orange/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-nova-orange">
                NOVA STEM HUB Scholarships
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">{copy.scholarshipBannerTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-nova-cyan-light/80">{copy.scholarshipBannerBody}</p>
            </div>
            <Link
              href={NOVA_STEM_HUB_IMPACT.applyPath}
              className="nova-btn-primary nova-btn-glow shrink-0 bg-nova-orange hover:bg-nova-orange/90"
            >
              {copy.scholarshipBannerCta}
            </Link>
          </section>

          <section id="college-tracks">
            <h2 className="mb-2 text-xl font-bold text-white">
              Tier 1 — Technical employability ({NOVA_COLLEGE.tier1TrackCount} tracks)
            </h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              Entry-level programs · ~120h · verifiable certificates at{" "}
              <Link href={NOVA_STEM_HUB_IMPACT.verifyPath} className="text-nova-cyan hover:underline">
                verify.novastemhub.education
              </Link>
              {" · "}
              <Link href="#college-tier-2" className="text-nova-orange hover:underline">
                Track {NOVA_COLLEGE.trackCount}: {QUANTUM_WORKFORCE.shortName} (Tier 2) ↓
              </Link>
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {novaCollegeEntryTracks.map((course) => {
                const track = novaCollegeTrackIndex.find((t) => t.slug === course.slug)!;
                return <CollegeTrackCard key={track.slug} track={track} />;
              })}
            </div>
          </section>

          <section id="college-tier-2" className="scroll-mt-24">
            <h2 className="mb-2 text-xl font-bold text-white">
              Tier 2 — Advanced program (track {NOVA_COLLEGE.trackCount} of {NOVA_COLLEGE.trackCount})
            </h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              {QUANTUM_WORKFORCE.programLabel} — the {NOVA_COLLEGE.trackCount}th NOVA College track · interactive lessons via the{" "}
              {QUANTUM_WORKFORCE.shortName} app · certificate {QUANTUM_WORKFORCE.verifyPrefix}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {novaCollegeAdvancedTracks.map((course) => {
                const track = novaCollegeTrackIndex.find((t) => t.slug === course.slug)!;
                return <CollegeTrackCard key={track.slug} track={track} />;
              })}
            </div>
          </section>

          <section className="nova-glass-island border border-nova-orange/20 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-orange">
              Scholarships · NOVA STEM HUB
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{copy.scholarshipBannerTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">
              {copy.scholarshipBannerBody}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/scholarships/apply"
                className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90"
              >
                Apply for scholarship
              </Link>
              <Link href="/scholarships" className="nova-btn-secondary inline-flex border-white/20 text-white">
                View scholarship programs
              </Link>
            </div>
          </section>

          <section className="nova-glass-island p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">B2B · Institutions</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{copy.b2bTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">{copy.b2bBody}</p>
            <Link href="/partnership" className="nova-btn-primary nova-btn-glow mt-6 inline-flex">
              {copy.b2bCta}
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
