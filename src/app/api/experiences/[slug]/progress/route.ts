import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getExperience } from "@/lib/experiences/catalog";
import type { BuddyId } from "@/lib/experiences/catalog";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const {
    buddyId,
    buddyNickname,
    currentStage,
    labComplete,
    quizComplete,
    reflection,
    completed,
  } = body as {
    buddyId?: BuddyId;
    buddyNickname?: string;
    currentStage?: number;
    labComplete?: boolean;
    quizComplete?: boolean;
    reflection?: string;
    completed?: boolean;
  };

  const progress = await db.experienceProgress.upsert({
    where: {
      userId_experienceSlug: {
        userId: session.user.id,
        experienceSlug: slug,
      },
    },
    create: {
      userId: session.user.id,
      experienceSlug: slug,
      buddyId: buddyId ?? null,
      buddyNickname: buddyNickname ?? null,
      currentStage: currentStage ?? 0,
      labComplete: labComplete ?? false,
      quizComplete: quizComplete ?? false,
      reflection: reflection ?? null,
      completedAt: completed ? new Date() : null,
    },
    update: {
      ...(buddyId !== undefined && { buddyId }),
      ...(buddyNickname !== undefined && { buddyNickname }),
      ...(currentStage !== undefined && { currentStage }),
      ...(labComplete !== undefined && { labComplete }),
      ...(quizComplete !== undefined && { quizComplete }),
      ...(reflection !== undefined && { reflection }),
      ...(completed && { completedAt: new Date() }),
    },
  });

  return NextResponse.json({ ok: true, progress });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ progress: null });
  }

  const { slug } = await params;
  const progress = await db.experienceProgress.findUnique({
    where: {
      userId_experienceSlug: {
        userId: session.user.id,
        experienceSlug: slug,
      },
    },
  });

  return NextResponse.json({ progress });
}
