import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "NOVA STEM HUB terms of service — rules and conditions for using our platform and educational programs.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <main className="nova-page-main flex-1 py-12">
        <div className="nova-container max-w-3xl">
          <article className="nova-glass-island p-8 sm:p-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Terms of Service</h1>
            <p className="mt-2 text-sm text-nova-cyan-light/70">Effective Date: January 1, 2026</p>

            <section className="mt-8 space-y-6 text-sm leading-relaxed text-nova-cyan-light/85">
              <div>
                <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
                <p className="mt-2">
                  By accessing or using NOVA STEM HUB, you agree to be bound by these Terms of Service.
                  If you do not agree, please do not use our platform.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">2. Educational Services</h2>
                <p className="mt-2">
                  NOVA STEM HUB provides online STEM education programs, language courses, and related
                  learning resources for individuals and institutions. Course access is granted upon
                  enrollment and payment confirmation.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">3. User Accounts</h2>
                <p className="mt-2">
                  You are responsible for maintaining the confidentiality of your account credentials and
                  for all activities that occur under your account. Provide accurate and complete
                  information when registering.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">4. Payments and Refunds</h2>
                <p className="mt-2">
                  Tuition and fees are listed on each program page. Payments are processed securely. Refund
                  and cancellation policies are described at checkout and in program-specific terms.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">5. Intellectual Property</h2>
                <p className="mt-2">
                  All content, trademarks, logos, course materials, and technology on NOVA STEM HUB are
                  the property of NOVA STEM HUB or its licensors. You may not reproduce, distribute, or
                  create derivative works without written permission.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">6. Prohibited Conduct</h2>
                <p className="mt-2">
                  Users may not misuse the platform, harass others, share account access, attempt to
                  circumvent security, or upload harmful content. Violations may result in account
                  termination.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">7. Limitation of Liability</h2>
                <p className="mt-2">
                  NOVA STEM HUB is not liable for indirect, incidental, or consequential damages arising
                  from your use of the platform. Our total liability is limited to the amount paid for the
                  specific service giving rise to the claim.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">8. Changes to Terms</h2>
                <p className="mt-2">
                  We may update these Terms from time to time. Continued use of the platform after changes
                  constitutes acceptance of the revised Terms.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">9. Contact Us</h2>
                <p className="mt-2">
                  For questions about these Terms, contact us at legal@novastemhub.education or through
                  the Contact page.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      </div>
  );
}
