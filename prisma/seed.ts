import { PrismaClient, Role, Pathway, LessonType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding NOVA LMS database...\n");

  const passwordHash = await bcrypt.hash("nova2026", 12);

  const school = await prisma.school.upsert({
    where: { code: "NOVA-PILOT" },
    update: {},
    create: {
      name: "STEM Innovation Academy — Pilot School",
      code: "NOVA-PILOT",
      city: "San Juan",
      state: "PR",
    },
  });

  const admin = await prisma.user.upsert({
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
      schoolId: school.id,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@steminnovationacademy.org" },
    update: {},
    create: {
      email: "student@steminnovationacademy.org",
      passwordHash,
      firstName: "Alex",
      lastName: "Nova",
      role: Role.STUDENT,
      schoolId: school.id,
    },
  });

  const courses = [
    {
      title: "Introduction to Python & AI",
      slug: "intro-python-ai",
      description:
        "Learn Python fundamentals and build your first AI-powered projects. Perfect for NOVA Explorers starting their coding journey.",
      pathway: Pathway.CODING_AI,
      level: "Beginner",
      published: true,
      modules: [
        {
          title: "Python Foundations",
          order: 1,
          lessons: [
            {
              title: "Welcome to NOVA Coding",
              type: LessonType.READING,
              order: 1,
              duration: 10,
              content: `# Welcome to NOVA Coding\n\nEvery student is a NOVA waiting to shine. In this pathway you'll learn Python — one of the most powerful languages for AI and automation.\n\n## What you'll build\n- A personal greeting program\n- A simple calculator\n- Your first data visualization\n\n## Learning mindset\nAt STEM Innovation Academy, we learn by **building real projects**, not memorizing syntax. Each lesson connects to something you can show your family, your school, or your future employer.`,
            },
            {
              title: "Variables & Data Types",
              type: LessonType.VIDEO,
              order: 2,
              duration: 20,
              videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
              content: `# Variables & Data Types\n\nVariables store information your program needs to remember.\n\n\`\`\`python\nname = "Alex"\nage = 14\nis_nova_explorer = True\n\`\`\`\n\n## Practice\nCreate three variables about yourself and print them using \`print()\`.`,
            },
            {
              title: "Lab: Your First Python Program",
              type: LessonType.LAB,
              order: 3,
              duration: 30,
              content: `# Lab: Your First Python Program\n\n## Mission\nBuild a program that introduces you as a NOVA Explorer.\n\n## Requirements\n1. Ask the user for their name\n2. Ask for their favorite STEM topic\n3. Print a personalized welcome message\n\n## Example output\n\`\`\`\nWelcome, Alex! Ready to explore Robotics at NOVA?\n\`\`\`\n\nSubmit your code in the assignment section when you're done.`,
            },
          ],
        },
        {
          title: "Introduction to AI",
          order: 2,
          lessons: [
            {
              title: "What is Artificial Intelligence?",
              type: LessonType.READING,
              order: 1,
              duration: 15,
              content: `# What is Artificial Intelligence?\n\nAI is technology that enables machines to perform tasks that typically require human intelligence — recognizing patterns, making decisions, and learning from data.\n\n## Real-world NOVA examples\n- **Smart assistants** that understand speech\n- **Recommendation systems** on streaming platforms\n- **Computer vision** in robotics competitions\n\n## Ethics matters\nAs future innovators, NOVA Explorers always ask: *Who benefits? Who might be harmed?*`,
            },
            {
              title: "Project: Build a Simple Chatbot",
              type: LessonType.PROJECT,
              order: 2,
              duration: 45,
              content: `# Project: Build a Simple Chatbot\n\n## Overview\nCreate a rule-based chatbot in Python that answers questions about STEM Innovation Academy.\n\n## Starter code\n\`\`\`python\nresponses = {\n    "hello": "Welcome to NOVA! How can I help you learn today?",\n    "pathways": "We offer Coding & AI, Robotics, and IoT pathways!",\n}\n\`\`\`\n\n## Deliverable\nExtend the chatbot with at least 5 new responses and submit via the assignment portal.`,
            },
          ],
        },
      ],
    },
    {
      title: "Robotics & Engineering Design",
      slug: "robotics-engineering",
      description:
        "Design, build, and program robots to solve authentic engineering challenges using the engineering design process.",
      pathway: Pathway.ROBOTICS,
      level: "Intermediate",
      published: true,
      modules: [
        {
          title: "Engineering Design Process",
          order: 1,
          lessons: [
            {
              title: "The NOVA Engineering Mindset",
              type: LessonType.READING,
              order: 1,
              duration: 15,
              content: `# The NOVA Engineering Mindset\n\nEngineers don't guess — they **design, test, and iterate**.\n\n## The 5-step process\n1. **Define** the problem\n2. **Research** existing solutions\n3. **Brainstorm** multiple ideas\n4. **Build & Test** a prototype\n5. **Improve** based on results\n\nThis is the same process used at NASA, Tesla, and your local robotics competition.`,
            },
            {
              title: "Lab: Design Challenge — Line Follower",
              type: LessonType.LAB,
              order: 2,
              duration: 60,
              content: `# Lab: Line Follower Robot\n\n## Challenge\nDesign a robot that follows a black line on a white surface.\n\n## Materials\n- Microcontroller (Arduino or similar)\n- 2+ IR sensors\n- Motor driver & wheels\n\n## Documentation\nRecord your design process in your NOVA portfolio: sketches, code, test results, and improvements.`,
            },
          ],
        },
      ],
    },
    {
      title: "IoT & Smart Systems",
      slug: "iot-smart-systems",
      description:
        "Connect sensors, microcontrollers, and cloud services to build intelligent systems for homes, schools, and communities.",
      pathway: Pathway.IOT,
      level: "Intermediate",
      published: true,
      modules: [
        {
          title: "Connected Devices",
          order: 1,
          lessons: [
            {
              title: "Introduction to IoT",
              type: LessonType.READING,
              order: 1,
              duration: 15,
              content: `# Introduction to IoT\n\nThe **Internet of Things** connects physical devices to the internet so they can collect data and take action.\n\n## NOVA IoT examples\n- Smart greenhouse monitoring temperature & humidity\n- School energy dashboard\n- Community air quality sensor network\n\n## Key components\n- **Sensors** (input)\n- **Microcontroller** (brain)\n- **Connectivity** (WiFi, LoRa, Bluetooth)\n- **Cloud platform** (data storage & visualization)`,
            },
            {
              title: "Lab: Temperature Monitor",
              type: LessonType.LAB,
              order: 2,
              duration: 45,
              content: `# Lab: Temperature Monitor\n\nBuild a device that reads temperature every 5 seconds and displays it on an LCD screen.\n\n## Stretch goal\nSend readings to a cloud dashboard and set an alert when temperature exceeds 30°C.`,
            },
          ],
        },
      ],
    },
  ];

  for (const courseData of courses) {
    const { modules, ...courseFields } = courseData;

    const course = await prisma.course.upsert({
      where: { slug: courseFields.slug },
      update: { published: true, mentorId: mentor.id, schoolId: school.id },
      create: {
        ...courseFields,
        mentorId: mentor.id,
        schoolId: school.id,
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
    }

    await prisma.enrollment.upsert({
      where: {
        userId_courseId: { userId: student.id, courseId: course.id },
      },
      update: {},
      create: { userId: student.id, courseId: course.id },
    });

    const assignment = await prisma.assignment.findFirst({
      where: { courseId: course.id },
    });

    if (!assignment) {
      await prisma.assignment.create({
        data: {
          title: `${course.title} — Capstone Project`,
          description: `Complete the final project for ${course.title} and submit your work for mentor review.`,
          courseId: course.id,
          maxScore: 100,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }
  }

  console.log("✅ Seed complete!\n");
  console.log("Demo accounts (password: nova2026):");
  console.log("  Admin:   admin@steminnovationacademy.org");
  console.log("  Mentor:  mentor@steminnovationacademy.org");
  console.log("  Student: student@steminnovationacademy.org");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
