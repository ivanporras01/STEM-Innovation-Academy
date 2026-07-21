import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildPartnershipReference } from "@/lib/partnerships/deposit";
import { z } from "zod";

const demoConfirmationSchema = z.object({
  applicationId: z.string().cuid(),
});

/** Demo card checkout when Stripe is not configured (partnership deposit). */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const parsed = demoConfirmationSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid application ID required" }, { status: 400 });
    }
    const { applicationId } = parsed.data;

    const application = await db.partnershipApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.paymentStatus === "COMPLETED") {
      return NextResponse.json({ success: true, alreadyCompleted: true });
    }

    const refCode = buildPartnershipReference(application.id);

    await db.partnershipApplication.update({
      where: { id: application.id },
      data: {
        paymentStatus: "COMPLETED",
        paymentNotes: `Demo card deposit confirmed — ${refCode}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Payment confirmation failed" }, { status: 500 });
  }
}
