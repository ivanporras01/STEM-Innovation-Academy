import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/ui/stat-card";
import { CourseCard } from "@/components/courses/course-card";
import { getUserEnrollments } from "@/lib/courses";
import { db } from "@/lib/db";
import { EXPERIENCES } from "@/lib/experiences/catalog";
import { PathwayIcon } from "@/components/ui/pathway-icon";

export const metadata: Metadata = {
  title: "Explorer Dashboard",
};

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const enrollments = await getUserEnrollments(session.user.id);
  const experienceProgress = await db.experienceProgress.findMany({
    where: { userId: session.user.id },
  });
  const avgProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length
        )
      : 0;

  return (
    <DashboardShell user={session.user}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-nova-deep-blue">
          Welcome back, {session.user.firstName}! ✦
        </h1>
        <p className="mt-1 text-nova-gray">
          Continue your NOVA learning journey
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

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-nova-deep-blue">Interactive Missions</h2>
          <Link href="/experiences" className="text-sm font-medium text-nova-cyan hover:underline">
            All Missions →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {EXPERIENCES.map((exp) => {
            const prog = experienceProgress.find((p) => p.experienceSlug === exp.slug);
            const done = !!prog?.completedAt;
            return (
              <Link
                key={exp.slug}
                href={`/experiences/${exp.slug}`}
                className="nova-card transition hover:shadow-nova"
              >
                <PathwayIcon pathway={exp.pathway} variant="card" className="mb-2 h-12 w-12 text-xl" />
                <h3 className="font-semibold text-nova-deep-blue">{exp.title}</h3>
                <p className="mt-1 text-xs text-nova-gray">
                  {done ? (
                    <span className="font-bold text-nova-green">✓ {exp.achievementTitle}</span>
                  ) : prog ? (
                    `In progress — quest stage ${prog.currentStage + 1}/8`
                  ) : (
                    "Mission awaiting"
                  )}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-nova-deep-blue">My Mission Paths</h2>
        <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">
          Browse Mission Paths →
        </Link>
      </div>

      {enrollments.length === 0 ? (
        <div className="nova-card text-center py-12">
          <p className="mb-4 text-nova-gray">You haven&apos;t joined any mission paths yet.</p>
          <Link href="/courses" className="nova-btn-primary">
            Explore Mission Paths
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {enrollments.map((enrollment) => (
            <CourseCard
              key={enrollment.id}
              slug={enrollment.course.slug}
              title={enrollment.course.title}
              description={enrollment.course.description}
              pathway={enrollment.course.pathway}
              level={enrollment.course.level}
              progress={enrollment.progress}
              enrolled
              mentorName={
                enrollment.course.mentor
                  ? `${enrollment.course.mentor.firstName} ${enrollment.course.mentor.lastName}`
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
