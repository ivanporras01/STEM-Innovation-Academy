/**
 * Locale-aware public copy for programs & LMS courses.
 *
 * Policy (see src/lib/locale.ts):
 * - EN (default `/`): English marketing catalogs
 * - ES (`/es/*`): Spanish curriculum / ES catalogs
 * - PT (`/pt/*`): Portuguese UI where available; college track copy falls back to EN
 */

import type { NovaProgram } from "@/data/courses/types";
import { getNovaCollegeCourseBySlug } from "@/data/nova-college";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import { getSchoolElectiveEn } from "@/data/nova-school/catalog-en";
import { getSchoolElectiveEs } from "@/data/nova-school/catalog-es";
import { getNovaSchoolElectiveBySlug } from "@/data/nova-school";
import {
  getLanguageCourseEn,
  getLanguageCourseEs,
  getLanguageCoursePt,
  getNovaLanguageCourseBySlug,
} from "@/data/nova-language";
import type { AppLocale } from "@/lib/locale";

export type LocalizedProgramCopy = {
  title: string;
  tagline: string;
  description: string;
  highlights?: string[];
  prerequisites?: string[];
};

const COLLEGE_LMS_PREFIX = "nova-college-";
const SCHOOL_LMS_PREFIX = "nova-school-";

/** School elective slug → LMS mission-path slug (keep in sync with program-enrollment). */
const SCHOOL_LMS_SLUG: Record<string, string> = {
  "coding-ai": "intro-python-ai",
  "robotics-engineering": "robotics-engineering",
  "iot-smart-systems": "iot-smart-systems",
};

/** Reverse map: LMS mission-path slug → school elective slug */
const LMS_TO_SCHOOL_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SCHOOL_LMS_SLUG).map(([schoolSlug, lmsSlug]) => [lmsSlug, schoolSlug]),
);

export function parseLmsCourseSlug(lmsSlug: string): {
  vertical: "college" | "school" | "language" | null;
  programSlug: string | null;
} {
  if (lmsSlug.startsWith(COLLEGE_LMS_PREFIX)) {
    return { vertical: "college", programSlug: lmsSlug.slice(COLLEGE_LMS_PREFIX.length) };
  }
  if (lmsSlug.startsWith(SCHOOL_LMS_PREFIX)) {
    return { vertical: "school", programSlug: lmsSlug.slice(SCHOOL_LMS_PREFIX.length) };
  }
  if (LMS_TO_SCHOOL_SLUG[lmsSlug]) {
    return { vertical: "school", programSlug: LMS_TO_SCHOOL_SLUG[lmsSlug] };
  }
  return { vertical: null, programSlug: null };
}

export function getCollegeTrackCopy(
  slug: string,
  locale: AppLocale = "en",
): LocalizedProgramCopy {
  const course = getNovaCollegeCourseBySlug(slug);
  const en = getCollegeTrackEn(slug);

  if (locale === "es") {
    return {
      title: course?.title ?? en?.title ?? slug,
      tagline: course?.tagline ?? en?.tagline ?? "",
      description: course?.description ?? en?.description ?? "",
      highlights: course?.learningOutcomes,
      prerequisites: course?.prerequisites,
    };
  }

  // EN + PT (Portuguese falls back to English marketing copy)
  return {
    title: en?.title ?? course?.title ?? slug,
    tagline: en?.tagline ?? course?.tagline ?? "",
    description: en?.description ?? course?.description ?? "",
    highlights: en?.highlights,
    prerequisites: en?.prerequisites,
  };
}

export function getSchoolElectiveCopy(
  slug: string,
  locale: AppLocale = "en",
): LocalizedProgramCopy {
  const elective = getNovaSchoolElectiveBySlug(slug);
  const en = getSchoolElectiveEn(slug);
  const es = getSchoolElectiveEs(slug);

  if (locale === "es") {
    return {
      title: es?.title ?? elective?.title ?? slug,
      tagline: es?.tagline ?? elective?.tagline ?? "",
      description: es?.description ?? elective?.description ?? "",
      highlights: elective?.highlights,
    };
  }

  return {
    title: en?.title ?? elective?.title ?? slug,
    tagline: en?.tagline ?? elective?.tagline ?? "",
    description: en?.description ?? elective?.description ?? "",
    highlights: elective?.highlights,
  };
}

export function getLanguageCourseCopy(
  slug: string,
  locale: AppLocale = "en",
): LocalizedProgramCopy {
  const course = getNovaLanguageCourseBySlug(slug);
  const en = getLanguageCourseEn(slug);
  const es = getLanguageCourseEs(slug);
  const pt = getLanguageCoursePt(slug);

  if (locale === "es") {
    return {
      title: es?.title ?? course?.title ?? slug,
      tagline: es?.tagline ?? course?.tagline ?? "",
      description: es?.description ?? course?.description ?? "",
      highlights: course?.highlights,
    };
  }
  if (locale === "pt") {
    return {
      title: pt?.title ?? en?.title ?? course?.title ?? slug,
      tagline: pt?.tagline ?? en?.tagline ?? course?.tagline ?? "",
      description: pt?.description ?? en?.description ?? course?.description ?? "",
      highlights: course?.highlights,
    };
  }
  return {
    title: en?.title ?? course?.title ?? slug,
    tagline: en?.tagline ?? course?.tagline ?? "",
    description: en?.description ?? course?.description ?? "",
    highlights: course?.highlights,
  };
}

/** Localize a unified catalog program for public EN/ES/PT surfaces. */
export function localizeProgram(
  program: NovaProgram,
  locale: AppLocale = "en",
): LocalizedProgramCopy {
  if (program.vertical === "college") return getCollegeTrackCopy(program.slug, locale);
  if (program.vertical === "school") return getSchoolElectiveCopy(program.slug, locale);
  return getLanguageCourseCopy(program.slug, locale);
}

export type LmsPublicPresentation = LocalizedProgramCopy & {
  pathwayLabel: string;
  pathwayHref: string;
  levelLabel: string;
  levelHref: string | null;
  isCollegeTrack: boolean;
};

/**
 * Public marketing presentation for `/courses/[slug]` (EN Mission Paths).
 * Overlays EN catalog copy when the LMS course was seeded from Spanish college data.
 */
export function getLmsCoursePublicPresentation(
  lmsSlug: string,
  fallback: { title: string; description: string; level: string; pathwayLabel: string },
  locale: AppLocale = "en",
): LmsPublicPresentation {
  const parsed = parseLmsCourseSlug(lmsSlug);

  if (parsed.vertical === "college" && parsed.programSlug) {
    const copy = getCollegeTrackCopy(parsed.programSlug, locale);
    const collegeBase = locale === "es" ? "/es/college" : locale === "pt" ? "/pt/college" : "/college";
    const trackHref =
      locale === "es"
        ? `/es/college/${parsed.programSlug}`
        : `/college/${parsed.programSlug}`;

    return {
      ...copy,
      pathwayLabel: "NOVA College",
      pathwayHref: collegeBase,
      levelLabel:
        locale === "es" ? "Carrera técnica" : locale === "pt" ? "Trilha profissional" : "Career Track",
      levelHref: trackHref,
      isCollegeTrack: true,
    };
  }

  if (parsed.vertical === "school" && parsed.programSlug) {
    const copy = getSchoolElectiveCopy(parsed.programSlug, locale);
    const schoolBase = locale === "es" ? "/es/school" : locale === "pt" ? "/pt/school" : "/school";
    return {
      ...copy,
      pathwayLabel: "NOVA School",
      pathwayHref: schoolBase,
      levelLabel: fallback.level || "Explorer",
      levelHref: `${schoolBase}/${parsed.programSlug}`,
      isCollegeTrack: false,
    };
  }

  return {
    title: fallback.title,
    tagline: "",
    description: fallback.description,
    pathwayLabel: fallback.pathwayLabel,
    pathwayHref: "/courses",
    levelLabel: fallback.level,
    levelHref: null,
    isCollegeTrack: false,
  };
}
