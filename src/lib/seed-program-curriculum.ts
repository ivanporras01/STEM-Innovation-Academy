import type { LessonType } from "@prisma/client";
import { db } from "@/lib/db";
import type { SeedModule } from "@/data/pathways/types";

export type CurriculumSeed = {
  modules: SeedModule[];
  capstone?: { title: string; description: string };
};

/** Upsert Module + Lesson rows for a course. Idempotent by module/lesson order. */
export async function seedCourseModules(
  courseId: string,
  curriculum: CurriculumSeed,
): Promise<{ moduleCount: number; lessonCount: number }> {
  let lessonCount = 0;

  for (const modData of curriculum.modules) {
    const { lessons, ...modFields } = modData;

    const existingModule = await db.module.findFirst({
      where: { courseId, order: modFields.order },
    });

    const mod = existingModule
      ? await db.module.update({
          where: { id: existingModule.id },
          data: {
            title: modFields.title,
            description: modFields.description,
          },
        })
      : await db.module.create({
          data: {
            title: modFields.title,
            description: modFields.description,
            order: modFields.order,
            courseId,
          },
        });

    for (const lessonData of lessons) {
      const existingLesson = await db.lesson.findFirst({
        where: { moduleId: mod.id, order: lessonData.order },
      });

      const payload = {
        title: lessonData.title,
        content: lessonData.content,
        type: lessonData.type as LessonType,
        duration: lessonData.duration,
        videoUrl: lessonData.videoUrl ?? null,
      };

      if (existingLesson) {
        await db.lesson.update({
          where: { id: existingLesson.id },
          data: payload,
        });
      } else {
        await db.lesson.create({
          data: { ...payload, order: lessonData.order, moduleId: mod.id },
        });
      }
      lessonCount += 1;
    }

    const seedOrders = lessons.map((l) => l.order);
    await db.lesson.deleteMany({
      where: { moduleId: mod.id, order: { notIn: seedOrders } },
    });
  }

  const seedModuleOrders = curriculum.modules.map((m) => m.order);
  await db.module.deleteMany({
    where: { courseId, order: { notIn: seedModuleOrders } },
  });

  if (curriculum.capstone) {
    const existingAssignment = await db.assignment.findFirst({
      where: { courseId },
    });
    if (existingAssignment) {
      await db.assignment.update({
        where: { id: existingAssignment.id },
        data: {
          title: curriculum.capstone.title,
          description: curriculum.capstone.description,
        },
      });
    } else {
      await db.assignment.create({
        data: {
          title: curriculum.capstone.title,
          description: curriculum.capstone.description,
          courseId,
          maxScore: 100,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }
  }

  return { moduleCount: curriculum.modules.length, lessonCount };
}

/** Seed only when the course has zero modules (never clobber READY pathway curricula). */
export async function seedCourseModulesIfEmpty(
  courseId: string,
  curriculum: CurriculumSeed | null,
): Promise<{ seeded: boolean; moduleCount: number; lessonCount: number }> {
  if (!curriculum || curriculum.modules.length === 0) {
    return { seeded: false, moduleCount: 0, lessonCount: 0 };
  }

  const existing = await db.module.count({ where: { courseId } });
  if (existing > 0) {
    return { seeded: false, moduleCount: existing, lessonCount: 0 };
  }

  const result = await seedCourseModules(courseId, curriculum);
  return { seeded: true, ...result };
}

/** Force-sync curriculum (electives / language / college LMS mirrors). */
export async function syncCourseModules(
  courseId: string,
  curriculum: CurriculumSeed,
): Promise<{ moduleCount: number; lessonCount: number }> {
  return seedCourseModules(courseId, curriculum);
}
