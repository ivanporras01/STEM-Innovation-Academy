import { readFile } from "fs/promises";
import path from "path";
import type { ScholarshipApplyInput } from "@/lib/validations";

export type ScholarshipApplicationRecord = ScholarshipApplyInput & {
  id: string;
  submittedAt: string;
};

const APPLICATIONS_FILE = path.join(
  process.cwd(),
  "data",
  "scholarship-applications",
  "applications.jsonl",
);

export async function getScholarshipApplications(): Promise<ScholarshipApplicationRecord[]> {
  try {
    const content = await readFile(APPLICATIONS_FILE, "utf-8");
    return content
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as ScholarshipApplicationRecord)
      .reverse();
  } catch {
    return [];
  }
}

export async function getScholarshipApplicationStats() {
  const apps = await getScholarshipApplications();
  const byProgram = apps.reduce<Record<string, number>>((acc, app) => {
    acc[app.programId] = (acc[app.programId] ?? 0) + 1;
    return acc;
  }, {});
  return { total: apps.length, byProgram };
}
