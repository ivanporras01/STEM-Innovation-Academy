import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { completePendingPayment } from "@/lib/payments/activate-enrollment";
import { db } from "@/lib/db";
import { z } from "zod";

const confirmDemoPaymentSchema = z.object({
  paymentId: z.string().cuid(),
});

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const parsed = confirmDemoPaymentSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid payment ID required" }, { status: 400 });
    }

    const { paymentId } = parsed.data;
    const demoPayment = await db.payment.findFirst({
      where: {
        id: paymentId,
        userId: session.user.id,
        method: "STRIPE",
        status: "PENDING",
        notes: "Demo card checkout — auto-confirm in dev",
      },
      select: { id: true },
    });
    if (!demoPayment) {
      return NextResponse.json({ error: "Demo payment not found" }, { status: 404 });
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
