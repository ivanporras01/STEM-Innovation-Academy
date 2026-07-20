import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { completePendingPayment } from "@/lib/payments/activate-enrollment";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const result = await completePendingPayment(id);

  if (!result) {
    return NextResponse.json({ error: "Payment not found or already completed" }, { status: 404 });
  }

  return NextResponse.json({ success: true, paymentId: id });
}
