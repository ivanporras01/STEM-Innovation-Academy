import {
  getNovaCollegeCourseBySlug,
  novaCollegeCourses,
} from "@/data/nova-college";
import type { NovaCollegeCourse, NovaCollegeLesson, NovaCollegeModule } from "@/data/nova-college";

export type CollegeLessonContext = {
  course: NovaCollegeCourse;
  module: NovaCollegeModule;
  lesson: NovaCollegeLesson;
  lessonIndex: number;
  moduleLessons: NovaCollegeLesson[];
};

export function findCollegeLesson(
  courseSlug: string,
  lessonSlug: string,
): CollegeLessonContext | null {
  const course = getNovaCollegeCourseBySlug(courseSlug);
  if (!course) return null;

  for (const mod of course.modules) {
    const lessonIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug);
    if (lessonIndex === -1) continue;
    const lesson = mod.lessons[lessonIndex];
    return {
      course,
      module: mod,
      lesson,
      lessonIndex,
      moduleLessons: mod.lessons,
    };
  }
  return null;
}

/** Static paths for lessons that ship rich content (theory reader). */
export function getCollegeLessonStaticParams() {
  const params: { slug: string; lessonSlug: string }[] = [];
  for (const course of novaCollegeCourses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.content) {
          params.push({ slug: course.slug, lessonSlug: lesson.slug });
        }
      }
    }
  }
  return params;
}

export function countCollegeLessonsWithContent(courseSlug: string): number {
  const course = getNovaCollegeCourseBySlug(courseSlug);
  if (!course) return 0;
  return course.modules.reduce(
    (sum, mod) => sum + mod.lessons.filter((l) => l.content).length,
    0,
  );
}
