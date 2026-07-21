import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { z } from "zod";

const reviewSchema = z.object({
  score: z.coerce.number().int().min(0),
  feedback: z.string().trim().max(4000).default(""),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role;
  if (role !== "MENTOR" && role !== "ADMIN" && role !== "SCHOOL_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const parsed = reviewSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid review" }, { status: 400 });
    }

    const submission = await db.submission.findUnique({
      where: { id },
      include: {
        assignment: {
          select: {
            maxScore: true,
            course: { select: { id: true, mentorId: true, schoolId: true } },
          },
        },
      },
    });
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    if (submission.status !== "SUBMITTED") {
      return NextResponse.json({ error: "Submission is not awaiting review" }, { status: 409 });
    }

    const { score, feedback } = parsed.data;
    if (score > submission.assignment.maxScore) {
      return NextResponse.json(
        { error: `Score must be between 0 and ${submission.assignment.maxScore}` },
        { status: 400 }
      );
    }

    const course = submission.assignment.course;
    let authorized = role === "ADMIN";
    if (role === "MENTOR") {
      authorized = course.mentorId === session.user.id;
    } else if (role === "SCHOOL_ADMIN") {
      const reviewer = await db.user.findUnique({
        where: { id: session.user.id },
        select: { schoolId: true },
      });
      authorized = Boolean(reviewer?.schoolId && reviewer.schoolId === course.schoolId);
    }
    if (!authorized) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: submission.userId,
          courseId: course.id,
        },
      },
    });
    if (!hasCourseAccess(enrollment)) {
      return NextResponse.json({ error: "Explorer enrollment is not active" }, { status: 409 });
    }

    const updated = await db.submission.updateMany({
      where: { id, status: "SUBMITTED" },
      data: {
        score,
        feedback,
        status: "REVIEWED",
        reviewedAt: new Date(),
      },
    });
    if (updated.count !== 1) {
      return NextResponse.json({ error: "Submission state changed; reload and retry" }, { status: 409 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Review failed" }, { status: 500 });
  }
}
