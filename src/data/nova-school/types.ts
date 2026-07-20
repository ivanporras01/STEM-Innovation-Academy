/** NOVA School — youth elective programs (ages 8–16, B2B licensable). */

export type NovaSchoolModule = {
  order: number;
  title: string;
  description: string;
};

export type NovaSchoolElectiveSummary = {
  slug: string;
  title: string;
  tagline: string;
  ageRange: string;
  highlights: string[];
  /** Links to existing Mission Path course when applicable */
  missionPathHref?: string;
  pathwaySlug?: "coding-ai" | "robotics" | "iot";
};

export type NovaSchoolElective = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  ageRange: string;
  grades: string;
  durationWeeks: number;
  highlights: string[];
  learningOutcomes: string[];
  modules: NovaSchoolModule[];
  missionPathHref?: string;
  pathwaySlug?: "coding-ai" | "robotics" | "iot";
  experienceSlug?: string;
  experienceTitle?: string;
};
