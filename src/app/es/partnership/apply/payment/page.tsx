import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PartnershipPaymentForm } from "@/components/partnerships/partnership-payment-form";
import { db } from "@/lib/db";
import { estimatePartnershipDepositCents } from "@/lib/partnerships/deposit";
import { buildPageMetadata } from "@/lib/seo";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = buildPageMetadata({
  title: "Pago del Partnership — NOVA STEM HUB",
  description:
    "Completa el depósito de licencia institucional después del registro de partnership.",
  path: "/es/partnership/apply/payment",
  locale: "es",
  noIndex: true,
});

type Props = {
  searchParams: Promise<{
    applicationId?: string;
    paid?: string;
    cancelled?: string;
    session_id?: string;
  }>;
};

export default async function SpanishPartnershipPaymentPage({ searchParams }: Props) {
  const params = await searchParams;
  const applicationId = params.applicationId;

  if (!applicationId) {
    redirect("/es/partnership/apply");
  }

  const application = await db.partnershipApplication.findUnique({
    where: { id: applicationId },
    select: {
      id: true,
      institutionName: true,
      email: true,
      paymentMethod: true,
      paymentStatus: true,
      contractTerm: true,
      estimatedStudents: true,
      budgetRange: true,
    },
  });

  if (!application) notFound();

  let paidReturn = params.paid === "1";

  if (params.session_id && isStripeConfigured() && application.paymentStatus !== "COMPLETED") {
    const stripe = getStripe()!;
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(params.session_id);
      if (
        checkoutSession.metadata?.partnershipApplicationId === application.id &&
        checkoutSession.payment_status === "paid"
      ) {
        await db.partnershipApplication.update({
          where: { id: application.id },
          data: {
            paymentStatus: "COMPLETED",
            paymentNotes: `Stripe ${checkoutSession.id}`,
          },
        });
        paidReturn = true;
      }
    } catch (err) {
      console.error("[partnership-payment-page-es]", err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-space-section flex-1 py-12">
        <div className="nova-container">
          <Link
            href="/es/partnership/apply"
            className="mb-6 inline-block text-sm text-nova-cyan hover:underline"
          >
            ← Solicitud de partnership
          </Link>
          <PartnershipPaymentForm
            application={{
              ...application,
              depositCents: estimatePartnershipDepositCents(application),
            }}
            locale="es"
            stripeAvailable={isStripeConfigured()}
            paidReturn={paidReturn}
            cancelled={params.cancelled === "1"}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
