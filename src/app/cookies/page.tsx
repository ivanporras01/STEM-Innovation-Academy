import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: "NOVA STEM HUB cookie policy — how we use cookies and similar technologies on our platform.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <main className="nova-page-main flex-1 py-12">
        <div className="nova-container max-w-3xl">
          <article className="nova-glass-island p-8 sm:p-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Cookie Policy</h1>
            <p className="mt-2 text-sm text-nova-cyan-light/70">Effective Date: January 1, 2026</p>

            <section className="mt-8 space-y-6 text-sm leading-relaxed text-nova-cyan-light/85">
              <div>
                <h2 className="text-lg font-semibold text-white">1. What Are Cookies</h2>
                <p className="mt-2">
                  Cookies are small text files stored on your device when you visit a website. They help
                  websites function properly, improve user experience, and provide useful analytics.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">2. How We Use Cookies</h2>
                <p className="mt-2">
                  NOVA STEM HUB uses cookies to keep you signed in, remember your preferences, understand
                  how you use our platform, and deliver relevant content and communications.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">3. Types of Cookies We Use</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>
                    <strong className="text-white">Essential cookies:</strong> Required for the platform
                    to function, including authentication and security.
                  </li>
                  <li>
                    <strong className="text-white">Preference cookies:</strong> Remember your language,
                    accessibility settings, and other choices.
                  </li>
                  <li>
                    <strong className="text-white">Analytics cookies:</strong> Help us understand how
                    visitors interact with the site so we can improve it.
                  </li>
                  <li>
                    <strong className="text-white">Marketing cookies:</strong> Used to deliver relevant
                    promotions and measure their effectiveness. These are only set with your consent.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">4. Managing Cookies</h2>
                <p className="mt-2">
                  You can manage or delete cookies through your browser settings. Please note that
                  disabling essential cookies may affect platform functionality.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">5. Third-Party Services</h2>
                <p className="mt-2">
                  We may use trusted third-party services (such as analytics and payment processors) that
                  place their own cookies. These providers are bound by their own privacy and cookie
                  policies.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">6. Contact Us</h2>
                <p className="mt-2">
                  If you have questions about our Cookie Policy, contact us at privacy@novastemhub.education.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      </div>
  );
}
