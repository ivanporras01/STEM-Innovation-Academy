import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CollegeLessonContent } from "@/components/college/college-lesson-content";
import { Badge } from "@/components/ui/badge";
import {
  findCollegeLesson,
} from "@/lib/nova-college-catalog";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { courseSlugForProgram, getProgramEnrollmentContext } from "@/lib/program-enrollment";
import { getProgramBySlug } from "@/data/courses";

type Props = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

/** Enrollment gating requires session — do not statically prerender locked lessons. */
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const ctx = findCollegeLesson(slug, lessonSlug);
  return { title: ctx ? `${ctx.lesson.title} | NOVA College` : "Lección" };
}

export default async function SpanishCollegeLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const ctx = findCollegeLesson(slug, lessonSlug);
  if (!ctx) notFound();

  const content = ctx.lesson.content;
  if (!content) notFound();

  const program = getProgramBySlug(slug);
  if (program) {
    // Ensure LMS course + modules exist for enrolled dashboards.
    await getProgramEnrollmentContext(slug);
  }

  const session = await auth();
  let enrolled = false;
  if (session?.user && program) {
    const lmsSlug = courseSlugForProgram(program);
    const course = await db.course.findUnique({ where: { slug: lmsSlug } });
    if (course) {
      const enrollment = await db.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      });
      enrolled = hasCourseAccess(enrollment);
    }
  }

  if (!enrolled) {
    redirect(`/enroll/${slug}?next=/es/college/${slug}/lessons/${lessonSlug}`);
  }

  const { course, module, lesson, lessonIndex, moduleLessons } = ctx;
  const prev = lessonIndex > 0 ? moduleLessons[lessonIndex - 1] : null;
  const next =
    lessonIndex < moduleLessons.length - 1 ? moduleLessons[lessonIndex + 1] : null;

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="nova-space-section relative flex-1 py-10">
        <div className="nova-container max-w-4xl">
          <Link
            href={`/es/college/${slug}`}
            className="mb-6 inline-flex items-center gap-1 text-sm text-nova-cyan hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            {course.title}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="cyan">Módulo {module.order}</Badge>
            <Badge variant="default">{lesson.type}</Badge>
            <span className="text-xs text-nova-cyan-light/50">{lesson.hours}h</span>
          </div>

          <h1 className="mb-2 text-3xl font-black text-white">{lesson.title}</h1>
          <p className="mb-8 text-nova-cyan-light/80">{lesson.description}</p>

          <CollegeLessonContent content={content} title={lesson.title} />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            {prev?.content ? (
              <Link
                href={`/es/college/${slug}/lessons/${prev.slug}`}
                className="inline-flex items-center gap-1 text-sm text-nova-cyan hover:underline"
              >
                <ChevronLeft className="h-4 w-4" />
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next?.content ? (
              <Link
                href={`/es/college/${slug}/lessons/${next.slug}`}
                className="inline-flex items-center gap-1 text-sm text-nova-cyan hover:underline"
              >
                {next.title}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>

          <p className="mt-8 text-center text-sm text-nova-cyan-light/70">
            También puedes seguir progreso en el{" "}
            <Link href={`/courses/nova-college-${slug}`} className="text-nova-cyan hover:underline">
              LMS dashboard
            </Link>
            .
          </p>

          <div className="nova-glass-island mt-10 border-nova-orange/20 p-6 text-center">
            <p className="text-sm text-nova-cyan-light/80">
              ¿Necesitas apoyo económico para completar este track?
            </p>
            <Link
              href="/es/scholarships/apply"
              className="nova-btn-primary nova-btn-glow mt-4 inline-flex bg-nova-orange hover:bg-nova-orange/90"
            >
              Solicitar beca
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-nova-cyan-light/50">
            <Link href={`/college/${slug}`} className="hover:text-nova-cyan">
              English edition program overview →
            </Link>
          </p>
        </div>
      </main>

      </div>
  );
}
