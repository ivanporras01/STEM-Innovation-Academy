import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const method = paymentMethod ?? application.paymentMethod ?? "OTHER";
    if (paymentMethod && !isInstitutionPaymentMethod(paymentMethod)) {
      return NextResponse.json({ error: "Invalid institution payment method" }, { status: 400 });
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
      const passwordHash = await bcrypt.hash("nova2026", 12);
      const adminUser = await db.user.upsert({
        where: { email: application.email },
        update: { role: "SCHOOL_ADMIN", schoolId: school.id },
        create: {
          email: application.email,
          passwordHash,
          firstName: application.contactName.split(" ")[0] ?? application.contactName,
          lastName: application.contactName.split(" ").slice(1).join(" ") || "Admin",
          role: "SCHOOL_ADMIN",
          schoolId: school.id,
        },
      });
      schoolAdminId = adminUser.id;
    }

    const emails = (bulkEmails ?? [])
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);

    const courses =
      courseIds && courseIds.length > 0
        ? await db.course.findMany({ where: { id: { in: courseIds }, published: true } })
        : await db.course.findMany({ where: { published: true } });

    const passwordHash = await bcrypt.hash("nova2026", 12);
    let enrolledCount = 0;

    for (const email of emails) {
      const nameParts = email.split("@")[0]?.split(".") ?? ["Explorer"];
      const user = await db.user.upsert({
        where: { email },
        update: { schoolId: school.id },
        create: {
          email,
          passwordHash,
          firstName: nameParts[0] ?? "Explorer",
          lastName: nameParts[1] ?? "Student",
          role: "STUDENT",
          schoolId: school.id,
        },
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
        paymentStatus: "PENDING",
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
