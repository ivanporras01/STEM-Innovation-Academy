import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell, StatCard } from "@/components/layout/dashboard-shell";
import { ReviewSubmissionForm } from "@/components/courses/review-submission-form";
import { getMentorDashboard } from "@/lib/courses";
import { BookOpen, ClipboardList, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentor Dashboard",
};

export default async function MentorDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "MENTOR" && session.user.role !== "ADMIN") {
    redirect("/dashboard/student");
  }

  const { courses, pendingReviews } = await getMentorDashboard(session.user.id);

  const totalStudents = courses.reduce((acc, c) => acc + c._count.enrollments, 0);

  return (
    <DashboardShell user={session.user}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-nova-deep-blue">
          Mentor Dashboard
        </h1>
        <p className="mt-1 text-nova-gray">
          Manage your courses and review student submissions
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="My Courses" value={courses.length} icon={BookOpen} />
        <StatCard label="Total Students" value={totalStudents} icon={Users} accent="green" />
        <StatCard label="Pending Reviews" value={pendingReviews} icon={ClipboardList} accent="orange" />
      </div>

      <h2 className="mb-4 text-lg font-semibold text-nova-deep-blue">Pending Submissions</h2>

      {pendingReviews === 0 ? (
        <div className="nova-card py-8 text-center text-nova-gray">
          No submissions awaiting review. Great job staying on top of things!
        </div>
      ) : (
        <div className="space-y-4">
          {courses.flatMap((course) =>
            course.assignments.flatMap((assignment) =>
              assignment.submissions.map((submission) => (
                <div key={submission.id} className="nova-card">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-nova-cyan">
                        {course.title}
                      </p>
                      <h3 className="font-semibold text-nova-deep-blue">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-nova-gray">
                        by {submission.user.firstName} {submission.user.lastName} ·{" "}
                        {formatDate(submission.submittedAt)}
                      </p>
                    </div>
                  </div>
                  <pre className="mt-3 max-h-40 overflow-auto rounded-xl bg-nova-off-white p-3 text-xs text-nova-dark-gray">
                    {submission.content}
                  </pre>
                  <ReviewSubmissionForm
                    submissionId={submission.id}
                    maxScore={assignment.maxScore}
                  />
                </div>
              ))
            )
          )}
        </div>
      )}

      <h2 className="mb-4 mt-8 text-lg font-semibold text-nova-deep-blue">My Courses</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="nova-card transition hover:shadow-nova"
          >
            <h3 className="font-semibold text-nova-deep-blue">{course.title}</h3>
            <p className="mt-1 text-sm text-nova-gray">
              {course._count.enrollments} students enrolled
            </p>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
