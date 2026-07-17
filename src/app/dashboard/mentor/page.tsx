import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/ui/stat-card";
import { ReviewSubmissionForm } from "@/components/courses/review-submission-form";
import { getMentorDashboard } from "@/lib/courses";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentor Portal — NOVA",
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
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-nova-green">
          Mentor Portal
        </p>
        <h1 className="text-2xl font-bold text-white">
          Welcome, {session.user.firstName}
        </h1>
        <p className="mt-1 text-nova-cyan-light/80">
          Guide your Explorers — review submissions, track enrollments, and manage Mission Paths.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Assigned Paths" value={courses.length} icon="book" />
        <StatCard label="Explorers Enrolled" value={totalStudents} icon="users" accent="green" />
        <StatCard label="Pending Feedback" value={pendingReviews} icon="clipboard" accent="orange" />
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Explorers Needing Feedback
        </h2>

        {pendingReviews === 0 ? (
          <div className="nova-card py-8 text-center text-nova-cyan-light/80">
            All caught up — no submissions awaiting your review.
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
                        <h3 className="font-semibold text-white">
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-nova-cyan-light/80">
                          Explorer: {submission.user.firstName} {submission.user.lastName} ·{" "}
                          {formatDate(submission.submittedAt)}
                        </p>
                      </div>
                    </div>
                    <pre className="mt-3 max-h-40 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-nova-cyan-light/90">
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
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Your Mission Paths</h2>
        {courses.length === 0 ? (
          <div className="nova-card py-8 text-center text-nova-cyan-light/80">
            No paths assigned yet. Contact an administrator to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="nova-card transition hover:shadow-nova"
              >
                <h3 className="font-semibold text-white">{course.title}</h3>
                <p className="mt-1 text-sm text-nova-cyan-light/80">
                  {course._count.enrollments} Explorer
                  {course._count.enrollments === 1 ? "" : "s"} enrolled
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
