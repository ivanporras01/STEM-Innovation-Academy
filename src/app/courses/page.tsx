import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/courses/course-card";
import { getPublishedCourses } from "@/lib/courses";
import { getPathwayMeta } from "@/lib/pathways/meta";
import { auth } from "@/lib/auth";
import { getUserEnrollments } from "@/lib/courses";
import { NovaStarfield } from "@/components/ui/nova-universe";

export const metadata: Metadata = {
  title: "Mission Paths",
  description:
    "Browse NOVA mission paths — Coding & AI, Robotics & Engineering, and IoT. Enroll and progress through structured phases with mentor support.",
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
    <div className="nova-universe-light relative flex min-h-screen flex-col">
      <NovaStarfield />
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-deep-blue via-[#0a1628] to-[#103663]" />
        <div className="nova-nebula-glow absolute left-1/4 top-0 h-64 w-64 bg-nova-cyan/20" />
        <div className="nova-container relative text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ Chart Your Course
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">Mission Paths</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
            Three galaxies of innovation await. Pick a path, tap{" "}
            <strong className="text-nova-cyan-light">Explore Now</strong> to begin your first
            quest, then journey through phases with your Innovation Mentor.
          </p>
        </div>
      </section>

      <main className="relative flex-1 py-12">
        <div className="nova-container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const meta = getPathwayMeta(course.slug);
              return (
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
                  experienceSlug={meta?.experienceSlug}
                  experienceTitle={meta?.experienceTitle}
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
