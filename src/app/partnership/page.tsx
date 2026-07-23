import type { Metadata } from "next";
import { PartnershipPageContent } from "@/components/partnerships/partnership-page-content";
import { NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_COLLEGE } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "NOVA Partnership — Schools & Colleges",
  description: `License ${NOVA_SCHOOL.name}, ${NOVA_COLLEGE.name}, and ${NOVA_LANGUAGE.name} for your institution — curriculum, platform, facilitator guides, and verifiable certificates.`,
  path: "/partnership",
  keywords: ["NOVA Partnership", "B2B STEM licensing", "school curriculum license", "college STEM platform"],
});

export default function PartnershipPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <PartnershipPageContent locale="en" />
      </div>
  );
}
