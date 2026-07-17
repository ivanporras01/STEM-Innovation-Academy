import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/ui/stat-card";
import { CourseCard } from "@/components/courses/course-card";
import { getUserEnrollments, getPublishedCourses } from "@/lib/courses";
import { getPathwayMeta } from "@/lib/pathways/meta";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Explorer Dashboard",
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
  const avgProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length
        )
      : 0;

  const exploreProgress = (slug: string) =>
    experienceProgress.find((p) => p.experienceSlug === slug);

  return (
    <DashboardShell user={session.user}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-nova-deep-blue">
          Welcome back, {session.user.firstName}! ✦
        </h1>
        <p className="mt-1 text-nova-gray">
          Continue your NOVA learning journey — pick a path or jump in with Explore Now.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Mission Paths" value={enrollments.length} icon="book" />
        <StatCard label="Avg. Progress" value={`${avgProgress}%`} icon="graduation" accent="green" />
        <StatCard
          label="Lessons Completed"
          value={enrollments.reduce((acc, e) => acc + e.completedLessons, 0)}
          icon="trophy"
          accent="orange"
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-nova-deep-blue">Mission Paths</h2>
        <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">
          Browse all paths →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {publishedCourses.map((course) => {
          const meta = getPathwayMeta(course.slug);
          const enrollment = enrollments.find((e) => e.course.slug === course.slug);
          const expProg = meta ? exploreProgress(meta.experienceSlug) : undefined;

          return (
            <div key={course.id} className="relative">
              {expProg?.completedAt && (
                <span className="absolute -top-2 right-3 z-10 rounded-full bg-nova-green px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Explore complete
                </span>
              )}
              <CourseCard
                slug={course.slug}
                title={course.title}
                description={course.description}
                pathway={course.pathway}
                level={course.level}
                progress={enrollment?.progress}
                enrolled={enrolledSlugs.has(course.slug)}
                mentorName={
                  course.mentor
                    ? `${course.mentor.firstName} ${course.mentor.lastName}`
                    : undefined
                }
                experienceSlug={meta?.experienceSlug}
                experienceTitle={meta?.experienceTitle}
              />
              {expProg && !expProg.completedAt && (
                <p className="mt-1 text-center text-xs text-nova-cyan">
                  Explore Now in progress — stage {expProg.currentStage + 1}/8
                </p>
              )}
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
