import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getNovaSchoolElectiveBySlug, novaSchoolElectives } from "@/data/nova-school";
import { getSchoolElectiveEs } from "@/data/nova-school/catalog-es";
import { NOVA_COLLEGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return novaSchoolElectives.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const es = getSchoolElectiveEs(slug);
  const elective = getNovaSchoolElectiveBySlug(slug);
  if (!elective) return { title: "Electiva no encontrada" };
  return {
    title: `${es?.title ?? elective.title} | ${NOVA_SCHOOL.name}`,
    description: es?.description ?? elective.description,
  };
}

export default async function SpanishSchoolElectivePage({ params }: Props) {
  const { slug } = await params;
  const elective = getNovaSchoolElectiveBySlug(slug);
  if (!elective) notFound();

  const es = getSchoolElectiveEs(slug);
  const title = es?.title ?? elective.title;
  const tagline = es?.tagline ?? elective.tagline;
  const description = es?.description ?? elective.description;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div className="nova-container relative">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ {NOVA_STEM_HUB.name} · {NOVA_SCHOOL.name}
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{tagline}</p>
          <p className="mt-3 text-sm text-nova-cyan-light/70">
            {elective.durationWeeks} semanas · Edades {elective.ageRange}
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container max-w-3xl space-y-10">
          <section className="nova-glass-island p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">Sobre esta electiva</h2>
            <p className="mt-3 text-sm leading-relaxed text-nova-cyan-light/85">{description}</p>
          </section>

          <section className="flex flex-wrap gap-3">
            <Link href="/es/school" className="nova-btn-secondary border-white/20 text-white">
              ← Todas las electivas
            </Link>
            <Link href="/es/college" className="nova-btn-secondary border-white/20 text-white/70">
              {NOVA_COLLEGE.name} →
            </Link>
          </section>

          <p className="text-center text-sm text-nova-cyan-light/60">
            Edición en inglés:{" "}
            <Link href={`/school/${slug}`} className="text-nova-cyan hover:underline">
              View in English
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
