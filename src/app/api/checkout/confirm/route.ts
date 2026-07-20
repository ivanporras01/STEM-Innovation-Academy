import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { completePendingPayment } from "@/lib/payments/activate-enrollment";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { paymentId } = await request.json();
    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
    }

    const result = await completePendingPayment(paymentId, session.user.id);
    if (!result) {
      return NextResponse.json({ error: "Payment not found or already completed" }, { status: 404 });
    }

    const course = await db.course.findUnique({
      where: { id: result.payment.courseId },
      select: { slug: true, title: true },
    });

    return NextResponse.json({
      success: true,
      courseSlug: course?.slug,
      courseTitle: course?.title,
    });
  } catch {
    return NextResponse.json({ error: "Payment confirmation failed" }, { status: 500 });
  }
}
