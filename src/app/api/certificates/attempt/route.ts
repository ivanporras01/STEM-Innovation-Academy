import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAssessmentStatus,
  submitFinalAssessment,
} from "@/lib/certificates/service";
import { getPublicFinalExam } from "@/lib/certificates/final-exam";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  const status = await getAssessmentStatus(session.user.id, courseId);
  return NextResponse.json({
    ...status,
    questions: status.canAttempt ? getPublicFinalExam() : [],
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { courseId?: string; answers?: Record<string, number>; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { courseId, answers, locale } = body;
  if (!courseId || !answers || typeof answers !== "object") {
    return NextResponse.json(
      { error: "courseId and answers are required" },
      { status: 400 },
    );
  }

  const result = await submitFinalAssessment(
    session.user.id,
    courseId,
    answers,
    locale,
  );
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
