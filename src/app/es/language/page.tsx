import type { Metadata } from "next";
import Link from "next/link";
import { LanguageCourseCard } from "@/components/language/language-course-card";
import { NOVA_LANGUAGE_PAGE_ES } from "@/data/nova-language/catalog-es";
import { novaLanguageCourseIndex } from "@/data/nova-language";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_LANGUAGE.name} — Edición en Español`,
  description: NOVA_LANGUAGE.descriptionEs,
  path: "/es/language",
  locale: "es",
});

export default function SpanishNovaLanguageCatalogPage() {
  const copy = NOVA_LANGUAGE_PAGE_ES;

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="nova-container relative">
          <h1 className="text-3xl font-black sm:text-4xl">{NOVA_LANGUAGE.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_LANGUAGE.taglineEs}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={NOVA_STEM_HUB.pathEs} className="nova-btn-secondary inline-flex border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href="/es/school" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_SCHOOL.name}
            </Link>
            <Link href="/es/college" className="nova-btn-secondary inline-flex border-white/20 text-white">
              {NOVA_COLLEGE.name}
            </Link>
            <Link href={NOVA_LANGUAGE.path} className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              English edition ↗
            </Link>
          </div>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">{copy.coursesSectionTitle}</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">{copy.coursesSectionSubtitle}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {novaLanguageCourseIndex.map((course) => (
                <LanguageCourseCard key={course.slug} course={course} locale="es" />
              ))}
            </div>
          </section>

          <section className="nova-glass-island text-center">
            <h2 className="text-lg font-bold text-white">{copy.b2bTitle}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80">{copy.b2bBody}</p>
            <Link href="/es/partnership" className="nova-btn-secondary mt-4 inline-flex border-white/20 text-white">
              {copy.b2bCta}
            </Link>
          </section>
        </div>
      </main>

      </div>
  );
}
