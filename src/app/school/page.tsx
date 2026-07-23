import type { Metadata } from "next";
import Link from "next/link";
import { SchoolElectiveCard } from "@/components/school/school-elective-card";
import { NOVA_SCHOOL_PAGE_EN } from "@/data/nova-school/catalog-en";
import { novaSchoolElectiveIndex } from "@/data/nova-school";
import { NOVA_COLLEGE, NOVA_SCHOOL } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: NOVA_SCHOOL.metadataTitle,
  description: NOVA_SCHOOL.description,
  path: "/school",
});

export default function NovaSchoolCatalogPage() {
  const copy = NOVA_SCHOOL_PAGE_EN;

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/10 via-transparent to-nova-blue/10" />
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{NOVA_SCHOOL.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_SCHOOL.tagline}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={NOVA_COLLEGE.path} className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_COLLEGE.name}
            </Link>
            <Link href="/es/school" className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              Edición en Español ↗
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">{copy.electivesSectionTitle}</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">{copy.electivesSectionSubtitle}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {novaSchoolElectiveIndex.map((elective) => (
                <SchoolElectiveCard key={elective.slug} elective={elective} />
              ))}
            </div>
          </section>

          <section className="nova-glass-island flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-white">{copy.missionPathsTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-nova-cyan-light/80">{copy.missionPathsBody}</p>
            </div>
            <Link href={NOVA_SCHOOL.coursesPath} className="nova-btn-primary nova-btn-glow shrink-0">
              {copy.missionPathsCta}
            </Link>
          </section>

          <section className="nova-glass-island text-center">
            <h2 className="text-lg font-bold text-white">{copy.b2bTitle}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80">{copy.b2bBody}</p>
            <Link href="/partnership" className="nova-btn-secondary mt-4 inline-flex border-white/20 text-white">
              {copy.b2bCta}
            </Link>
          </section>
        </div>
      </main>

      </div>
  );
}
