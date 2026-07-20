import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isNovaAiTutoringEnabled } from "@/lib/nova-ai-tutoring";

export const metadata: Metadata = {
  title: "Tutoring Session — NOVA",
};

export default async function AiTutoringSessionPage() {
  if (!isNovaAiTutoringEnabled) {
    redirect("/ai-tutoring");
  }

  const { AiTutoringExperience } = await import("@/components/ai-tutoring/ai-tutoring-experience");
  return <AiTutoringExperience initialRoom="classroom" />;
}
