import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { activateEnrollmentFromPayment } from "@/lib/payments/activate-enrollment";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { courseId, institutional } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId, published: true },
      include: { product: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const existing = await db.enrollment.findUnique({
      where: {
        userId_courseId: { userId: session.user.id, courseId },
      },
    });

    if (existing && hasCourseAccess(existing)) {
      return NextResponse.json({ success: true, alreadyEnrolled: true });
    }

    const isAdmin =
      session.user.role === "ADMIN" || session.user.role === "SCHOOL_ADMIN";

    // Institutional bulk enroll (school admin / platform admin)
    if (institutional && isAdmin) {
      await activateEnrollmentFromPayment({
        userId: session.user.id,
        courseId,
        amountCents: 0,
        method: "OTHER",
        notes: `Institutional enrollment by ${session.user.email}`,
        enrollmentStatus: "INSTITUTIONAL",
      });
      return NextResponse.json({ success: true, institutional: true });
    }

    // Free courses or admin override
    const priceCents = course.product?.priceCents ?? 0;
    if (priceCents <= 0 && isAdmin) {
      await db.enrollment.upsert({
        where: { userId_courseId: { userId: session.user.id, courseId } },
        update: { status: "ACTIVE" },
        create: { userId: session.user.id, courseId, status: "ACTIVE" },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      {
        error: "Payment required",
        message: "Use checkout to enroll in this mission path",
        checkoutRequired: true,
      },
      { status: 402 }
    );
  } catch {
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
  }
}
