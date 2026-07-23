import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { CertificatePreviewPromo } from "@/components/certificates/certificate-preview-promo";
import { NovaLogo } from "@/components/ui/nova-logo-mark";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Register — ${NOVA_STEM_HUB.name}`,
  description:
    "Complete NOVA Explorer registration with student profile, emergency contact, guardian info, and academic background.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="nova-page-main flex-1 py-12">
        <div className="nova-container max-w-6xl">
          <div className="grid items-start gap-10 xl:grid-cols-[1fr_1.05fr]">
            <div className="order-2 xl:order-1">
              <div className="nova-glass-island shadow-nova p-6 sm:p-8">
                <div className="mb-8 text-center xl:text-left">
                  <div className="mb-3 flex justify-center xl:justify-start">
                    <NovaLogo size="sm" showText={true} />
                  </div>
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Create your account
                  </h1>
                  <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80 xl:mx-0">
                    Create your NOVA Explorer account with the full profile schools and colleges require
                    — then enroll and pay for your programs online.
                  </p>
                </div>
                <Suspense fallback={<p className="text-center text-nova-cyan-light/70">Loading form…</p>}>
                  <RegisterForm />
                </Suspense>
              </div>
            </div>
            <div className="order-1 xl:order-2 xl:sticky xl:top-24">
              <CertificatePreviewPromo />
            </div>
          </div>
        </div>
      </main>
      </div>
  );
}
