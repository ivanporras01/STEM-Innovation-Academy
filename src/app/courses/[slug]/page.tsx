import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EnrollButton } from "@/components/courses/enroll-button";
import { MissionPathHero } from "@/components/courses/mission-path-hero";
import { SubmissionForm } from "@/components/courses/submission-form";
import { getCourseBySlug, getCourseProgress } from "@/lib/courses";
import { ensureCourseProduct } from "@/lib/course-products";
import { formatPrice, hasCourseAccess } from "@/lib/enrollment-access";
import { getPathwayMeta } from "@/lib/pathways/meta";
import { getLmsCoursePublicPresentation } from "@/lib/program-locale-copy";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pathwayLabels, lessonTypeLabels, formatDate } from "@/lib/utils";
import { FinalAssessmentPanel } from "@/components/certificates/final-assessment-panel";
import { resolveCertificateLocale } from "@/lib/certificates/locale";
import { CheckCircle2, Circle, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course" };
  const presentation = getLmsCoursePublicPresentation(slug, {
    title: course.title,
    description: course.description,
    level: course.level,
    pathwayLabel: pathwayLabels[course.pathway] ?? course.pathway,
  });
  return { title: presentation.title, description: presentation.description };
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
  let pendingPayment = false;
  let priceCents = 0;
  let progress = { total: 0, completed: 0, percent: 0 };
  let completedLessonIds = new Set<string>();
  let submission: { content: string; status: string } | null = null;

  const product = await ensureCourseProduct(course.id, course.slug);
  priceCents = product.priceCents;

  if (session?.user) {
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: course.id,
        },
      },
    });
    enrolled = hasCourseAccess(enrollment);
    pendingPayment = enrollment?.status === "PENDING_PAYMENT";
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
  const certLocale = resolveCertificateLocale(slug);
  const presentation = getLmsCoursePublicPresentation(slug, {
    title: course.title,
    description: course.description,
    level: course.level,
    pathwayLabel: pathwayLabels[course.pathway] ?? course.pathway,
  });

  const badgeClass =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-page-main py-12">
        <div className="nova-container">
          {meta ? (
            <MissionPathHero
              meta={meta}
              title={presentation.title}
              description={presentation.description}
              totalMissions={totalLessons}
              totalPhases={course.modules.length}
            />
          ) : (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">{presentation.title}</h1>
              <p className="mt-3 max-w-3xl text-lg text-nova-cyan-light/85">
                {presentation.description}
              </p>
            </div>
          )}

          <div className="mb-8">
            {!meta && (
              <>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Link
                    href={presentation.pathwayHref}
                    className={`${badgeClass} border-nova-cyan/40 bg-nova-cyan/10 text-nova-cyan hover:border-nova-cyan hover:bg-nova-cyan/20`}
                  >
                    {presentation.pathwayLabel}
                  </Link>
                  {presentation.levelHref ? (
                    <Link
                      href={presentation.levelHref}
                      className={`${badgeClass} border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/15`}
                    >
                      {presentation.levelLabel}
                    </Link>
                  ) : (
                    <span
                      className={`${badgeClass} cursor-default border-white/15 bg-white/5 text-white/70`}
                    >
                      {presentation.levelLabel}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-nova-gray">
                  {course.mentor && (
                    <span>
                      Mentor:{" "}
                      <strong className="text-white">
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
              <p className="mb-3 text-sm text-nova-cyan-light/80">
                Innovation Mentor:{" "}
                <strong className="text-white">
                  {course.mentor.firstName} {course.mentor.lastName}
                </strong>
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {session ? (
                <EnrollButton
                  courseId={course.id}
                  courseSlug={slug}
                  courseTitle={presentation.title}
                  enrolled={enrolled}
                  pendingPayment={pendingPayment}
                  priceCents={priceCents}
                  stripeAvailable={Boolean(process.env.STRIPE_SECRET_KEY?.startsWith("sk_"))}
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/register?callbackUrl=${encodeURIComponent(`/courses/${slug}`)}`}
                    className="nova-btn-primary nova-btn-glow"
                  >
                    Register &amp; enroll — {formatPrice(priceCents)}
                  </Link>
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent(`/courses/${slug}`)}`}
                    className="nova-btn-secondary border-white/20 text-white"
                  >
                    Login
                  </Link>
                </div>
              )}
              {enrolled && <ProgressBar value={progress.percent} className="max-w-xs flex-1" />}
            </div>
          </div>

          <div id="path-outline" className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {course.modules.map((mod) => (
                <section key={mod.id} className="nova-card">
                  <h2 className="mb-1 text-lg font-semibold text-white">
                    Phase {mod.order}: {mod.title}
                  </h2>
                  {mod.description && (
                    <p className="mb-4 text-sm text-nova-cyan-light/80">{mod.description}</p>
                  )}
                  <ul className="space-y-2">
                    {mod.lessons.map((lesson) => {
                      const completed = completedLessonIds.has(lesson.id);

                      return (
                        <li key={lesson.id}>
                          {enrolled ? (
                            <Link
                              href={`/courses/${slug}/lessons/${lesson.id}`}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/10"
                            >
                              {completed ? (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-nova-green" />
                              ) : (
                                <Circle className="h-5 w-5 shrink-0 text-white/30" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-white">{lesson.title}</p>
                                <p className="text-xs text-nova-cyan-light/70">
                                  {lessonTypeLabels[lesson.type]} · {lesson.duration} min
                                </p>
                              </div>
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 opacity-60">
                              <Lock className="h-5 w-5 shrink-0 text-nova-cyan-light/50" />
                              <div>
                                <p className="text-sm font-medium text-white/80">{lesson.title}</p>
                                <p className="text-xs text-nova-cyan-light/60">Join path to unlock</p>
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
              {enrolled && (
                <FinalAssessmentPanel
                  courseId={course.id}
                  courseTitle={presentation.title}
                  courseSlug={slug}
                  locale={certLocale}
                />
              )}
              {enrolled && course.assignments[0] && (
                <div className="nova-card">
                  <h3 className="mb-2 font-semibold text-white">{course.assignments[0].title}</h3>
                  <p className="mb-4 text-sm text-nova-cyan-light/80">
                    {course.assignments[0].description}
                  </p>
                  {course.assignments[0].dueDate && (
                    <p className="mb-4 text-xs text-nova-cyan-light/70">
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
