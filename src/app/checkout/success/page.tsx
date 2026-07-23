import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { completePendingPayment } from "@/lib/payments/activate-enrollment";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/checkout/success");

  const { session_id: stripeSessionId } = await searchParams;
  let courseTitle: string | null = null;
  let courseSlug: string | null = null;
  let activated = false;

  if (stripeSessionId && isStripeConfigured()) {
    const stripe = getStripe()!;
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(stripeSessionId);
      const paymentId = checkoutSession.metadata?.paymentId;
      const userId = checkoutSession.metadata?.userId;
      const courseId = checkoutSession.metadata?.courseId;

      if (
        paymentId &&
        userId === session.user.id &&
        courseId &&
        checkoutSession.payment_status === "paid"
      ) {
        const existing = await db.payment.findUnique({ where: { id: paymentId } });
        if (existing?.status !== "COMPLETED") {
          await completePendingPayment(paymentId, session.user.id);
        }
        activated = true;

        const course = await db.course.findUnique({
          where: { id: courseId },
          select: { title: true, slug: true },
        });
        courseTitle = course?.title ?? null;
        courseSlug = course?.slug ?? null;
      }
    } catch (err) {
      console.error("[checkout-success]", err);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="nova-page-main flex flex-1 items-center justify-center py-12">
        <div className="nova-container max-w-lg text-center">
          <div className="nova-glass-island shadow-nova p-8">
            <div className="mb-4 text-5xl">🚀</div>
            <h1 className="text-2xl font-bold text-white">
              {activated ? "Mission Path Unlocked!" : "Welcome back, Explorer"}
            </h1>
            <p className="mt-3 text-nova-cyan-light/85">
              {activated && courseTitle ? (
                <>
                  Payment confirmed — <strong className="text-white">{courseTitle}</strong> is
                  ready. Your crew is cheering you on. Launch your first mission when you&apos;re
                  ready!
                </>
              ) : (
                <>Your enrollment is being processed. Check your Explorer Portal for active paths.</>
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {courseSlug ? (
                <Link href={`/courses/${courseSlug}`} className="nova-btn-primary">
                  Go to mission path
                </Link>
              ) : null}
              <Link href="/dashboard/student" className="nova-btn-secondary">
                Explorer Portal
              </Link>
            </div>
          </div>
        </div>
      </main>
      </div>
  );
}
