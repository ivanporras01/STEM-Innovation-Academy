import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { activateEnrollmentFromPayment } from "@/lib/payments/activate-enrollment";
import { isInstitutionPaymentMethod } from "@/lib/payments/payment-methods";
import type { PaymentMethod } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      paymentMethod,
      paymentNotes,
      createSchoolAdmin,
      bulkEmails,
      courseIds,
    } = body as {
      paymentMethod?: PaymentMethod;
      paymentNotes?: string;
      createSchoolAdmin?: boolean;
      bulkEmails?: string[];
      courseIds?: string[];
    };

    const application = await db.partnershipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.status === "APPROVED") {
      return NextResponse.json({ error: "Already approved" }, { status: 409 });
    }
    if (application.paymentStatus !== "COMPLETED") {
      return NextResponse.json(
        { error: "Verified institutional payment is required before provisioning" },
        { status: 409 }
      );
    }

    const method = paymentMethod ?? application.paymentMethod ?? "OTHER";
    if (paymentMethod && !isInstitutionPaymentMethod(paymentMethod)) {
      return NextResponse.json({ error: "Invalid institution payment method" }, { status: 400 });
    }

    const emails = (bulkEmails ?? [])
      .map((email: string) => email.trim().toLowerCase())
      .filter(Boolean);
    const requiredEmails = [
      ...emails,
      ...(createSchoolAdmin ? [application.email.trim().toLowerCase()] : []),
    ];
    const registeredUsers = await db.user.findMany({
      where: { email: { in: requiredEmails } },
      select: { id: true, email: true },
    });
    const registeredByEmail = new Map(registeredUsers.map((user) => [user.email, user]));
    const unregisteredEmails = requiredEmails.filter((email) => !registeredByEmail.has(email));
    if (unregisteredEmails.length > 0) {
      return NextResponse.json(
        {
          error: "All institutional users must create their NOVA account before provisioning",
          unregisteredEmails,
        },
        { status: 409 }
      );
    }

    const schoolCode = `NOVA-${application.institutionName
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 8)
      .toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;

    const school = await db.school.create({
      data: {
        name: application.institutionName,
        code: schoolCode,
        city: application.city,
        state: application.country,
      },
    });

    let schoolAdminId: string | undefined;

    if (createSchoolAdmin) {
      const adminUser = await db.user.update({
        where: { email: application.email.trim().toLowerCase() },
        data: { role: "SCHOOL_ADMIN", schoolId: school.id },
      });
      schoolAdminId = adminUser.id;
    }

    const courses =
      courseIds && courseIds.length > 0
        ? await db.course.findMany({ where: { id: { in: courseIds }, published: true } })
        : await db.course.findMany({ where: { published: true } });

    let enrolledCount = 0;

    for (const email of emails) {
      const user = await db.user.update({
        where: { email },
        data: { schoolId: school.id },
      });

      for (const course of courses) {
        await activateEnrollmentFromPayment({
          userId: user.id,
          courseId: course.id,
          amountCents: 0,
          method,
          notes: `Institutional contract ${application.id}`,
          enrollmentStatus: "INSTITUTIONAL",
        });
        enrolledCount++;
      }
    }

    await db.partnershipApplication.update({
      where: { id },
      data: {
        status: "APPROVED",
        schoolId: school.id,
        paymentMethod: method,
        paymentStatus: "COMPLETED",
        paymentNotes: paymentNotes ?? application.paymentNotes,
        reviewedAt: new Date(),
        reviewedBy: session.user.email,
      },
    });

    return NextResponse.json({
      success: true,
      schoolId: school.id,
      schoolAdminId,
      studentsEnrolled: emails.length,
      enrollmentRecords: enrolledCount,
    });
  } catch (err) {
    console.error("[partnership-approve]", err);
    return NextResponse.json({ error: "Approval failed" }, { status: 500 });
  }
}
