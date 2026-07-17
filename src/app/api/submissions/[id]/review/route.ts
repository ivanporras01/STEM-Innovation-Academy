import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

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
    const { score, feedback } = await request.json();

    const submission = await db.submission.update({
      where: { id },
      data: {
        score: Number(score),
        feedback: feedback ?? "",
        status: "REVIEWED",
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch {
    return NextResponse.json({ error: "Review failed" }, { status: 500 });
  }
}
