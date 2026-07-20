export type {
  LessonContent,
  LessonSection,
  LessonVisual,
  LessonVisualType,
  GlossaryTerm,
  Reference,
  NovaCollegeCourse,
  NovaCollegeModule,
  NovaCollegeLesson,
  NovaCollegeTrackSummary,
  NovaCollegeContentDelivery,
  CertificationAlignment,
  FormatBreakdown,
  AssessmentRubricSummary,
  LessonType,
} from "./types";

export {
  withLessonContent,
  attachContentToModules,
  theoryLesson,
} from "./utils";

export {
  IT_SUPPORT_CLOUD_LESSONS,
  CYBERSECURITY_ANALYST_LESSONS,
  DATA_ANALYTICS_LESSONS,
  IOT_SMART_SYSTEMS_LESSONS,
  ROBOTICS_AUTOMATION_LESSONS,
  INTRO_TELECOM_LESSONS,
  ELECTRONICS_LESSONS,
  QUANTUM_WORKFORCE_LESSONS,
} from "./lessons";

export { itSupportCloudCourse } from "./it-support-cloud";
export { cybersecurityAnalystCourse } from "./cybersecurity-analyst";
export { dataAnalyticsCourse } from "./data-analytics";
export { iotSmartSystemsTechnicianCourse } from "./iot-smart-systems-technician";
export { roboticsAutomationTechnicianCourse } from "./robotics-automation-technician";
export { introTelecommunicationsCourse } from "./intro-telecommunications";
export { electronicsTechnicianCourse } from "./electronics-technician";
export {
  quantumWorkforceCourse,
  QUANTUM_WORKFORCE_APP_URL,
  QUANTUM_WORKFORCE_COURSE_SLUG,
} from "./quantum-workforce";

export { digitalMarketingBusinessCourse } from "./digital-marketing-business";
export { startupInnovationDigitalLaunchCourse } from "./startup-innovation-digital-launch";

import { itSupportCloudCourse } from "./it-support-cloud";
import { cybersecurityAnalystCourse } from "./cybersecurity-analyst";
import { dataAnalyticsCourse } from "./data-analytics";
import { iotSmartSystemsTechnicianCourse } from "./iot-smart-systems-technician";
import { roboticsAutomationTechnicianCourse } from "./robotics-automation-technician";
import { introTelecommunicationsCourse } from "./intro-telecommunications";
import { electronicsTechnicianCourse } from "./electronics-technician";
import { digitalMarketingBusinessCourse } from "./digital-marketing-business";
import { startupInnovationDigitalLaunchCourse } from "./startup-innovation-digital-launch";
import { quantumWorkforceCourse } from "./quantum-workforce";
import type { NovaCollegeCourse, NovaCollegeTrackSummary } from "./types";

/** Tier 1 entry + Tier 2 advanced (Quantum Workforce / QCW). */
export const novaCollegeCourses: NovaCollegeCourse[] = [
  itSupportCloudCourse,
  cybersecurityAnalystCourse,
  dataAnalyticsCourse,
  iotSmartSystemsTechnicianCourse,
  roboticsAutomationTechnicianCourse,
  introTelecommunicationsCourse,
  electronicsTechnicianCourse,
  digitalMarketingBusinessCourse,
  startupInnovationDigitalLaunchCourse,
  quantumWorkforceCourse,
];

export const novaCollegeEntryTracks = novaCollegeCourses.filter(
  (c) => c.tier !== "advanced",
);

export const novaCollegeAdvancedTracks = novaCollegeCourses.filter(
  (c) => c.tier === "advanced",
);

export function getNovaCollegeCourseBySlug(
  slug: string,
): NovaCollegeCourse | undefined {
  return novaCollegeCourses.find((c) => c.slug === slug);
}

/** Catalog metadata for NOVA STEM HUB / verify.novastemhub.education listings. */
export const novaCollegeTrackIndex: NovaCollegeTrackSummary[] =
  novaCollegeCourses.map((course) => ({
    slug: course.slug,
    title: course.title,
    tagline: course.tagline,
    durationHours: course.durationHours,
    moduleCount: course.modules.length,
    primaryCerts: course.certificationAlignment.primary,
    audience: course.targetAudience.split(";")[0].trim(),
    tier: course.tier ?? "entry",
  }));

/** Shared format constants across all NOVA College tracks. */
export const NOVA_COLLEGE_FORMAT = {
  totalContactHours: 120,
  theoryPercent: 40,
  labsProjectsPercent: 40,
  softSkillsPercent: 10,
  examPrepPercent: 10,
  verifyBaseUrl: "https://verify.novastemhub.education",
  ageRange: "16–25+",
  deliveryModel: "B2B — curriculum + platform + facilitator guide",
} as const;
