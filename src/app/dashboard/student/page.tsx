import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CourseCard } from "@/components/courses/course-card";
import {
  getUserEnrollments,
  getPublishedCourses,
  getFirstIncompleteLessonUrl,
} from "@/lib/courses";
import { PATHWAY_META, getPathwayMeta } from "@/lib/pathways/meta";
import { getLmsCoursePublicPresentation } from "@/lib/program-locale-copy";
import { pathwayLabels } from "@/lib/utils";
import { db } from "@/lib/db";
import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";
import { NovaLogoIcon } from "@/components/ui/nova-logo-mark";
export const metadata: Metadata = {
  title: "Explorer Portal — NOVA",
};
export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const [enrollments, publishedCourses, experienceProgress] = await Promise.all([
    getUserEnrollments(session.user.id),
    getPublishedCourses(),
    db.experienceProgress.findMany({ where: { userId: session.user.id } }),
  ]);
  const enrolledSlugs = new Set(enrollments.map((e) => e.course.slug));
  const lessonsCompleted = enrollments.reduce((acc, e) => acc + e.completedLessons, 0);
  const exploreCompletions = experienceProgress.filter((p) => p.completedAt).length;
  const exploreProgress = (slug: string) =>
    experienceProgress.find((p) => p.experienceSlug === slug);
  const inProgressEnrollments = enrollments
    .filter((e) => e.progress > 0 && e.progress < 100)
    .sort((a, b) => b.progress - a.progress);
  const activeEnrollment =
    inProgressEnrollments[0] ?? enrollments.find((e) => e.progress < 100);
  const continueLessonUrl = activeEnrollment
    ? await getFirstIncompleteLessonUrl(
        session.user.id,
        activeEnrollment.course.slug,
        activeEnrollment.course.id
      )
    : null;
  const inProgressExperience = experienceProgress.find((p) => !p.completedAt);
  const inProgressMeta = inProgressExperience
    ? Object.values(PATHWAY_META).find(
        (m) => m.experienceSlug === inProgressExperience.experienceSlug
      )
    : undefined;
  const unenrolledCourse = publishedCourses.find((c) => !enrolledSlugs.has(c.slug));
  type NextAction = {
    title: string;
    description: string;
    href: string;
    cta: string;
    icon: "path" | "explore" | "discover";
  };
  const nextActions: NextAction[] = [];
  if (activeEnrollment && continueLessonUrl) {
    const activeCopy = getLmsCoursePublicPresentation(activeEnrollment.course.slug, {
      title: activeEnrollment.course.title,
      description: activeEnrollment.course.description,
      level: activeEnrollment.course.level,
      pathwayLabel: pathwayLabels[activeEnrollment.course.pathway] ?? activeEnrollment.course.pathway,
    });
    nextActions.push({
      title: `Continue ${activeCopy.title}`,
      description: `${activeEnrollment.progress}% complete · ${activeEnrollment.totalLessons - activeEnrollment.completedLessons} missions left`,
      href: continueLessonUrl,
      cta: "Launch next mission",
      icon: "path",
    });
  }
  if (inProgressExperience && inProgressMeta) {
    nextActions.push({
      title: `Resume ${inProgressMeta.experienceTitle}`,
      description: `Explore Now · stage ${inProgressExperience.currentStage + 1} of 8`,
      href: `/experiences/${inProgressExperience.experienceSlug}`,
      cta: "Resume quest",
      icon: "explore",
    });
  } else if (!inProgressExperience) {
    const startMeta = Object.values(PATHWAY_META).find(
      (m) => !exploreProgress(m.experienceSlug)
    );
    if (startMeta) {
      nextActions.push({
        title: `Start ${startMeta.experienceTitle}`,
        description: "Jump into an immersive Explore Now intro quest",
        href: `/experiences/${startMeta.experienceSlug}`,
        cta: "Begin quest",
        icon: "explore",
      });
    }
  }
  if (unenrolledCourse && nextActions.length < 3) {
    const unenrolledCopy = getLmsCoursePublicPresentation(unenrolledCourse.slug, {
      title: unenrolledCourse.title,
      description: unenrolledCourse.description,
      level: unenrolledCourse.level,
      pathwayLabel: pathwayLabels[unenrolledCourse.pathway] ?? unenrolledCourse.pathway,
    });
    nextActions.push({
      title: `Enroll in ${unenrolledCopy.title}`,
      description: "Begin a new Mission Path adventure",
      href: `/courses/${unenrolledCourse.slug}`,
      cta: "View path",
      icon: "discover",
    });
  }
  if (nextActions.length === 0) {
    nextActions.push({
      title: "Explore Mission Paths",
      description: "Discover your next NOVA adventure",
      href: "/courses",
      cta: "Browse paths",
      icon: "discover",
    });
  }
  const actionIcons = {
    path: Map,
    explore: Sparkles,
    discover: Compass,
  };
  return (
    <DashboardShell user={session.user}>
      <div className="mb-8">
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
          Explorer Portal
        </p>
        <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold text-white">
          <span>Welcome back, {session.user.firstName}!</span>
          <NovaLogoIcon size="sm" className="opacity-90" />
        </h1>
        <p className="mt-1 text-nova-cyan-light/80">
          Your mission command center — you belong here. Pick up where you left off and launch
          what&apos;s next when <em>you</em> feel ready.
        </p>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Mission Paths" value={enrollments.length} icon="book" />
        <StatCard
          label="Missions Completed"
          value={lessonsCompleted}
          icon="trophy"
          accent="orange"
        />
        <StatCard
          label="Explore Now Completions"
          value={exploreCompletions}
          icon="graduation"
          accent="green"
        />
      </div>
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">What&apos;s Next</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {nextActions.slice(0, 3).map((action) => {
            const Icon = actionIcons[action.icon];
            return (
              <Link
                key={action.href + action.title}
                href={action.href}
                className="nova-glass-card group flex h-full min-h-[11rem] flex-col transition hover:border-nova-cyan/40"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/10 text-nova-cyan">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-nova-cyan">
                  {action.title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-nova-cyan-light/80">{action.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-nova-cyan">
                  {action.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      {enrollments.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Mission Path Progress</h2>
            <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">
              Find more paths →
            </Link>
          </div>
          <div className="space-y-3">
            {enrollments.map((enrollment) => {
              const remaining = enrollment.totalLessons - enrollment.completedLessons;
              const enrollmentCopy = getLmsCoursePublicPresentation(enrollment.course.slug, {
                title: enrollment.course.title,
                description: enrollment.course.description,
                level: enrollment.course.level,
                pathwayLabel:
                  pathwayLabels[enrollment.course.pathway] ?? enrollment.course.pathway,
              });
              return (
                <div key={enrollment.id} className="nova-glass-card">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/courses/${enrollment.course.slug}`}
                        className="font-semibold text-white hover:text-nova-cyan"
                      >
                        {enrollmentCopy.title}
                      </Link>
                      <p className="mt-0.5 text-sm text-nova-cyan-light/80">
                        {enrollment.completedLessons} of {enrollment.totalLessons} missions done
                        {remaining > 0 && ` · ${remaining} remaining`}
                        {remaining === 0 && " · Path complete!"}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-nova-blue">{enrollment.progress}%</span>
                  </div>
                  <ProgressBar value={enrollment.progress} />
                </div>
              );
            })}
          </div>
        </section>
      )}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Explore Now Status</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(PATHWAY_META).map((meta) => {
            const prog = exploreProgress(meta.experienceSlug);
            let status = "Not started";
            let statusClass = "text-nova-cyan-light/80 bg-white/10";
            if (prog?.completedAt) {
              status = "Complete";
              statusClass = "text-nova-green bg-nova-green/10";
            } else if (prog) {
              status = `In progress · stage ${prog.currentStage + 1}/8`;
              statusClass = "text-nova-cyan bg-nova-cyan/10";
            }
            return (
              <div key={meta.experienceSlug} className="nova-glass-card flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{meta.experienceTitle}</p>
                  <p className="text-xs text-nova-cyan-light/80">{meta.badge}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass}`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">All Mission Paths</h2>
        <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">
          Browse all paths →
        </Link>
      </div>
      <div className="mb-6 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {publishedCourses.map((course) => {
          const meta = getPathwayMeta(course.slug);
          const enrollment = enrollments.find((e) => e.course.slug === course.slug);
          const expProg = meta ? exploreProgress(meta.experienceSlug) : undefined;
          const presentation = getLmsCoursePublicPresentation(course.slug, {
            title: course.title,
            description: course.description,
            level: course.level,
            pathwayLabel: pathwayLabels[course.pathway] ?? course.pathway,
          });
          return (
            <CourseCard
              key={course.id}
              slug={course.slug}
              title={presentation.title}
              description={presentation.description}
              pathway={course.pathway}
              level={presentation.levelLabel}
              pathwayDisplayLabel={presentation.pathwayLabel}
              pathwayHref={presentation.pathwayHref}
              levelHref={presentation.levelHref}
              progress={enrollment?.progress}
              enrolled={enrolledSlugs.has(course.slug)}
              mentorName={
                course.mentor
                  ? `${course.mentor.firstName} ${course.mentor.lastName}`
                  : undefined
              }
              experienceSlug={meta?.experienceSlug}
              experienceTitle={meta?.experienceTitle}
              exploreComplete={Boolean(expProg?.completedAt)}
              exploreStage={
                expProg && !expProg.completedAt ? expProg.currentStage + 1 : null
              }
            />
          );
        })}
      </div>
    </DashboardShell>
  );
}
