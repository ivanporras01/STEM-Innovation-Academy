/** Unified NOVA STEM HUB program catalog — marketing + tuition + access policy. */

export type ProgramVertical = "school" | "college" | "language";

export type ProgramTier = "youth" | "entry" | "advanced";

export type ProgramAccess = "paid" | "demo-then-paid";

export type NovaProgram = {
  slug: string;
  vertical: ProgramVertical;
  tier: ProgramTier;
  title: string;
  tagline: string;
  description: string;
  /** Public marketing page (syllabus visible, content gated). */
  catalogHref: string;
  durationLabel: string;
  contactHours?: number;
  ageRange: string;
  /** Suggested B2C tuition in USD (annual or full program). */
  tuitionUsd: number;
  tuitionLabel: string;
  access: ProgramAccess;
  /** Free trial for School — mission slug or experience slug. */
  demoHref?: string;
  demoLabel?: string;
  certCode?: string;
  certAlignment?: string;
  highlights: readonly string[];
  deliveryNote?: string;
};

export type ProgramBundle = {
  slug: string;
  title: string;
  description: string;
  programSlugs: readonly string[];
  tuitionUsd: number;
  savingsUsd: number;
  tuitionLabel: string;
};

export type LaunchBlocker = {
  id: string;
  area: "payments" | "access" | "content" | "infra" | "ops";
  title: string;
  status: "done" | "partial" | "pending";
  note: string;
};
