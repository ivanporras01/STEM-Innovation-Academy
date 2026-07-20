import { readFile } from "fs/promises";
import path from "path";
import type { PartnershipStatus } from "@prisma/client";
import { db } from "@/lib/db";

const LEGACY_FILE = path.join(
  process.cwd(),
  "data",
  "partnership-applications",
  "applications.jsonl"
);

export type PartnershipRecord = {
  id: string;
  institutionName: string;
  institutionType: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone?: string | null;
  country: string;
  city: string;
  productInterest: string;
  estimatedStudents: number;
  message: string;
  locale: string;
  status: PartnershipStatus;
  paymentMethod?: string | null;
  paymentStatus?: string;
  paymentNotes?: string | null;
  schoolId?: string | null;
  submittedAt: Date;
  reviewedAt?: Date | null;
};

export async function getPartnershipApplications(): Promise<PartnershipRecord[]> {
  const dbApps = await db.partnershipApplication.findMany({
    orderBy: { submittedAt: "desc" },
  });

  if (dbApps.length > 0) {
    return dbApps;
  }

  try {
    const content = await readFile(LEGACY_FILE, "utf-8");
    return content
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const raw = JSON.parse(line) as Record<string, unknown>;
        return {
          id: String(raw.id),
          institutionName: String(raw.institutionName),
          institutionType: String(raw.institutionType),
          contactName: String(raw.contactName),
          contactRole: String(raw.contactRole),
          email: String(raw.email),
          phone: raw.phone ? String(raw.phone) : null,
          country: String(raw.country),
          city: String(raw.city),
          productInterest: String(raw.productInterest),
          estimatedStudents: Number(raw.estimatedStudents),
          message: String(raw.message),
          locale: String(raw.locale ?? "en"),
          status: "PENDING" as PartnershipStatus,
          submittedAt: new Date(String(raw.submittedAt)),
        };
      })
      .reverse();
  } catch {
    return [];
  }
}
