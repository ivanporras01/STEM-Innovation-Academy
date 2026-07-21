import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { submissionSchema } from "@/lib/validations";
import { hasCourseAccess } from "@/lib/enrollment-access";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = submissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { assignmentId, content } = parsed.data;
    const assignment = await db.assignment.findUnique({
      where: { id: assignmentId },
      select: { courseId: true },
    });
    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: assignment.courseId,
        },
      },
    });
    if (!hasCourseAccess(enrollment)) {
      return NextResponse.json({ error: "Active enrollment required" }, { status: 403 });
    }

    const existing = await db.submission.findUnique({
      where: {
        userId_assignmentId: {
          userId: session.user.id,
          assignmentId,
        },
      },
      select: { status: true },
    });
    if (existing?.status === "SUBMITTED") {
      return NextResponse.json({ error: "Submission is awaiting mentor review" }, { status: 409 });
    }
    if (existing?.status === "REVIEWED") {
      return NextResponse.json({ error: "Reviewed submissions cannot be replaced" }, { status: 409 });
    }

    const submission = await db.submission.upsert({
      where: {
        userId_assignmentId: {
          userId: session.user.id,
          assignmentId,
        },
      },
      update: {
        content,
        status: "SUBMITTED",
        submittedAt: new Date(),
        score: null,
        feedback: null,
        reviewedAt: null,
      },
      create: {
        userId: session.user.id,
        assignmentId,
        content,
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
