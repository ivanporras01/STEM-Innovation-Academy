import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/courses/course-card";
import { getPublishedCourses, getUserEnrollments } from "@/lib/courses";
import { getPathwayMeta } from "@/lib/pathways/meta";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Mission Paths",
  description:
    "Browse NOVA mission paths — Coding & AI, Robotics & Engineering, and IoT. Enroll and progress through structured phases with mentor support.",
};

export default async function CoursesPage() {
  const session = await auth();
  const courses = await getPublishedCourses();

  const enrolledSlugs = new Set<string>();
  const experienceProgress = session?.user
    ? await db.experienceProgress.findMany({ where: { userId: session.user.id } })
    : [];

  if (session?.user) {
    const enrollments = await getUserEnrollments(session.user.id);
    enrollments.forEach((e) => enrolledSlugs.add(e.course.slug));
  }

  const exploreProgress = (slug: string) =>
    experienceProgress.find((p) => p.experienceSlug === slug);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-deep-blue/40 via-transparent to-transparent" />
        <div className="nova-container relative text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ Chart Your Course Through the Cosmos
          </p>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">Mission Paths</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Three galaxies of innovation await. Pick a path, tap{" "}
            <strong className="text-nova-cyan-light">Explore Now</strong> to begin your first
            quest, then journey through phases with your Innovation Mentor.
          </p>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container">
          <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const meta = getPathwayMeta(course.slug);
              const expProg = meta ? exploreProgress(meta.experienceSlug) : undefined;
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
                  exploreComplete={Boolean(expProg?.completedAt)}
                  exploreStage={
                    expProg && !expProg.completedAt ? expProg.currentStage + 1 : null
                  }
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
