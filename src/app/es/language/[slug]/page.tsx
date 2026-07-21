import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getNovaLanguageCourseBySlug, novaLanguageCourses } from "@/data/nova-language";
import { getLanguageCourseEs } from "@/data/nova-language/catalog-es";
import { NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return novaLanguageCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getNovaLanguageCourseBySlug(slug);
  if (!course) return { title: "Curso no encontrado" };
  const localized = getLanguageCourseEs(slug);
  return {
    title: `${localized?.title ?? course.title} | ${NOVA_LANGUAGE.name}`,
    description: localized?.description ?? course.description,
  };
}

export default async function SpanishLanguageCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getNovaLanguageCourseBySlug(slug);
  if (!course) notFound();

  const localized = getLanguageCourseEs(slug);
  const title = localized?.title ?? course.title;
  const tagline = localized?.tagline ?? course.tagline;
  const description = localized?.description ?? course.description;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-green">
            ✦ {NOVA_STEM_HUB.name} · {NOVA_LANGUAGE.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{tagline}</p>
          <p className="mt-3 text-sm text-nova-cyan-light/70">
            ~{course.durationHours} horas · MCER {course.cefrLevel} · {course.ageRange}
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-3xl space-y-10">
          <section className="nova-glass-island p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">Sobre este curso</h2>
            <p className="mt-3 text-sm leading-relaxed text-nova-cyan-light/85">{description}</p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold text-white">Resultados de aprendizaje</h2>
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
            <h2 className="mb-4 text-lg font-bold text-white">Estructura del programa</h2>
            <div className="space-y-3">
              {course.modules.map((mod) => (
                <article key={mod.order} className="nova-glass-card p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-nova-green/70">
                    Módulo {mod.order}
                  </p>
                  <p className="mt-1 font-semibold text-white">{mod.title}</p>
                  <p className="mt-1 text-sm text-nova-cyan-light/75">{mod.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            <Link href={NOVA_STEM_HUB.pathEs} className="nova-btn-secondary border-white/20 text-white">
              ← {NOVA_STEM_HUB.name}
            </Link>
            <Link href={NOVA_LANGUAGE.pathEs} className="nova-btn-secondary border-white/20 text-white">
              Todos los cursos de idiomas
            </Link>
            <Link href="/es/school" className="nova-btn-secondary border-white/20 text-white/70">
              {NOVA_SCHOOL.name} →
            </Link>
          </section>

          <p className="text-center text-sm text-nova-cyan-light/60">
            Edición en inglés:{" "}
            <Link href={`/language/${slug}`} className="text-nova-cyan hover:underline">
              View in English
            </Link>
            {" · "}
            Edição em português:{" "}
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
