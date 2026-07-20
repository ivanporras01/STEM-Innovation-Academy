import type { LessonContent, NovaCollegeLesson, NovaCollegeModule } from "./types";

/** Attach rich LessonContent to theory lessons when a slug match exists in the map. */
export function withLessonContent(
  lessons: NovaCollegeLesson[],
  map: Record<string, LessonContent>
): NovaCollegeLesson[] {
  return lessons.map((lesson) =>
    lesson.slug && map[lesson.slug]
      ? { ...lesson, content: map[lesson.slug] }
      : lesson
  );
}

/** Apply lesson content maps across all modules in a course. */
export function attachContentToModules(
  modules: NovaCollegeModule[],
  map: Record<string, LessonContent>
): NovaCollegeModule[] {
  return modules.map((mod) => ({
    ...mod,
    lessons: withLessonContent(mod.lessons, map),
  }));
}

/** Build a theory lesson stub with stable slug for content attachment. */
export function theoryLesson(
  slug: string,
  title: string,
  description: string,
  hours: number
): NovaCollegeLesson {
  return { slug, title, description, type: "theory", hours };
}
