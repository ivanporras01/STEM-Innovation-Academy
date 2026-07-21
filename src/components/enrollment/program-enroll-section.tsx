import Link from "next/link";
import { EnrollButton } from "@/components/courses/enroll-button";
import { CertificatePreviewPromo } from "@/components/certificates/certificate-preview-promo";
import { FinalAssessmentPanel } from "@/components/certificates/final-assessment-panel";
import { SalePriceFromCents } from "@/components/pricing/sale-price";
import { resolveCertificateLocale } from "@/lib/certificates/locale";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NovaProgram } from "@/data/courses/types";
import { localizeProgram } from "@/lib/program-locale-copy";

type Props = {
  program: NovaProgram;
  courseId: string;
  courseSlug: string;
  priceCents: number;
  lmsHref?: string | null;
  justRegistered?: boolean;
};

export async function ProgramEnrollSection({
  program,
  courseId,
  courseSlug,
  priceCents,
  lmsHref,
  justRegistered = false,
}: Props) {
  const session = await auth();
  let enrolled = false;
  let pendingPayment = false;

  if (session?.user) {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
    });
    enrolled = hasCourseAccess(enrollment);
    pendingPayment = enrollment?.status === "PENDING_PAYMENT";
  }

  const registerHref = `/register?callbackUrl=${encodeURIComponent(`/enroll/${program.slug}`)}`;
  const loginHref = `/login?callbackUrl=${encodeURIComponent(`/enroll/${program.slug}`)}`;
  const certLocale = resolveCertificateLocale(courseSlug, program.slug);
  const copy = localizeProgram(program, "en");

  return (
    <section className="nova-glass-island border-2 border-nova-cyan/25 p-6 sm:p-8">
      {justRegistered && (
        <div className="mb-5 rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
          <strong className="text-white">Welcome, Explorer!</strong> Your account is ready — complete
          PayPal payment below to unlock this mission path.
        </div>
      )}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-nova-cyan">
        Enroll &amp; pay
      </p>
      <h2 className="mt-2 text-xl font-black text-white">{copy.title}</h2>
      <p className="mt-2 text-sm text-nova-cyan-light/85">
        Tuition:{" "}
        <SalePriceFromCents listCents={priceCents} className="align-middle" /> — pay with PayPal.
        Access unlocks when payment is confirmed (usually within 24 hours).
      </p>

      <ol className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { step: "1", title: "Create account", body: "Free Explorer registration" },
          { step: "2", title: "Pay with PayPal", body: "Send tuition + reference code" },
          { step: "3", title: "Start learning", body: "Full program access unlocked" },
        ].map((item) => (
          <li
            key={item.step}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm"
          >
            <span className="text-xs font-bold text-nova-cyan">Step {item.step}</span>
            <p className="font-semibold text-white">{item.title}</p>
            <p className="text-xs text-nova-cyan-light/70">{item.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {session ? (
          <EnrollButton
            courseId={courseId}
            courseSlug={courseSlug}
            courseTitle={copy.title}
            enrolled={enrolled}
            pendingPayment={pendingPayment}
            priceCents={priceCents}
            stripeAvailable={false}
          />
        ) : (
          <>
            <Link href={registerHref} className="nova-btn-primary nova-btn-glow inline-flex flex-wrap items-center gap-2">
              <span>Create account &amp; enroll —</span>
              <SalePriceFromCents listCents={priceCents} showBadge={false} />
            </Link>
            <Link href={loginHref} className="nova-btn-secondary border-white/20 text-white">
              Already have an account? Login
            </Link>
          </>
        )}
      </div>

      {!enrolled && (
        <div className="mt-8 border-t border-white/10 pt-8">
          <CertificatePreviewPromo programTitle={copy.title} locale={certLocale} compact />
        </div>
      )}

      {lmsHref && enrolled && (
        <p className="mt-4 text-sm text-nova-green">
          Your program is unlocked —{" "}
          <Link href={lmsHref} className="font-semibold underline">
            open curriculum &amp; missions
          </Link>
          {program.vertical === "college" && (
            <>
              {" "}
              ·{" "}
              <Link href={`/courses/${courseSlug}`} className="font-semibold underline">
                LMS progress
              </Link>
            </>
          )}
        </p>
      )}

      {enrolled && (
        <div className="mt-8 border-t border-white/10 pt-8">
          <FinalAssessmentPanel
            courseId={courseId}
            courseTitle={copy.title}
            courseSlug={courseSlug}
            locale={certLocale}
          />
        </div>
      )}
    </section>
  );
}
