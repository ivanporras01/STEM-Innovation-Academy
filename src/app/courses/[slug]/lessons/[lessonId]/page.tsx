import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { Badge } from "@/components/ui/badge";
import { CompleteLessonButton } from "@/components/courses/complete-lesson-button";
import { getLessonWithProgress } from "@/lib/courses";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { lessonTypeLabels } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const { lesson } = await getLessonWithProgress(lessonId);
  return { title: lesson?.title ?? "Lesson" };
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

  if (!enrollment) redirect(`/courses/${slug}`);

  const { lesson, completed } = await getLessonWithProgress(lessonId, session.user.id);

  if (!lesson || lesson.module.course.slug !== slug) notFound();

  const allLessons = lesson.module.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="nova-container max-w-4xl">
          <Link
            href={`/courses/${slug}`}
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-nova-cyan hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to {lesson.module.course.title}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="cyan">{lessonTypeLabels[lesson.type]}</Badge>
            <Badge variant="default">{lesson.duration} min</Badge>
          </div>

          <h1 className="mb-6 text-2xl font-bold text-nova-deep-blue sm:text-3xl">
            {lesson.title}
          </h1>

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

          <div className="nova-card mb-8">
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
                  Previous
                </Link>
              )}
              {nextLesson && (
                <Link
                  href={`/courses/${slug}/lessons/${nextLesson.id}`}
                  className="nova-btn-primary text-sm"
                >
                  Next
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
