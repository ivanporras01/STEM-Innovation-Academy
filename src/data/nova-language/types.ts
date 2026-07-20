/** NOVA Language — English, Spanish, and Portuguese programs. */

export type NovaLanguageModule = {
  order: number;
  title: string;
  description: string;
};

export type NovaLanguageCourseSummary = {
  slug: string;
  title: string;
  tagline: string;
  targetLanguage: string;
  cefrLevel: string;
  durationHours: number;
  highlights: string[];
};

export type NovaLanguageCourse = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  targetLanguage: string;
  cefrLevel: string;
  durationHours: number;
  ageRange: string;
  highlights: string[];
  learningOutcomes: string[];
  modules: NovaLanguageModule[];
};
