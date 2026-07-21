import type { Pathway } from "@prisma/client";
import { getProgramBySlug, NOVA_PROGRAM_CATALOG } from "@/data/courses";
import type { NovaProgram, ProgramVertical } from "@/data/courses/types";
import { getCurriculumForLmsSlug } from "@/data/program-lms";
import { db } from "@/lib/db";
import { ensureCourseProduct } from "@/lib/course-products";
import { localizeProgram } from "@/lib/program-locale-copy";
import { seedCourseModules, seedCourseModulesIfEmpty } from "@/lib/seed-program-curriculum";

/** School catalog slug → live LMS mission path slug (when content exists). */
export const SCHOOL_LMS_SLUG: Record<string, string> = {
  "coding-ai": "intro-python-ai",
  "robotics-engineering": "robotics-engineering",
  "iot-smart-systems": "iot-smart-systems",
};

export function courseSlugForProgram(program: NovaProgram): string {
  if (program.vertical === "school") {
    return SCHOOL_LMS_SLUG[program.slug] ?? `nova-school-${program.slug}`;
  }
  return `nova-${program.vertical}-${program.slug}`;
}

function pathwayForProgram(program: NovaProgram): Pathway {
  if (program.vertical === "school") {
    if (program.slug === "robotics-engineering") return "ROBOTICS";
    if (program.slug === "iot-smart-systems") return "IOT";
    return "CODING_AI";
  }
  if (program.slug.includes("robotics")) return "ROBOTICS";
  if (program.slug.includes("iot")) return "IOT";
  return "CODING_AI";
}

/** LMS href after ACTIVE enrollment — always a real learning surface. */
export function lmsHrefForProgram(program: NovaProgram): string {
  if (program.vertical === "school" && SCHOOL_LMS_SLUG[program.slug]) {
    return `/courses/${SCHOOL_LMS_SLUG[program.slug]}`;
  }
  if (program.vertical === "college") {
    return `/es/college/${program.slug}`;
  }
  return `/courses/${courseSlugForProgram(program)}`;
}

/** Ensure a purchasable Course + Module/Lesson curriculum exists for any catalog program. */
export async function ensureProgramCourse(program: NovaProgram) {
  const slug = courseSlugForProgram(program);
  const priceCents = program.tuitionUsd * 100;
  const enCopy = localizeProgram(program, "en");

  const course = await db.course.upsert({
    where: { slug },
    update: {
      title: enCopy.title,
      description: enCopy.description,
      published: true,
    },
    create: {
      slug,
      title: enCopy.title,
      description: enCopy.description,
      pathway: pathwayForProgram(program),
      level: program.vertical === "college" ? "Career Track" : "Explorer",
      published: true,
    },
  });

  await ensureCourseProduct(course.id, slug, priceCents);

  const curriculum = getCurriculumForLmsSlug(slug);
  if (curriculum) {
    const isPathwayReady = Boolean(SCHOOL_LMS_SLUG[program.slug]);
    if (isPathwayReady) {
      await seedCourseModulesIfEmpty(course.id, curriculum);
    } else {
      await seedCourseModules(course.id, curriculum);
    }
  }

  return course;
}

export async function getProgramEnrollmentContext(programSlug: string) {
  const program = getProgramBySlug(programSlug);
  if (!program) return null;

  const course = await ensureProgramCourse(program);
  const lmsHref = lmsHrefForProgram(program);

  return { program, course, lmsHref };
}

export function getAllEnrollableProgramSlugs(): string[] {
  return NOVA_PROGRAM_CATALOG.map((p) => p.slug);
}

export function enrollPathForProgram(slug: string, locale?: ProgramVertical | "en" | "es") {
  void locale;
  return `/enroll/${slug}`;
}
