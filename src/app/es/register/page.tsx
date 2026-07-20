import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RegisterForm } from "@/components/auth/register-form";
import { CertificatePreviewPromo } from "@/components/certificates/certificate-preview-promo";
import { NovaHeroLogoMark } from "@/components/ui/nova-logo-mark";
import { NOVA_SCHOOL } from "@/lib/nova-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Registro — ${NOVA_SCHOOL.portalName}`,
  description:
    "Completa el registro NOVA Explorer con perfil del estudiante, contacto de emergencia, tutor y antecedentes académicos.",
  path: "/es/register",
  locale: "es",
  noIndex: true,
});

export default function SpanishRegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-page-main flex-1 py-12">
        <div className="nova-container max-w-6xl">
          <div className="grid items-start gap-10 xl:grid-cols-[1fr_1.05fr]">
            <div className="order-2 xl:order-1">
              <div className="nova-glass-island shadow-nova p-6 sm:p-8">
                <div className="mb-8 text-center xl:text-left">
                  <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/10 ring-1 ring-nova-cyan/30">
                    <NovaHeroLogoMark className="h-10 w-10 min-h-10 min-w-10 sm:h-11 sm:w-11 sm:min-h-11 sm:min-w-11" />
                  </span>
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Completa el registro del estudiante
                  </h1>
                  <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80 xl:mx-0">
                    Crea tu cuenta NOVA Explorer con el perfil completo que escuelas y colegios
                    requieren — luego inscríbete y paga tus programas en línea.
                  </p>
                </div>
                <Suspense fallback={<p className="text-center text-nova-cyan-light/70">Cargando formulario…</p>}>
                  <RegisterForm />
                </Suspense>
              </div>
            </div>
            <div className="order-1 xl:order-2 xl:sticky xl:top-24">
              <CertificatePreviewPromo locale="es" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
