import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCourseProduct } from "@/lib/course-products";
import { notifyAdminPendingPayment } from "@/lib/email";
import { isStudentPaymentMethod } from "@/lib/payments/payment-methods";
import { salePriceCents } from "@/lib/pricing";
import { getStripe, getSiteUrl, isStripeConfigured } from "@/lib/stripe";
import type { PaymentMethod } from "@prisma/client";

function buildReference(paymentId: string): string {
  return `NOVA-${paymentId.slice(-8).toUpperCase()}`;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { courseId, method: rawMethod, reference, notes } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 });
    }

    const method = (rawMethod ?? "PAYPAL") as PaymentMethod;
    if (!isStudentPaymentMethod(method)) {
      return NextResponse.json(
        { error: "Invalid payment method for student checkout" },
        { status: 400 }
      );
    }

    const course = await db.course.findUnique({
      where: { id: courseId, published: true },
    });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const existing = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
    });
    if (existing?.status === "ACTIVE" || existing?.status === "INSTITUTIONAL") {
      return NextResponse.json(
        { error: "Already enrolled on this mission path" },
        { status: 409 }
      );
    }

    const product = await getCourseProduct(course.id);
    if (!product?.active) {
      return NextResponse.json(
        { error: "This mission path is not available for checkout" },
        { status: 409 }
      );
    }
    const chargeCents = salePriceCents(product.priceCents);

    if (chargeCents <= 0) {
      const enrollment = await db.enrollment.upsert({
        where: { userId_courseId: { userId: session.user.id, courseId } },
        update: { status: "ACTIVE" },
        create: { userId: session.user.id, courseId, status: "ACTIVE" },
      });
      return NextResponse.json({ success: true, enrolled: true, enrollmentId: enrollment.id });
    }

    const paymentNotes = [reference && `Ref: ${reference}`, notes].filter(Boolean).join(" · ");

    // Manual payment methods — PayPal (and legacy Zelle/Venmo/Other if re-enabled)
    if (method !== "STRIPE") {
      const payment = await db.payment.create({
        data: {
          userId: session.user.id,
          courseId,
          amountCents: chargeCents,
          currency: product.currency,
          method,
          status: "PENDING",
          notes: paymentNotes || undefined,
        },
      });

      await db.enrollment.upsert({
        where: { userId_courseId: { userId: session.user.id, courseId } },
        update: { status: "PENDING_PAYMENT", paymentId: payment.id },
        create: {
          userId: session.user.id,
          courseId,
          status: "PENDING_PAYMENT",
          paymentId: payment.id,
        },
      });

      const reference = buildReference(payment.id);

      // Soft-fail: checkout succeeds even if admin notify email fails
      await notifyAdminPendingPayment({
        studentName: session.user.name || `${session.user.firstName} ${session.user.lastName}`.trim(),
        studentEmail: session.user.email,
        courseTitle: course.title,
        amountCents: chargeCents,
        reference,
        method,
      });

      return NextResponse.json({
        pending: true,
        paymentId: payment.id,
        reference,
        amountCents: chargeCents,
        listPriceCents: product.priceCents,
        courseSlug: course.slug,
        courseTitle: course.title,
        method,
      });
    }

    // Card checkout via Stripe (not offered in student UI while PayPal-only)
    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    if (stripe && isStripeConfigured()) {
      const payment = await db.payment.create({
        data: {
          userId: session.user.id,
          courseId,
          amountCents: chargeCents,
          currency: product.currency,
          method: "STRIPE",
          status: "PENDING",
          notes: paymentNotes || undefined,
        },
      });

      await db.enrollment.upsert({
        where: { userId_courseId: { userId: session.user.id, courseId } },
        update: { status: "PENDING_PAYMENT", paymentId: payment.id },
        create: {
          userId: session.user.id,
          courseId,
          status: "PENDING_PAYMENT",
          paymentId: payment.id,
        },
      });

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: session.user.email,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: product.currency,
              unit_amount: chargeCents,
              product_data: {
                name: course.title,
                description: `NOVA Mission Path — ${course.title}`,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          paymentId: payment.id,
          userId: session.user.id,
          courseId,
        },
        success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/courses/${course.slug}?checkout=cancelled`,
      });

      await db.payment.update({
        where: { id: payment.id },
        data: { stripeSessionId: checkoutSession.id },
      });

      return NextResponse.json({ stripe: true, url: checkoutSession.url });
    }

    // Demo checkout is local-only. Hosted environments must never mint a
    // payment that the Explorer can confirm without a payment provider.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Card checkout is temporarily unavailable" },
        { status: 503 }
      );
    }

    // Local demo card checkout when Stripe is not configured
    const payment = await db.payment.create({
      data: {
        userId: session.user.id,
        courseId,
        amountCents: chargeCents,
        currency: product.currency,
        method: "STRIPE",
        status: "PENDING",
        notes: "Demo card checkout — auto-confirm in dev",
      },
    });

    await db.enrollment.upsert({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      update: { status: "PENDING_PAYMENT", paymentId: payment.id },
      create: {
        userId: session.user.id,
        courseId,
        status: "PENDING_PAYMENT",
        paymentId: payment.id,
      },
    });

    return NextResponse.json({
      demo: true,
      paymentId: payment.id,
      amountCents: chargeCents,
      courseSlug: course.slug,
      courseTitle: course.title,
    });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
