import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { findCollegeLesson } from "@/lib/nova-college-catalog";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import { NOVA_COLLEGE } from "@/lib/novahub-brand";

type Props = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const en = getCollegeTrackEn(slug);
  return {
    title: en ? `${en.title} — Lesson | ${NOVA_COLLEGE.name}` : "Lesson",
  };
}

export default async function CollegeLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const ctx = findCollegeLesson(slug, lessonSlug);
  if (!ctx) notFound();

  const en = getCollegeTrackEn(slug);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="nova-space-section relative flex-1 py-16">
        <div className="nova-container max-w-2xl text-center">
          <Link
            href={`/college/${slug}`}
            className="mb-6 inline-block text-sm text-nova-cyan hover:underline"
          >
            ← {en?.title ?? ctx.course.title}
          </Link>

          <div className="nova-glass-island border-nova-cyan/20 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              Spanish edition only
            </p>
            <h1 className="mt-3 text-2xl font-black text-white">
              Interactive lessons available in Spanish edition
            </h1>
            <p className="mt-4 text-sm text-nova-cyan-light/80">
              Full curriculum content for this track is published in the Spanish edition at{" "}
              <code className="text-nova-cyan">/es/college</code>. English routes show program
              overview and outcomes — not Spanish lesson content.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={`/es/college/${slug}/lessons/${lessonSlug}`}
                className="nova-btn-primary nova-btn-glow inline-flex"
              >
                Open lesson in Spanish edition →
              </Link>
              <Link
                href={`/college/${slug}`}
                className="nova-btn-secondary inline-flex border-white/20 text-white"
              >
                Back to English program overview
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
