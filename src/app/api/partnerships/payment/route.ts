import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enforceRateLimit } from "@/lib/api-rate-limit";
import {
  buildPartnershipReference,
  estimatePartnershipDepositCents,
} from "@/lib/partnerships/deposit";
import { isInstitutionPaymentMethod } from "@/lib/payments/payment-methods";
import { getStripe, getSiteUrl, isStripeConfigured } from "@/lib/stripe";
import type { PaymentMethod } from "@prisma/client";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "partnerships-payment", 10, 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { applicationId, reference, notes } = body as {
      applicationId?: string;
      reference?: string;
      notes?: string;
    };

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
      return NextResponse.json({ error: "Payment already completed" }, { status: 409 });
    }

    const method = (application.paymentMethod ?? "WIRE_TRANSFER") as PaymentMethod;
    if (!isInstitutionPaymentMethod(method)) {
      return NextResponse.json({ error: "Invalid payment method on application" }, { status: 400 });
    }

    const amountCents = estimatePartnershipDepositCents(application);
    const refCode = buildPartnershipReference(application.id);
    const paymentNotes = [
      reference && `Ref: ${reference}`,
      notes,
      `Deposit reference: ${refCode}`,
    ]
      .filter(Boolean)
      .join(" · ");

    if (method === "STRIPE") {
      const stripe = getStripe();
      const siteUrl = getSiteUrl();
      const localePrefix = application.locale === "es" ? "/es" : "";
      const returnPath = `${localePrefix}/partnership/apply/payment?applicationId=${application.id}`;

      if (stripe && isStripeConfigured()) {
        const checkoutSession = await stripe.checkout.sessions.create({
          mode: "payment",
          customer_email: application.email,
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                unit_amount: amountCents,
                product_data: {
                  name: `NOVA Partnership deposit — ${application.institutionName}`,
                  description: "Institutional licensing pilot deposit",
                },
              },
              quantity: 1,
            },
          ],
          metadata: {
            partnershipApplicationId: application.id,
            reference: refCode,
          },
          success_url: `${siteUrl}${returnPath}&paid=1&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${siteUrl}${returnPath}&cancelled=1`,
        });

        await db.partnershipApplication.update({
          where: { id: application.id },
          data: {
            paymentNotes: paymentNotes || `Stripe session ${checkoutSession.id}`,
          },
        });

        return NextResponse.json({ stripe: true, url: checkoutSession.url });
      }

      // Stripe is not configured yet — record a manual pending confirmation instead.
      await db.partnershipApplication.update({
        where: { id: application.id },
        data: {
          paymentStatus: "PENDING",
          paymentNotes: paymentNotes || `Stripe requested but not configured — ${refCode}`,
        },
      });

      return NextResponse.json({
        pending: true,
        reference: refCode,
        amountCents,
        method,
        institutionName: application.institutionName,
      });
    }

    await db.partnershipApplication.update({
      where: { id: application.id },
      data: {
        paymentStatus: "PENDING",
        paymentNotes: paymentNotes || `Pending ${method} — ${refCode}`,
      },
    });

    return NextResponse.json({
      pending: true,
      reference: refCode,
      amountCents,
      method,
      institutionName: application.institutionName,
    });
  } catch (err) {
    console.error("[partnership-payment]", err);
    return NextResponse.json({ error: "Payment submission failed" }, { status: 500 });
  }
}
