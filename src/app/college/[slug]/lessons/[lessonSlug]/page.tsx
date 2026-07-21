import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { findCollegeLesson } from "@/lib/nova-college-catalog";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import { NOVA_COLLEGE } from "@/lib/novahub-brand";
import { requirePaidProgramAccess } from "@/lib/require-paid-program-access";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { courseSlugForProgram } from "@/lib/program-enrollment";
import { getProgramBySlug } from "@/data/courses";

type Props = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const en = getCollegeTrackEn(slug);
  return {
    title: en ? `${en.title} — Lesson | ${NOVA_COLLEGE.name}` : "Lesson",
  };
}

export default async function CollegeLessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const ctx = findCollegeLesson(slug, lessonSlug);
  if (!ctx) notFound();

  const en = getCollegeTrackEn(slug);
  const program = getProgramBySlug(slug);
  const lmsSlug = program ? courseSlugForProgram(program) : `nova-college-${slug}`;
  const session = await auth();

  if (session?.user) {
    const enrollment = await db.enrollment.findFirst({
      where: { userId: session.user.id, course: { slug: lmsSlug } },
    });
    if (enrollment && hasCourseAccess(enrollment)) {
      redirect(`/courses/${lmsSlug}`);
    }
  }

  // Unenrolled visitors: send to enroll (do not leak full curriculum on EN lesson URLs)
  await requirePaidProgramAccess({
    programSlug: slug,
    loginCallback: `/college/${slug}/lessons/${lessonSlug}`,
    enrollPath: `/enroll/${slug}`,
  });

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-space-section relative flex-1 py-16">
        <div className="nova-container max-w-2xl text-center">
          <p className="text-sm text-nova-cyan-light/80">
            Redirecting to your unlocked mission path…
          </p>
          <Link href={`/courses/${lmsSlug}`} className="nova-btn-primary mt-6 inline-flex">
            Open {en?.title ?? ctx.course.title} LMS →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
