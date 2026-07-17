import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getExperience } from "@/lib/experiences/catalog";
import { ExperiencePlayer } from "@/components/experiences/experience-player";
import type { BuddyId } from "@/lib/experiences/buddies";
import { isValidBuddyId } from "@/lib/experiences/buddies";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return { title: "Experience Not Found" };
  return {
    title: `${exp.title} | NOVA Experience`,
    description: exp.missionLead,
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const session = await auth();
  let initialProgress = null;

  if (session?.user) {
    const row = await db.experienceProgress.findUnique({
      where: {
        userId_experienceSlug: {
          userId: session.user.id,
          experienceSlug: slug,
        },
      },
    });
    if (row) {
      initialProgress = {
        buddyId: isValidBuddyId(row.buddyId ?? "") ? row.buddyId as BuddyId : null,
        buddyNickname: row.buddyNickname,
        currentStage: row.currentStage,
        labComplete: row.labComplete,
        quizComplete: row.quizComplete,
        reflection: row.reflection,
        completedAt: row.completedAt,
      };
    }
  }

  return (
    <ExperiencePlayer
      experience={experience}
      explorerName={session?.user?.firstName ?? "Explorer"}
      initialProgress={initialProgress}
      isLoggedIn={!!session?.user}
    />
  );
}
