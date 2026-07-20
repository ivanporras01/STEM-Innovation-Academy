import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { activateEnrollmentFromPayment } from "@/lib/payments/activate-enrollment";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = getStripe()!;
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[stripe-webhook] signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;
    const partnershipApplicationId = checkoutSession.metadata?.partnershipApplicationId;

    if (partnershipApplicationId) {
      const application = await db.partnershipApplication.findUnique({
        where: { id: partnershipApplicationId },
      });
      if (application && application.paymentStatus !== "COMPLETED") {
        await db.partnershipApplication.update({
          where: { id: partnershipApplicationId },
          data: {
            paymentStatus: "COMPLETED",
            paymentNotes: `Stripe ${checkoutSession.id}`,
          },
        });
      }
      return NextResponse.json({ received: true });
    }

    const paymentId = checkoutSession.metadata?.paymentId;
    const userId = checkoutSession.metadata?.userId;
    const courseId = checkoutSession.metadata?.courseId;

    if (paymentId && userId && courseId) {
      const existing = await db.payment.findUnique({ where: { id: paymentId } });
      if (existing?.status !== "COMPLETED") {
        if (existing?.status === "PENDING") {
          const { completePendingPayment } = await import("@/lib/payments/activate-enrollment");
          await completePendingPayment(paymentId, userId);
        } else {
          await activateEnrollmentFromPayment({
            userId,
            courseId,
            amountCents: existing?.amountCents ?? checkoutSession.amount_total ?? 0,
            method: "STRIPE",
            stripeSessionId: checkoutSession.id,
            stripePaymentId:
              typeof checkoutSession.payment_intent === "string"
                ? checkoutSession.payment_intent
                : undefined,
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
