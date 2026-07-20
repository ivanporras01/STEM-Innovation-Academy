import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProgramEnrollSection } from "@/components/enrollment/program-enroll-section";
import {
  getAllEnrollableProgramSlugs,
  getProgramEnrollmentContext,
} from "@/lib/program-enrollment";
import { ensureCourseProduct } from "@/lib/course-products";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ registered?: string }> };

export async function generateStaticParams() {
  return getAllEnrollableProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ctx = await getProgramEnrollmentContext(slug);
  if (!ctx) return { title: "Program not found" };
  return {
    title: `Enroll — ${ctx.program.title}`,
    description: `Register and pay for ${ctx.program.title}. ${ctx.program.tuitionLabel}.`,
  };
}

export default async function EnrollProgramPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { registered } = await searchParams;
  const ctx = await getProgramEnrollmentContext(slug);
  if (!ctx) notFound();

  const { program, course, lmsHref } = ctx;
  const product = await ensureCourseProduct(course.id, course.slug, program.tuitionUsd * 100);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-page-main flex-1 py-12">
        <div className="nova-container max-w-3xl">
          <Link
            href="/enroll"
            className="mb-6 inline-block text-sm text-nova-cyan hover:underline"
          >
            ← All enrollment options
          </Link>

          <ProgramEnrollSection
            program={program}
            courseId={course.id}
            courseSlug={course.slug}
            priceCents={product.priceCents}
            lmsHref={lmsHref}
            justRegistered={registered === "1"}
          />

          <p className="mt-6 text-center text-sm text-nova-cyan-light/70">
            <Link href={program.catalogHref} className="text-nova-cyan hover:underline">
              View full syllabus
            </Link>
            {" · "}
            <Link href="/catalog" className="text-nova-cyan hover:underline">
              Compare all programs
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
