import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LanguageCourseCard } from "@/components/language/language-course-card";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { NOVA_LANGUAGE_PAGE_EN } from "@/data/nova-language/catalog-en";
import { novaLanguageCourseIndex } from "@/data/nova-language";
import { NOVA_LANGUAGE, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata, PRODUCT_SEO_SNIPPETS } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: NOVA_LANGUAGE.metadataTitle,
  description: `${NOVA_LANGUAGE.description} ${PRODUCT_SEO_SNIPPETS.language}.`,
  path: "/language",
  keywords: [
    "learn English",
    "learn Spanish",
    "learn Portuguese",
    "NOVA Language",
    "CEFR language courses",
  ],
});

export default function NovaLanguageCatalogPage() {
  const copy = NOVA_LANGUAGE_PAGE_EN;

  return (
    <div className="relative flex min-h-screen flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: NOVA_STEM_HUB.name, path: "/" },
          { name: NOVA_LANGUAGE.name, path: "/language" },
        ])}
      />
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-green/10 via-transparent to-nova-cyan/10" />
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-green">
            ✦ {NOVA_STEM_HUB.name} · {NOVA_LANGUAGE.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{NOVA_LANGUAGE.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{NOVA_LANGUAGE.tagline}</p>
          <p className="mt-3 max-w-3xl text-sm text-nova-cyan-light/80">{copy.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={NOVA_STEM_HUB.path} className="nova-btn-secondary inline-flex border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href="/es/language" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
              Edición en Español ↗
            </Link>
            <Link href="/pt/language" className="nova-btn-secondary inline-flex border-white/20 text-white/70">
              Edição em Português ↗
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
                <LanguageCourseCard key={course.slug} course={course} />
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

      <Footer />
    </div>
  );
}
