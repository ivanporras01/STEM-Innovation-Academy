import type { LessonType, Pathway } from "@prisma/client";

export type SeedLesson = {
  title: string;
  type: LessonType;
  order: number;
  duration: number;
  content: string;
  videoUrl?: string;
};

export type SeedModule = {
  title: string;
  description?: string;
  order: number;
  lessons: SeedLesson[];
};

export type SeedCourse = {
  title: string;
  slug: string;
  description: string;
  pathway: Pathway;
  level: string;
  published: boolean;
  modules: SeedModule[];
  capstone: {
    title: string;
    description: string;
  };
};
