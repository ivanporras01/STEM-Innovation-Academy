import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/ui/stat-card";
import { CourseCard } from "@/components/courses/course-card";
import { getUserEnrollments } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const enrollments = await getUserEnrollments(session.user.id);
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
        <StatCard label="Enrolled Courses" value={enrollments.length} icon="book" />
        <StatCard label="Avg. Progress" value={`${avgProgress}%`} icon="graduation" accent="green" />
        <StatCard
          label="Lessons Completed"
          value={enrollments.reduce((acc, e) => acc + e.completedLessons, 0)}
          icon="trophy"
          accent="orange"
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-nova-deep-blue">My Courses</h2>
        <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">
          Browse all courses →
        </Link>
      </div>

      {enrollments.length === 0 ? (
        <div className="nova-card text-center py-12">
          <p className="mb-4 text-nova-gray">You haven&apos;t enrolled in any courses yet.</p>
          <Link href="/courses" className="nova-btn-primary">
            Explore Courses
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
