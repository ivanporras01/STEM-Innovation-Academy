import type { PaymentMethod } from "@prisma/client";
import { db } from "@/lib/db";

type ActivateParams = {
  userId: string;
  courseId: string;
  amountCents: number;
  method: PaymentMethod;
  stripeSessionId?: string;
  stripePaymentId?: string;
  notes?: string;
  /** INSTITUTIONAL for school bulk enroll; ACTIVE for paid B2C */
  enrollmentStatus?: "ACTIVE" | "INSTITUTIONAL";
};

/** Record a completed payment and unlock course access immediately */
export async function activateEnrollmentFromPayment({
  userId,
  courseId,
  amountCents,
  method,
  stripeSessionId,
  stripePaymentId,
  notes,
  enrollmentStatus = "ACTIVE",
}: ActivateParams) {
  const now = new Date();

  return db.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        userId,
        courseId,
        amountCents,
        method,
        status: "COMPLETED",
        stripeSessionId,
        stripePaymentId,
        notes,
        paidAt: now,
      },
    });

    const enrollment = await tx.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: {
        status: enrollmentStatus,
        paymentId: payment.id,
      },
      create: {
        userId,
        courseId,
        status: enrollmentStatus,
        paymentId: payment.id,
      },
    });

    return { payment, enrollment };
  });
}

/** Complete a pending payment and activate enrollment (demo or admin) */
export async function completePendingPayment(paymentId: string, userId?: string) {
  return db.$transaction(async (tx) => {
    const payment = await tx.payment.findFirst({
      where: {
        id: paymentId,
        status: "PENDING",
        ...(userId ? { userId } : {}),
      },
    });

    if (!payment) return null;

    const paidAt = new Date();
    const claimed = await tx.payment.updateMany({
      where: { id: payment.id, status: "PENDING" },
      data: { status: "COMPLETED", paidAt },
    });
    if (claimed.count !== 1) return null;

    const enrollment = await tx.enrollment.upsert({
      where: { userId_courseId: { userId: payment.userId, courseId: payment.courseId } },
      update: { status: "ACTIVE", paymentId: payment.id },
      create: {
        userId: payment.userId,
        courseId: payment.courseId,
        status: "ACTIVE",
        paymentId: payment.id,
      },
    });

    return {
      payment: { ...payment, status: "COMPLETED" as const, paidAt },
      enrollment,
    };
  });
}
