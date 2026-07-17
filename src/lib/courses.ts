import { db } from "@/lib/db";
import { calculateCourseProgress } from "@/lib/utils";

export async function getPublishedCourses() {
  return db.course.findMany({
    where: { published: true },
    include: {
      mentor: { select: { firstName: true, lastName: true } },
      modules: {
        include: { _count: { select: { lessons: true } } },
      },
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function getCourseBySlug(slug: string) {
  return db.course.findUnique({
    where: { slug },
    include: {
      mentor: { select: { firstName: true, lastName: true, email: true } },
      school: { select: { name: true } },
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
      assignments: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function getUserEnrollments(userId: string) {
  const enrollments = await db.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          mentor: { select: { firstName: true, lastName: true } },
          modules: {
            include: {
              lessons: { select: { id: true } },
            },
          },
        },
      },
    },
  });

  const progressRecords = await db.lessonProgress.findMany({
    where: { userId, completed: true },
    select: { lessonId: true },
  });

  const completedSet = new Set(progressRecords.map((p) => p.lessonId));

  return enrollments.map((enrollment) => {
    const allLessons = enrollment.course.modules.flatMap((m) => m.lessons);
    const completed = allLessons.filter((l) => completedSet.has(l.id)).length;

    return {
      ...enrollment,
      progress: calculateCourseProgress(allLessons.length, completed),
      totalLessons: allLessons.length,
      completedLessons: completed,
    };
  });
}

export async function getCourseProgress(userId: string, courseId: string) {
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      modules: { include: { lessons: { select: { id: true } } } },
    },
  });

  if (!course) return { total: 0, completed: 0, percent: 0 };

  const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completed = await db.lessonProgress.count({
    where: { userId, lessonId: { in: lessonIds }, completed: true },
  });

  return {
    total: lessonIds.length,
    completed,
    percent: calculateCourseProgress(lessonIds.length, completed),
  };
}

export async function getLessonWithProgress(lessonId: string, userId?: string) {
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: {
            select: { id: true, title: true, slug: true },
          },
          lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, order: true } },
        },
      },
    },
  });

  if (!lesson || !userId) return { lesson, completed: false };

  const progress = await db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  return { lesson, completed: progress?.completed ?? false };
}

export async function getMentorDashboard(mentorId: string) {
  const courses = await db.course.findMany({
    where: { mentorId },
    include: {
      _count: { select: { enrollments: true } },
      assignments: {
        include: {
          submissions: {
            where: { status: "SUBMITTED" },
            include: {
              user: { select: { firstName: true, lastName: true, email: true } },
            },
          },
        },
      },
    },
  });

  const pendingReviews = courses.reduce(
    (acc, c) => acc + c.assignments.reduce((a, asn) => a + asn.submissions.length, 0),
    0
  );

  return { courses, pendingReviews };
}

export async function getFirstIncompleteLessonUrl(
  userId: string,
  courseSlug: string,
  courseId: string
): Promise<string | null> {
  const completedRecords = await db.lessonProgress.findMany({
    where: {
      userId,
      completed: true,
      lesson: { module: { courseId } },
    },
    select: { lessonId: true },
  });
  const completedIds = new Set(completedRecords.map((r) => r.lessonId));

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" }, select: { id: true } },
        },
      },
    },
  });

  if (!course) return null;

  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!completedIds.has(lesson.id)) {
        return `/courses/${courseSlug}/lessons/${lesson.id}`;
      }
    }
  }

  return null;
}

export async function getAdminStats() {
  const [users, courses, enrollments, schools] = await Promise.all([
    db.user.count(),
    db.course.count({ where: { published: true } }),
    db.enrollment.count(),
    db.school.count(),
  ]);

  return { users, courses, enrollments, schools };
}
