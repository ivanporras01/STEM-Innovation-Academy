import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EnrollButton } from "@/components/courses/enroll-button";
import { MissionPathHero } from "@/components/courses/mission-path-hero";
import { SubmissionForm } from "@/components/courses/submission-form";
import { getCourseBySlug, getCourseProgress } from "@/lib/courses";
import { getPathwayMeta } from "@/lib/pathways/meta";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pathwayLabels, lessonTypeLabels, formatDate } from "@/lib/utils";
import { CheckCircle2, Circle, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return { title: course?.title ?? "Course" };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course || !course.published) notFound();

  const session = await auth();
  let enrolled = false;
  let progress = { total: 0, completed: 0, percent: 0 };
  let completedLessonIds = new Set<string>();
  let submission: { content: string; status: string } | null = null;

  if (session?.user) {
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: course.id,
        },
      },
    });
    enrolled = !!enrollment;
    progress = await getCourseProgress(session.user.id, course.id);

    const progressRecords = await db.lessonProgress.findMany({
      where: {
        userId: session.user.id,
        completed: true,
        lesson: { module: { courseId: course.id } },
      },
      select: { lessonId: true },
    });
    completedLessonIds = new Set(progressRecords.map((p) => p.lessonId));

    if (course.assignments[0]) {
      const sub = await db.submission.findUnique({
        where: {
          userId_assignmentId: {
            userId: session.user.id,
            assignmentId: course.assignments[0].id,
          },
        },
      });
      if (sub) submission = { content: sub.content, status: sub.status };
    }
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const meta = getPathwayMeta(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="nova-container">
          {meta ? (
            <MissionPathHero
              meta={meta}
              title={course.title}
              description={course.description}
              totalMissions={totalLessons}
              totalPhases={course.modules.length}
            />
          ) : (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-nova-deep-blue">{course.title}</h1>
              <p className="mt-3 max-w-3xl text-lg text-nova-gray">{course.description}</p>
            </div>
          )}

          <div className="mb-8">
            {!meta && (
              <>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge variant="cyan">{pathwayLabels[course.pathway]}</Badge>
                  <Badge variant="default">{course.level}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-nova-gray">
                  {course.mentor && (
                    <span>
                      Mentor:{" "}
                      <strong className="text-nova-dark-gray">
                        {course.mentor.firstName} {course.mentor.lastName}
                      </strong>
                    </span>
                  )}
                  <span>{totalLessons} missions</span>
                  <span>{course.modules.length} mission phases</span>
                </div>
              </>
            )}

            {meta && course.mentor && (
              <p className="mb-3 text-sm text-nova-gray">
                Innovation Mentor:{" "}
                <strong className="text-nova-dark-gray">
                  {course.mentor.firstName} {course.mentor.lastName}
                </strong>
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {session ? (
                <EnrollButton courseId={course.id} enrolled={enrolled} />
              ) : (
                <Link href="/login" className="nova-btn-primary">
                  Sign in to Join Path
                </Link>
              )}
              {enrolled && <ProgressBar value={progress.percent} className="max-w-xs flex-1" />}
            </div>
          </div>

          <div id="path-outline" className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {course.modules.map((mod) => (
                <section key={mod.id} className="nova-card">
                  <h2 className="mb-1 text-lg font-semibold text-nova-deep-blue">
                    Phase {mod.order}: {mod.title}
                  </h2>
                  {mod.description && (
                    <p className="mb-4 text-sm text-nova-gray">{mod.description}</p>
                  )}
                  <ul className="space-y-2">
                    {mod.lessons.map((lesson) => {
                      const completed = completedLessonIds.has(lesson.id);

                      return (
                        <li key={lesson.id}>
                          {enrolled ? (
                            <Link
                              href={`/courses/${slug}/lessons/${lesson.id}`}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-nova-off-white"
                            >
                              {completed ? (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-nova-green" />
                              ) : (
                                <Circle className="h-5 w-5 shrink-0 text-nova-light-gray" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-nova-deep-blue">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-nova-gray">
                                  {lessonTypeLabels[lesson.type]} · {lesson.duration} min
                                </p>
                              </div>
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 opacity-60">
                              <Lock className="h-5 w-5 shrink-0 text-nova-gray" />
                              <div>
                                <p className="text-sm font-medium text-nova-dark-gray">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-nova-gray">Join path to unlock</p>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>

            <aside className="space-y-6">
              {enrolled && course.assignments[0] && (
                <div className="nova-card">
                  <h3 className="mb-2 font-semibold text-nova-deep-blue">
                    {course.assignments[0].title}
                  </h3>
                  <p className="mb-4 text-sm text-nova-gray">
                    {course.assignments[0].description}
                  </p>
                  {course.assignments[0].dueDate && (
                    <p className="mb-4 text-xs text-nova-gray">
                      Due: {formatDate(course.assignments[0].dueDate)}
                    </p>
                  )}
                  <SubmissionForm
                    assignmentId={course.assignments[0].id}
                    existingContent={submission?.content}
                    status={submission?.status}
                  />
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
