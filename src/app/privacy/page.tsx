import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "NOVA STEM HUB privacy policy — how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <main className="nova-page-main flex-1 py-12">
        <div className="nova-container max-w-3xl">
          <article className="nova-glass-island p-8 sm:p-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Privacy Policy</h1>
            <p className="mt-2 text-sm text-nova-cyan-light/70">Effective Date: January 1, 2026</p>

            <section className="mt-8 space-y-6 text-sm leading-relaxed text-nova-cyan-light/85">
              <div>
                <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
                <p className="mt-2">
                  NOVA STEM HUB (“we,” “us,” or “our”) is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and safeguard your information
                  when you use our website, learning platform, and related services.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">2. Information We Collect</h2>
                <p className="mt-2">
                  We collect information you provide directly to us, such as your name, email address,
                  contact details, academic background, and payment information. We also collect usage
                  data, device information, and cookies as described in our Cookie Policy.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">3. How We Use Your Information</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Provide and manage educational programs, courses, and certificates.</li>
                  <li>Process enrollments, payments, and institutional partnerships.</li>
                  <li>Communicate with you about programs, support, and updates.</li>
                  <li>Improve our platform, content, and user experience.</li>
                  <li>Comply with legal obligations and protect our rights.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">4. Sharing Your Information</h2>
                <p className="mt-2">
                  We do not sell your personal information. We may share data with trusted service
                  providers, institutional partners (with consent), and when required by law.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">5. Data Security</h2>
                <p className="mt-2">
                  We implement industry-standard technical and organizational measures to protect your
                  data. However, no system is completely secure, and we cannot guarantee absolute
                  security.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">6. Your Rights</h2>
                <p className="mt-2">
                  Depending on your location, you may have rights to access, correct, delete, or restrict
                  the use of your personal data. Contact us to exercise these rights.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">7. Contact Us</h2>
                <p className="mt-2">
                  If you have questions about this Privacy Policy, please contact us through the Contact
                  page or at privacy@novastemhub.education.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      </div>
  );
}
