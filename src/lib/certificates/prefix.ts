import { novaCollegeCourses } from "@/data/nova-college";
import { getProgramBySlug } from "@/data/courses";
import { ensureProgramCourse } from "@/lib/program-enrollment";

const COLLEGE_SLUG_PREFIX = /^nova-college-(.+)$/;

/** Resolve certificate prefix for a LMS course slug (e.g. nova-college-it-support-cloud-technician → NOVA-COL-IT). */
export function resolveCertificatePrefix(courseSlug: string): string {
  const collegeMatch = courseSlug.match(COLLEGE_SLUG_PREFIX);
  if (collegeMatch) {
    const catalogSlug = collegeMatch[1];
    const college = novaCollegeCourses.find((c) => c.slug === catalogSlug);
    if (college) return college.verifyCertificatePrefix;
  }
  return "NOVA-CERT";
}

/** Catalog program slug for a college LMS course, if applicable. */
export function collegeCatalogSlugFromCourseSlug(courseSlug: string): string | null {
  const match = courseSlug.match(COLLEGE_SLUG_PREFIX);
  return match?.[1] ?? null;
}

/** Ensure prefix exists for any catalog program slug (used at enrollment/checkout). */
export async function certificatePrefixForProgramSlug(programSlug: string): Promise<string> {
  const program = getProgramBySlug(programSlug);
  if (!program) return "NOVA-CERT";
  if (program.vertical === "college" && program.certCode) {
    return program.certCode;
  }
  const course = await ensureProgramCourse(program);
  return resolveCertificatePrefix(course.slug);
}
