import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { submissionSchema } from "@/lib/validations";

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
