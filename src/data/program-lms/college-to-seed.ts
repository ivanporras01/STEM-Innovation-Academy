import { LessonType, Pathway } from "@prisma/client";
import type { NovaCollegeCourse } from "@/data/nova-college";
import type { SeedCourse, SeedLesson, SeedModule } from "@/data/pathways/types";
import { getCollegeTrackEn } from "@/data/nova-college/catalog-en";
import { collegeLessonToMarkdown } from "./mission-lesson";

function hoursToMinutes(hours: number): number {
  return Math.max(15, Math.round(hours * 60));
}

function lessonTypeFromCollege(type: string): LessonType {
  if (type === "lab") return LessonType.LAB;
  if (type === "project") return LessonType.PROJECT;
  if (type === "exam-prep") return LessonType.QUIZ;
  return LessonType.READING;
}

function pathwayForCollegeSlug(slug: string): Pathway {
  if (slug.includes("robotics")) return Pathway.ROBOTICS;
  if (slug.includes("iot")) return Pathway.IOT;
  return Pathway.CODING_AI;
}

/** Convert a NOVA College track into LMS SeedCourse modules (markdown missions). */
export function collegeCourseToSeedModules(course: NovaCollegeCourse): {
  modules: SeedModule[];
  capstone: { title: string; description: string };
} {
  const modules: SeedModule[] = course.modules.map((mod) => {
    const lessons: SeedLesson[] = mod.lessons.map((lesson, idx) => {
      const content = lesson.content
        ? collegeLessonToMarkdown({
            title: lesson.title,
            description: lesson.description,
            sections: lesson.content.sections,
            summary: lesson.content.summary,
            careerInsight: lesson.content.careerInsight,
            practicePrompt: `Complete the related module lab (“${mod.labOrProject.title}”) notes for this topic, then write a 5–7 sentence reflection connecting theory to a ticket, campaign, or field scenario.`,
          })
        : collegeLessonToMarkdown({
            title: lesson.title,
            description: lesson.description,
            sections: [
              {
                heading: "Mission context",
                body: `${lesson.description}\n\nThis lesson sits in **${mod.title}**. Study the learning goal, gather evidence (screenshots, notes, or lab logs), and prepare to demonstrate competence in the module lab.`,
              },
              {
                heading: "What good looks like",
                body: "Explain the concept without reading notes, name two failure modes if you skip a control or step, and list the artifact you will submit (checklist, diagram, config, or short report).",
              },
              {
                heading: "Practice path",
                body: `Work through the module lab: **${mod.labOrProject.title}** — ${mod.labOrProject.description}`,
              },
            ],
            practicePrompt:
              "Document steps taken, evidence captured, and one improvement you would make next time.",
          });

      return {
        title: lesson.title,
        type: lessonTypeFromCollege(lesson.type),
        order: idx + 1,
        duration: hoursToMinutes(lesson.hours),
        content,
      };
    });

    lessons.push({
      title: mod.labOrProject.title,
      type: LessonType.LAB,
      order: lessons.length + 1,
      duration: hoursToMinutes(mod.labOrProject.hours),
      content: `# ${mod.labOrProject.title}

**Lab brief.** ${mod.labOrProject.description}

## Objectives
- Complete the lab procedure end-to-end
- Capture evidence (photos, screenshots, logs, or files)
- Reflect on one defect you found and how you fixed it

## Deliverable
Submit a short lab report: steps, evidence, result, and a 90-second STAR story for interviews.

## Stretch goal
Write a one-page runbook so another Explorer could repeat your work without asking you.
`,
    });

    return {
      title: mod.title,
      description: mod.description,
      order: mod.order,
      lessons,
    };
  });

  return {
    modules,
    capstone: {
      title: course.capstone.title,
      description: `${course.capstone.description}\n\nDeliverables:\n${course.capstone.deliverables.map((d) => `- ${d}`).join("\n")}`,
    },
  };
}

export function collegeCourseToSeedCourse(course: NovaCollegeCourse): SeedCourse {
  const en = getCollegeTrackEn(course.slug);
  const { modules, capstone } = collegeCourseToSeedModules(course);
  return {
    title: en?.title ?? course.title,
    slug: `nova-college-${course.slug}`,
    description: en?.description ?? course.description,
    pathway: pathwayForCollegeSlug(course.slug),
    level: course.tier === "advanced" ? "Advanced Career Track" : "Career Track",
    published: true,
    modules,
    capstone,
  };
}
