import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export const pathwayLabels: Record<string, string> = {
  CODING_AI: "Coding & AI",
  ROBOTICS: "Robotics & Engineering",
  IOT: "IoT & Smart Systems",
};

export const roleLabels: Record<string, string> = {
  STUDENT: "NOVA Explorer",
  MENTOR: "Innovation Mentor",
  PARENT: "Parent / Guardian",
  ADMIN: "Administrator",
  SCHOOL_ADMIN: "School Admin",
};

export const lessonTypeLabels: Record<string, string> = {
  VIDEO: "Video",
  READING: "Reading",
  LAB: "Hands-on Lab",
  QUIZ: "Quiz",
  PROJECT: "Project",
};

export function calculateCourseProgress(
  totalLessons: number,
  completedLessons: number
): number {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}
