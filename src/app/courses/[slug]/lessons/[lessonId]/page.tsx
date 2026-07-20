import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { Badge } from "@/components/ui/badge";
import { ExplorerMissionBanner } from "@/components/courses/explorer-mission-banner";
import { CompleteLessonButton } from "@/components/courses/complete-lesson-button";
import { getLessonWithProgress } from "@/lib/courses";
import { getMentorMissionMeta } from "@/lib/pathways/mentor-missions";
import { getPathwayMeta } from "@/lib/pathways/meta";
import { PathwayIcon } from "@/components/ui/pathway-icon";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { lessonTypeLabels } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const { lesson } = await getLessonWithProgress(lessonId);
  return { title: lesson?.title ?? "Mission" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const session = await auth();

  if (!session?.user) redirect(`/login?callbackUrl=/courses/${slug}/lessons/${lessonId}`);

  const enrollment = await db.enrollment.findFirst({
    where: {
      userId: session.user.id,
      course: { slug },
    },
  });

  if (!enrollment || !hasCourseAccess(enrollment)) redirect(`/courses/${slug}`);

  const { lesson, completed } = await getLessonWithProgress(lessonId, session.user.id);

  if (!lesson || lesson.module.course.slug !== slug) notFound();

  const allLessons = lesson.module.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const meta = getPathwayMeta(slug);
  const mentorMeta = getMentorMissionMeta(slug, lesson.title);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-page-main py-8">
        <div className="nova-container max-w-4xl">
          <Link
            href={`/courses/${slug}`}
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-nova-cyan hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to mission path
          </Link>

          {meta && (
            <div className="nova-glass-card mb-6 flex items-center gap-3 border-nova-cyan/20">
              <PathwayIcon pathway={meta.pathway} variant="card" className="h-12 w-12 text-xl" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-nova-cyan">
                  {lesson.module.title}
                </p>
                <p className="text-sm font-semibold text-white">
                  Mission {currentIndex + 1} of {allLessons.length}
                </p>
              </div>
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="cyan">{lessonTypeLabels[lesson.type]}</Badge>
            <Badge variant="default">{lesson.duration} min</Badge>
            {completed && (
              <Badge variant="green">Achievement unlocked ✦</Badge>
            )}
          </div>

          <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">{lesson.title}</h1>

          <ExplorerMissionBanner
            lessonTitle={lesson.title}
            lessonType={lesson.type}
            meta={mentorMeta}
            courseSlug={slug}
          />

          {lesson.type === "VIDEO" && lesson.videoUrl && (
            <div className="mb-8 aspect-video overflow-hidden rounded-nova shadow-nova">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="nova-glass-card mb-8 text-nova-cyan-light/90">
            <MarkdownContent content={lesson.content} />
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <CompleteLessonButton lessonId={lesson.id} completed={completed} />

            <div className="flex gap-2">
              {prevLesson && (
                <Link
                  href={`/courses/${slug}/lessons/${prevLesson.id}`}
                  className="nova-btn-secondary text-sm"
                >
                  <ChevronLeft className="mr-1 inline h-4 w-4" />
                  Previous Mission
                </Link>
              )}
              {nextLesson && (
                <Link
                  href={`/courses/${slug}/lessons/${nextLesson.id}`}
                  className="nova-btn-primary text-sm"
                >
                  Next Mission
                  <ChevronRight className="ml-1 inline h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
