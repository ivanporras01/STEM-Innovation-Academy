import type { Metadata } from "next";
import Link from "next/link";
import { LanguageCourseCard } from "@/components/language/language-course-card";
import { NOVA_LANGUAGE_PAGE_PT } from "@/data/nova-language/catalog-pt";
import { novaLanguageCourseIndex } from "@/data/nova-language";
import { NOVA_LANGUAGE, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_LANGUAGE.name} — Edição em Português`,
  description: NOVA_LANGUAGE.descriptionPt,
  path: "/pt/language",
  locale: "pt",
});

export default function PortugueseNovaLanguageCatalogPage() {
  const copy = NOVA_LANGUAGE_PAGE_PT;

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <PageHero title={NOVA_LANGUAGE.name} subtitle={NOVA_LANGUAGE.taglinePt} description={copy.heroDescription}>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/pt" className="nova-btn-secondary inline-flex border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href={NOVA_LANGUAGE.path} className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              English edition ↗
            </Link>
            <Link href={NOVA_LANGUAGE.pathEs} className="nova-btn-secondary inline-flex border-white/20 text-white/60">
              Edición en Español ↗
            </Link>
          </div>
        </PageHero>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-14">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">{copy.coursesSectionTitle}</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">{copy.coursesSectionSubtitle}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {novaLanguageCourseIndex.map((course) => (
                <LanguageCourseCard key={course.slug} course={course} locale="pt" />
              ))}
            </div>
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
