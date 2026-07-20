import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getNovaLanguageCourseBySlug, novaLanguageCourses } from "@/data/nova-language";
import { getLanguageCourseEn } from "@/data/nova-language/catalog-en";
import { NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { JsonLd, breadcrumbJsonLd, courseJsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return novaLanguageCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getNovaLanguageCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  const localized = getLanguageCourseEn(slug);
  return buildPageMetadata({
    title: `${localized?.title ?? course.title} | ${NOVA_LANGUAGE.name}`,
    description: localized?.description ?? course.description,
    path: `/language/${slug}`,
    keywords: [localized?.title ?? course.title, "NOVA Language", course.targetLanguage],
  });
}

export default async function LanguageCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getNovaLanguageCourseBySlug(slug);
  if (!course) notFound();

  const localized = getLanguageCourseEn(slug);
  const title = localized?.title ?? course.title;
  const tagline = localized?.tagline ?? course.tagline;
  const description = localized?.description ?? course.description;

  return (
    <div className="relative flex min-h-screen flex-col">
      <JsonLd
        data={[
          courseJsonLd({ name: title, description, slug }),
          breadcrumbJsonLd([
            { name: NOVA_STEM_HUB.name, path: "/" },
            { name: NOVA_LANGUAGE.name, path: "/language" },
            { name: title, path: `/language/${slug}` },
          ]),
        ]}
      />
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-green">
            ✦ {NOVA_STEM_HUB.name} · {NOVA_LANGUAGE.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{tagline}</p>
          <p className="mt-3 text-sm text-nova-cyan-light/70">
            {course.durationHours} hours · CEFR {course.cefrLevel} · {course.ageRange}
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-3xl space-y-10">
          <section className="nova-glass-island p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">About this course</h2>
            <p className="mt-3 text-sm leading-relaxed text-nova-cyan-light/85">{description}</p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold text-white">Learning outcomes</h2>
            <ul className="space-y-2 text-sm text-nova-cyan-light/80">
              {course.learningOutcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-nova-green">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold text-white">Program structure</h2>
            <div className="space-y-3">
              {course.modules.map((mod) => (
                <article key={mod.order} className="nova-glass-card p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-nova-green/70">
                    Module {mod.order}
                  </p>
                  <p className="mt-1 font-semibold text-white">{mod.title}</p>
                  <p className="mt-1 text-sm text-nova-cyan-light/75">{mod.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            <Link href={NOVA_STEM_HUB.path} className="nova-btn-secondary border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href={NOVA_LANGUAGE.path} className="nova-btn-secondary border-white/20 text-white">
              All {NOVA_LANGUAGE.courseCount} language courses
            </Link>
            <Link href={NOVA_SCHOOL.path} className="nova-btn-secondary border-white/20 text-white/70">
              {NOVA_SCHOOL.name} →
            </Link>
          </section>

          <p className="text-center text-sm text-nova-cyan-light/60">
            Spanish edition:{" "}
            <Link href={`/es/language/${slug}`} className="text-nova-cyan hover:underline">
              Ver en Español
            </Link>
            {" · "}
            Portuguese edition:{" "}
            <Link href={`/pt/language/${slug}`} className="text-nova-cyan hover:underline">
              Ver em Português
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
