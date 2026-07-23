import Link from "next/link";
import {
  PARTNERSHIP_APPLY_PATH,
  PARTNERSHIP_BENEFITS_EN,
  PARTNERSHIP_BENEFITS_ES,
  PARTNERSHIP_FAQ_EN,
  PARTNERSHIP_FAQ_ES,
  PARTNERSHIP_INCLUDES_EN,
  PARTNERSHIP_INCLUDES_ES,
} from "@/data/novahub/partnerships";
import { NOVA_COLLEGE, NOVA_SCHOOL, NOVA_STEM_HUB } from "@/lib/novahub-brand";
import type { AppLocale } from "@/lib/locale";
import { getCopyLocale } from "@/lib/locale";
import { PageHero } from "@/components/ui/page-hero";

const COPY = {
  en: {
    eyebrow: "B2B · Schools & Colleges",
    title: "NOVA Partnership",
    subtitle: "License our platform for your institution",
    description:
      "Bring NOVA School and NOVA College to your campus — ready-to-teach curriculum, licensed platform, facilitator guides, and verifiable certificates. No in-house STEM experts required.",
    metaLine: "Pilot-friendly · Human onboarding · Global access",
    registerCta: "Register your institution",
    benefitsTitle: `Why partner with ${NOVA_STEM_HUB.name}?`,
    benefitsSubtitle:
      "We help schools and colleges launch STEM employability programs without building everything from scratch.",
    includesTitle: "What your license includes",
    includesSubtitle: "Choose NOVA School, NOVA College, or both — scaled to your cohorts.",
    processTitle: "How partnership works",
    processSteps: [
      { step: "1", title: "Register", body: "Submit your institution details — we review within 5–7 business days." },
      { step: "2", title: "Discovery call", body: "We align on products, student count, hardware, and pilot timeline." },
      { step: "3", title: "Pilot launch", body: "Start with one elective or one college track, then scale institution-wide." },
      { step: "4", title: "Certify & grow", body: "Students earn verifiable NOVA certificates and you expand seat licenses." },
    ],
    faqTitle: "FAQ",
    ctaTitle: "Ready to bring NOVA to your institution?",
    ctaBody:
      "Register today and our partnerships team will contact you to design a pilot that fits your school or college.",
    exploreSchool: `Explore ${NOVA_SCHOOL.name}`,
    exploreCollege: `Explore ${NOVA_COLLEGE.name}`,
    spanishEdition: "Edición en Español",
  },
  es: {
    eyebrow: "B2B · Colegios e instituciones",
    title: "NOVA Partnership",
    subtitle: "Licencia nuestra plataforma para tu institución",
    description:
      "Lleva NOVA School y NOVA College a tu campus — currículo listo, plataforma licenciada, guías del facilitador y certificados verificables. Sin expertos STEM internos requeridos.",
    metaLine: "Piloto flexible · Onboarding humano · Acceso global",
    registerCta: "Registrar institución",
    benefitsTitle: `¿Por qué ser partner de ${NOVA_STEM_HUB.name}?`,
    benefitsSubtitle:
      "Ayudamos a colegios e institutos a lanzar programas STEM de empleabilidad sin construir todo desde cero.",
    includesTitle: "Qué incluye tu licencia",
    includesSubtitle: "Elige NOVA School, NOVA College o ambos — escalable a tus cohortes.",
    processTitle: "Cómo funciona el partnership",
    processSteps: [
      { step: "1", title: "Registro", body: "Envía los datos de tu institución — revisamos en 5–7 días hábiles." },
      { step: "2", title: "Llamada discovery", body: "Alineamos productos, cupos, hardware y cronograma del piloto." },
      { step: "3", title: "Lanzamiento piloto", body: "Empieza con una electiva o un track college, luego escala." },
      { step: "4", title: "Certifica y crece", body: "Tus estudiantes obtienen certificados NOVA verificables y amplías licencias." },
    ],
    faqTitle: "Preguntas frecuentes",
    ctaTitle: "¿Listo para traer NOVA a tu institución?",
    ctaBody:
      "Regístrate hoy y nuestro equipo de partnerships te contactará para diseñar un piloto a la medida.",
    exploreSchool: `Explorar ${NOVA_SCHOOL.name}`,
    exploreCollege: `Explorar ${NOVA_COLLEGE.name}`,
    spanishEdition: "English edition",
  },
} as const;

type Props = {
  locale?: AppLocale;
};

export function PartnershipPageContent({ locale = "en" }: Props) {
  const copy = COPY[getCopyLocale(locale)];
  const benefits = locale === "es" ? PARTNERSHIP_BENEFITS_ES : PARTNERSHIP_BENEFITS_EN;
  const includes = locale === "es" ? PARTNERSHIP_INCLUDES_ES : PARTNERSHIP_INCLUDES_EN;
  const faq = locale === "es" ? PARTNERSHIP_FAQ_ES : PARTNERSHIP_FAQ_EN;
  const applyPath = locale === "es" ? "/es/partnership/apply" : PARTNERSHIP_APPLY_PATH;
  const schoolPath = locale === "es" ? NOVA_SCHOOL.pathEs : NOVA_SCHOOL.path;
  const collegePath = locale === "es" ? NOVA_COLLEGE.pathEs : NOVA_COLLEGE.path;
  const altLocaleHref = locale === "es" ? "/partnership" : "/es/partnership";

  return (
    <>
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/15 via-transparent to-nova-orange/10" />
        <PageHero
          eyebrow={`✦ ${NOVA_STEM_HUB.name}`}
          title={copy.title}
          subtitle={copy.subtitle}
          description={copy.description}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-nova-orange/90">{copy.metaLine}</p>
          <Link href={applyPath} className="nova-btn-primary nova-btn-glow mt-4 inline-flex">
            {copy.registerCta}
          </Link>
        </PageHero>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-16">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">{copy.benefitsTitle}</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">{copy.benefitsSubtitle}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="nova-glass-card flex flex-col p-6">
                  <span className="text-2xl" aria-hidden>
                    {benefit.icon}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-nova-cyan-light/75">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">{copy.includesTitle}</h2>
            <p className="mb-8 text-sm text-nova-cyan-light/70">{copy.includesSubtitle}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {includes.map((block) => (
                <div key={block.product} className="nova-glass-island p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-nova-cyan">{block.product}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-nova-cyan-light/80">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-nova-cyan">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-8 text-xl font-bold text-white">{copy.processTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.processSteps.map((item) => (
                <div key={item.step} className="nova-glass-card p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-nova-cyan/20 text-sm font-bold text-nova-cyan">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-bold text-white">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.question} className="nova-glass-card">
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm text-nova-cyan-light/75">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="nova-glass-island border border-nova-cyan/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">{copy.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-nova-cyan-light/80">{copy.ctaBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={applyPath} className="nova-btn-primary nova-btn-glow inline-flex">
                {copy.registerCta}
              </Link>
              <Link href={schoolPath} className="nova-btn-secondary inline-flex border-white/20 text-white">
                {copy.exploreSchool}
              </Link>
              <Link
                href={collegePath}
                className="nova-btn-secondary inline-flex border-white/20 text-white/80"
              >
                {copy.exploreCollege}
              </Link>
              <Link href={altLocaleHref} className="nova-btn-secondary inline-flex border-white/20 text-white/60">
                {copy.spanishEdition}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
