import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { pathwayCourses } from "../src/data/pathways";
import { getAllProgramLmsSeedCourses } from "../src/data/program-lms";
import type { SeedCourse } from "../src/data/pathways/types";
import { NOVA_PROGRAM_CATALOG } from "../src/data/courses";

const prisma = new PrismaClient();

const PATHWAY_PRICE: Record<string, number> = {
  "intro-python-ai": 24900,
  "robotics-engineering": 24900,
  "iot-smart-systems": 24900,
};

async function upsertSeedCourse(
  courseData: SeedCourse,
  mentorId: string | undefined,
  schoolId: string | undefined,
  studentId: string | undefined,
  priceCents: number,
) {
  const { modules, capstone, ...courseFields } = courseData;

  const course = await prisma.course.upsert({
    where: { slug: courseFields.slug },
    update: {
      title: courseFields.title,
      description: courseFields.description,
      pathway: courseFields.pathway,
      level: courseFields.level,
      published: true,
      mentorId,
      schoolId,
    },
    create: {
      ...courseFields,
      mentorId,
      schoolId,
    },
  });

  for (const modData of modules) {
    const { lessons, ...modFields } = modData;

    const existingModule = await prisma.module.findFirst({
      where: { courseId: course.id, order: modFields.order },
    });

    const mod = existingModule
      ? await prisma.module.update({
          where: { id: existingModule.id },
          data: modFields,
        })
      : await prisma.module.create({
          data: { ...modFields, courseId: course.id },
        });

    for (const lessonData of lessons) {
      const existingLesson = await prisma.lesson.findFirst({
        where: { moduleId: mod.id, order: lessonData.order },
      });

      if (existingLesson) {
        await prisma.lesson.update({
          where: { id: existingLesson.id },
          data: lessonData,
        });
      } else {
        await prisma.lesson.create({
          data: { ...lessonData, moduleId: mod.id },
        });
      }
    }

    const seedOrders = lessons.map((l) => l.order);
    await prisma.lesson.deleteMany({
      where: {
        moduleId: mod.id,
        order: { notIn: seedOrders },
      },
    });
  }

  const seedModuleOrders = modules.map((m) => m.order);
  await prisma.module.deleteMany({
    where: {
      courseId: course.id,
      order: { notIn: seedModuleOrders },
    },
  });

  if (studentId) {
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: { userId: studentId, courseId: course.id },
      },
      update: { status: "ACTIVE" },
      create: { userId: studentId, courseId: course.id, status: "ACTIVE" },
    });
  }

  await prisma.courseProduct.upsert({
    where: { courseId: course.id },
    update: { priceCents },
    create: {
      courseId: course.id,
      priceCents,
      currency: "usd",
    },
  });

  const existingAssignment = await prisma.assignment.findFirst({
    where: { courseId: course.id },
  });

  if (existingAssignment) {
    await prisma.assignment.update({
      where: { id: existingAssignment.id },
      data: {
        title: capstone.title,
        description: capstone.description,
      },
    });
  } else {
    await prisma.assignment.create({
      data: {
        title: capstone.title,
        description: capstone.description,
        courseId: course.id,
        maxScore: 100,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  return course;
}

function priceForSlug(slug: string): number {
  const schoolPathSlugs: Record<string, string> = {
    "coding-ai": "intro-python-ai",
    "robotics-engineering": "robotics-engineering",
    "iot-smart-systems": "iot-smart-systems",
  };
  const program = NOVA_PROGRAM_CATALOG.find((candidate) => {
    const lmsSlug =
      candidate.vertical === "school" && schoolPathSlugs[candidate.slug]
        ? schoolPathSlugs[candidate.slug]
        : `nova-${candidate.vertical}-${candidate.slug}`;
    return lmsSlug === slug;
  });
  if (!program) {
    throw new Error(`No catalog price configured for seeded course: ${slug}`);
  }
  return program.tuitionUsd * 100;
}

async function main() {
  console.log("🌱 Seeding NOVA LMS database...\n");

  const seedDemoAccounts =
    process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1";
  let mentorId: string | undefined;
  let studentId: string | undefined;
  let schoolId: string | undefined;

  if (seedDemoAccounts) {
    const passwordHash = await bcrypt.hash("nova2026", 12);
    const school = await prisma.school.upsert({
      where: { code: "NOVA-PILOT" },
      update: {},
      create: {
        name: "NOVA School — Pilot Campus",
        code: "NOVA-PILOT",
        city: "San Juan",
        state: "PR",
      },
    });
    schoolId = school.id;

    await prisma.user.upsert({
      where: { email: "admin@steminnovationacademy.org" },
      update: {},
      create: {
        email: "admin@steminnovationacademy.org",
        passwordHash,
        firstName: "NOVA",
        lastName: "Admin",
        role: Role.ADMIN,
      },
    });

    const mentor = await prisma.user.upsert({
      where: { email: "mentor@steminnovationacademy.org" },
      update: {},
      create: {
        email: "mentor@steminnovationacademy.org",
        passwordHash,
        firstName: "Dr. Elena",
        lastName: "Rivera",
        role: Role.MENTOR,
        schoolId,
      },
    });
    mentorId = mentor.id;

    const student = await prisma.user.upsert({
      where: { email: "student@steminnovationacademy.org" },
      update: {},
      create: {
        email: "student@steminnovationacademy.org",
        passwordHash,
        firstName: "Alex",
        lastName: "Nova",
        role: Role.STUDENT,
        schoolId,
      },
    });
    studentId = student.id;
  }

  for (const courseData of pathwayCourses) {
    await upsertSeedCourse(
      courseData,
      mentorId,
      schoolId,
      studentId,
      PATHWAY_PRICE[courseData.slug] ?? 24900,
    );
  }

  const programCourses = getAllProgramLmsSeedCourses();
  for (const courseData of programCourses) {
    await upsertSeedCourse(
      courseData,
      mentorId,
      schoolId,
      studentId,
      priceForSlug(courseData.slug),
    );
  }

  const allCourses = [...pathwayCourses, ...programCourses];
  const totalMissions = allCourses.reduce(
    (acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
    0,
  );

  console.log(
    `✅ Seed complete — ${allCourses.length} mission paths, ${totalMissions} missions\n`,
  );
  if (seedDemoAccounts) {
    console.log("Local demo accounts (password: nova2026):");
    console.log("  Admin:   admin@steminnovationacademy.org");
    console.log("  Mentor:  mentor@steminnovationacademy.org");
    console.log("  Explorer: student@steminnovationacademy.org");
  } else {
    console.log("Production seed: demo identities were not created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
