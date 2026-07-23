import type { Metadata } from "next";
import { ResourcesHub } from "@/components/resources/resources-hub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources — NOVA STEM HUB",
  description:
    "Explore the NOVA STEM HUB resource hub: programs, scholarships, internships, partnerships, verify certificates, and more.",
  path: "/resources",
});

export default function ResourcesPage() {
  return <ResourcesHub locale="en" />;
}
