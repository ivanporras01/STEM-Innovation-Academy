import type { SeedCourse } from "@/data/pathways/types";
import { pathwayCourses } from "@/data/pathways";
import { novaCollegeCourses } from "@/data/nova-college";
import { collegeCourseToSeedCourse } from "./college-to-seed";
import {
  gamingGameDesignLms,
  digitalMarketingSchoolLms,
} from "./school-electives-a";
import {
  startupBusinessSchoolLms,
  digitalContentSchoolLms,
  cybersecuritySchoolLms,
  creativeTechSchoolLms,
} from "./school-electives-b";
import { languageSeedCourses } from "./language-courses";
import type { CurriculumSeed } from "@/lib/seed-program-curriculum";

/** Non-pathway school electives with full LMS curricula. */
export const schoolOnlySeedCourses: SeedCourse[] = [
  gamingGameDesignLms,
  digitalMarketingSchoolLms,
  startupBusinessSchoolLms,
  digitalContentSchoolLms,
  cybersecuritySchoolLms,
  creativeTechSchoolLms,
];

export const collegeSeedCourses: SeedCourse[] =
  novaCollegeCourses.map(collegeCourseToSeedCourse);

/** All SeedCourses beyond the classic pathway trio. */
export const programLmsSeedCourses: SeedCourse[] = [
  ...schoolOnlySeedCourses,
  ...collegeSeedCourses,
  ...languageSeedCourses,
];

const curriculumBySlug = new Map<string, CurriculumSeed>();

for (const course of pathwayCourses) {
  curriculumBySlug.set(course.slug, {
    modules: course.modules,
    capstone: course.capstone,
  });
}

for (const course of programLmsSeedCourses) {
  curriculumBySlug.set(course.slug, {
    modules: course.modules,
    capstone: course.capstone,
  });
}

/** Resolve curriculum for an LMS course slug (pathway or program mirror). */
export function getCurriculumForLmsSlug(lmsSlug: string): CurriculumSeed | null {
  return curriculumBySlug.get(lmsSlug) ?? null;
}

export function getAllProgramLmsSeedCourses(): SeedCourse[] {
  return programLmsSeedCourses;
}

export { collegeCourseToSeedCourse, languageSeedCourses };
