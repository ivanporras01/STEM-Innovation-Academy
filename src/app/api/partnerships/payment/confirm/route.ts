import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildPartnershipReference } from "@/lib/partnerships/deposit";

/** Demo card checkout when Stripe is not configured (partnership deposit). */
export async function POST(request: Request) {
  try {
    const { applicationId } = await request.json();
    if (!applicationId) {
      return NextResponse.json({ error: "Application ID required" }, { status: 400 });
    }

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
