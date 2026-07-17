import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { db } from "@/lib/db";
import { pathwayLabels } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Manage Courses",
};

export default async function AdminCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "SCHOOL_ADMIN") {
    redirect("/dashboard/student");
  }

  const courses = await db.course.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      mentor: { select: { firstName: true, lastName: true } },
      _count: { select: { enrollments: true, modules: true } },
    },
  });

  return (
    <DashboardShell user={session.user}>
      <h1 className="mb-6 text-2xl font-bold text-nova-deep-blue">Courses</h1>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="nova-card flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge variant="cyan">{pathwayLabels[course.pathway]}</Badge>
                <Badge variant={course.published ? "green" : "default"}>
                  {course.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <h3 className="font-semibold text-nova-deep-blue">{course.title}</h3>
              <p className="mt-1 text-sm text-nova-gray">
                {course._count.modules} modules · {course._count.enrollments} Explorers
                {course.mentor && (
                  <> · Mentor: {course.mentor.firstName} {course.mentor.lastName}</>
                )}
              </p>
            </div>
            <Link href={`/courses/${course.slug}`} className="nova-btn-secondary">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
