import type { Metadata } from "next";
import Link from "next/link";
import { NOVA_PROGRAM_CATALOG } from "@/data/courses";
import { PARTNERSHIP_APPLY_PATH } from "@/data/novahub/partnerships";
import { buildPageMetadata } from "@/lib/seo";
import { enrollPathForProgram } from "@/lib/program-enrollment";
import { WhyNovaBlock } from "@/components/why-nova";
import { localizeProgram } from "@/lib/program-locale-copy";
import { PageHero } from "@/components/ui/page-hero";
import { CertificatePreviewPromo } from "@/components/certificates/certificate-preview-promo";
import { SaleTuitionDisplay } from "@/components/pricing/sale-price";
import { ArrowRight, Building2, GraduationCap, UserPlus } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Enroll — Students & Schools",
  description:
    "Register as a NOVA Explorer, request enrollment in programs, and get next steps. Schools and colleges can apply for institutional licensing.",
  path: "/enroll",
});

export default function EnrollHubPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  return (
    <EnrollHubContent searchParams={searchParams} />
  );
}

async function EnrollHubContent({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;
  const showRegisteredBanner = registered === "1";

  return (
    <div className="flex flex-1 flex-col">
      <section className="nova-section-cosmic border-b border-white/10 py-16 text-white">
        <PageHero
          eyebrow="NOVA STEM HUB · Enrollment"
          title="Enroll"
          subtitle="Individual Explorers create a free account, choose a program, and submit an enrollment request. Schools and colleges register through NOVA Partnership for bulk student access."
        />
      </section>

      <main className="nova-space-section flex-1 py-12">
        <div className="nova-container">
          {showRegisteredBanner && (
            <div className="mb-8 rounded-xl border border-nova-green/30 bg-nova-green/10 px-5 py-4 text-sm text-nova-green">
              <strong className="text-white">Account created!</strong> Choose a program below and
              submit your enrollment request to start your mission path.
            </div>
          )}
          <CertificatePreviewPromo className="mb-10" />

          <div className="grid gap-8 lg:grid-cols-2">
            <article className="nova-glass-island border-2 border-nova-cyan/30 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-nova-cyan/15 text-nova-cyan">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black text-white">For students &amp; families</h2>
              <p className="mt-3 text-sm leading-relaxed text-nova-cyan-light/85">
                Create your free Explorer account, pick any program from the catalog, and submit your
                enrollment request. Your courses unlock after our team reviews your request and your
                payment arrangement is confirmed.
              </p>
              <ol className="mt-5 space-y-2 text-sm text-white/80">
                <li>1. <Link href="/register" className="text-nova-cyan hover:underline">Register free</Link> and choose your program</li>
                <li>2. Select a track below or browse the full <Link href="/catalog" className="text-nova-cyan hover:underline">catalog</Link></li>
                <li>3. Submit your enrollment request and unlock your mission path</li>
              </ol>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/register" className="nova-btn-primary nova-btn-glow inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create Explorer account
                </Link>
                <Link href="/catalog" className="nova-btn-secondary inline-flex border-white/20 text-white">
                  Browse 21 programs
                </Link>
              </div>
            </article>

            <article className="nova-glass-island border-2 border-nova-orange/30 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-nova-orange/15 text-nova-orange">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black text-white">For schools &amp; colleges</h2>
              <p className="mt-3 text-sm leading-relaxed text-nova-cyan-light/85">
                Register your institution, tell us your preferred payment arrangement (card, wire
                transfer, Zelle, Venmo, or custom), and once your contract is approved we bulk-enroll
                your students with full program access.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={PARTNERSHIP_APPLY_PATH}
                  className="nova-btn-primary inline-flex items-center gap-2 bg-nova-orange hover:bg-nova-orange/90"
                >
                  Apply as institution
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/partnership" className="nova-btn-secondary inline-flex border-white/20 text-white">
                  Partnership overview
                </Link>
              </div>
            </article>
          </div>

          <section className="mt-14">
            <h2 className="text-xl font-black text-white">Enroll in a program</h2>
            <p className="mt-2 text-sm text-nova-cyan-light/80">
              Select a program to register and request enrollment. Tuition shown reflects 50% off list
              price; payment instructions will be provided after your request is reviewed.
              Institutional licensing uses the partnership application flow.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NOVA_PROGRAM_CATALOG.map((program) => {
                const copy = localizeProgram(program, "en");
                return (
                <Link
                  key={program.slug}
                  href={enrollPathForProgram(program.slug)}
                  className="nova-glass-card flex items-center justify-between gap-3 transition hover:border-nova-cyan/40"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{copy.title}</p>
                    <p className="text-xs text-nova-cyan-light/70">
                      <SaleTuitionDisplay listUsd={program.tuitionUsd} showBadge={false} />
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-nova-cyan" />
                </Link>
              );
              })}
            </div>
          </section>
        </div>
        <WhyNovaBlock />
      </main>

      </div>
  );
}
