import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/courses/course-card";
import { getPublishedCourses } from "@/lib/courses";
import { auth } from "@/lib/auth";
import { getUserEnrollments } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Learning Pathways",
  description:
    "Browse NOVA founding programs — Coding & AI, Robotics & Engineering, and IoT. Enroll in structured missions with mentor support.",
};

export default async function CoursesPage() {
  const session = await auth();
  const courses = await getPublishedCourses();

  const enrolledSlugs = new Set<string>();
  if (session?.user) {
    const enrollments = await getUserEnrollments(session.user.id);
    enrollments.forEach((e) => enrolledSlugs.add(e.course.slug));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="nova-container">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-nova-cyan">
              Learning Pathways Catalog
            </p>
            <h1 className="text-3xl font-bold text-nova-deep-blue sm:text-4xl">
              Enroll in a Founding Program
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-nova-gray">
              Browse published missions, enroll as an Explorer, and track progress through
              structured phases — each pathway includes monthly Innovation Mentor sessions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                slug={course.slug}
                title={course.title}
                description={course.description}
                pathway={course.pathway}
                level={course.level}
                enrolled={enrolledSlugs.has(course.slug)}
                mentorName={
                  course.mentor
                    ? `${course.mentor.firstName} ${course.mentor.lastName}`
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
