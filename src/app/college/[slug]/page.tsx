import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  NOVA_COLLEGE,
  QUANTUM_WORKFORCE,
  NOVAHUB,
  getNovaCollegeCourseBySlug,
  novaCollegeCourses,
} from "@/lib/novahub";
import { getCollegeTrackEn, NOVA_COLLEGE_PAGE_EN } from "@/data/nova-college/catalog-en";
import { NOVAHUB_IMPACT } from "@/lib/novahub-impact";
import { CertificatePreviewPromo } from "@/components/certificates/certificate-preview-promo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return novaCollegeCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getNovaCollegeCourseBySlug(slug);
  if (!course) return { title: "Track not found" };

  const en = getCollegeTrackEn(slug);
  return {
    title: `${en?.title ?? course.title} | ${NOVA_COLLEGE.name}`,
    description: en?.description ?? course.description,
  };
}

export default async function CollegeTrackPage({ params }: Props) {
  const { slug } = await params;
  const course = getNovaCollegeCourseBySlug(slug);
  if (!course) notFound();

  const en = getCollegeTrackEn(slug);
  const isAdvanced = course.tier === "advanced";
  const qwaDelivery = course.contentDelivery;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-14 text-white">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${isAdvanced ? "from-nova-orange/15" : "from-nova-cyan/10"} via-transparent to-transparent`}
        />
        <div className="nova-container relative">
          <Link
            href={NOVA_COLLEGE.path}
            className="mb-4 inline-block text-sm text-nova-cyan-light/70 hover:text-white"
          >
            ← {NOVA_COLLEGE.name}
          </Link>
          <div className="mb-3 flex flex-wrap gap-2">
            {isAdvanced ? (
              <span className="rounded-full border border-nova-orange/40 bg-nova-orange/15 px-3 py-1 text-xs font-bold uppercase text-nova-orange">
                Tier 2 · Advanced
              </span>
            ) : (
              <span className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-3 py-1 text-xs font-bold uppercase text-nova-cyan-light">
                Tier 1 · Entry
              </span>
            )}
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-nova-cyan-light/70">
              {course.durationHours}h · {course.modules.length} modules
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/50">
              {course.verifyCertificatePrefix}
            </span>
          </div>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{en?.title ?? course.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-nova-cyan-light/90">{en?.tagline ?? course.tagline}</p>
          <p className="mt-4 max-w-3xl text-sm text-white/75">{en?.description ?? course.description}</p>
          <Link
            href={`/es/college/${slug}`}
            className="mt-4 inline-block text-sm text-nova-cyan-light/60 hover:text-nova-cyan"
          >
            Full syllabus in Spanish edition →
          </Link>
        </div>
      </section>

      <main className="nova-space-section relative flex-1">
        <div className="nova-container space-y-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="nova-glass-island lg:col-span-2">
              <h2 className="text-lg font-bold text-white">Learning outcomes</h2>
              <ul className="mt-4 space-y-2 text-sm text-nova-cyan-light/85">
                {course.learningOutcomes.slice(0, 8).map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span className="text-nova-cyan">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="space-y-4">
              <div className="nova-glass-island">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
                  Certifications
                </h2>
                <ul className="mt-3 space-y-1 text-sm text-nova-cyan-light/80">
                  {course.certificationAlignment.primary.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>
              {course.prerequisites.length > 0 && (
                <div className="nova-glass-island">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-nova-cyan">
                    Prerequisites
                  </h2>
                  <ul className="mt-3 space-y-1 text-sm text-nova-cyan-light/80">
                    {course.prerequisites.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>

          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Program structure</h2>
            <p className="mb-6 text-sm text-nova-cyan-light/70">
              {course.modules.length} modules · {course.durationHours} contact hours ·{" "}
              {NOVA_COLLEGE_PAGE_EN.syllabusNote}
            </p>
            <div className="space-y-4">
              {course.modules.map((mod) => (
                <article key={mod.order} className="nova-glass-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-nova-cyan/70">
                        Module {mod.order}
                      </p>
                      <p className="mt-1 text-sm text-nova-cyan-light/60">
                        {mod.lessons.length} lessons · lab included
                      </p>
                    </div>
                    <span className="text-xs text-nova-cyan-light/60">{mod.contactHours}h contact</span>
                  </div>
                </article>
              ))}
            </div>
            <Link
              href={`/es/college/${slug}`}
              className="mt-6 inline-flex text-sm font-semibold text-nova-cyan hover:underline"
            >
              View full syllabus & lessons (Spanish edition) →
            </Link>
          </section>

          <section className="nova-glass-island">
            <h2 className="text-lg font-bold text-white">Capstone project</h2>
            <p className="mt-2 text-sm text-nova-cyan-light/70">
              Details in the{" "}
              <Link href={`/es/college/${slug}`} className="text-nova-cyan hover:underline">
                Spanish edition syllabus
              </Link>
              .
            </p>
          </section>

          <section className="nova-glass-island flex flex-col gap-4 border-nova-orange/20 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-nova-orange">
                Need financial support?
              </p>
              <p className="mt-1 text-white">
                Apply for a {NOVAHUB.name} scholarship for this track — human review, no automatic
                guarantee.
              </p>
            </div>
            <Link
              href={`${NOVAHUB_IMPACT.applyPath}?program=${isAdvanced ? "beca-quantum" : "techhub-beca"}`}
              className="nova-btn-primary nova-btn-glow shrink-0 bg-nova-orange hover:bg-nova-orange/90"
            >
              Apply for scholarship
            </Link>
          </section>

          {qwaDelivery && (
            <section className="nova-glass-island text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-nova-orange">
                {NOVA_COLLEGE.name} · {QUANTUM_WORKFORCE.programLabel}
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm text-nova-cyan-light/80">
                This track is part of {NOVA_COLLEGE.name}. Interactive simulators, Bloch sphere,
                and Qiskit labs run in the {QUANTUM_WORKFORCE.shortName} delivery app (English).
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={qwaDelivery.appBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nova-btn-primary nova-btn-glow inline-flex bg-nova-orange hover:bg-nova-orange/90"
                >
                  Open {QUANTUM_WORKFORCE.shortName} delivery app ↗
                </a>
              </div>
            </section>
          )}

          <section className="mb-12">
            <CertificatePreviewPromo
              programTitle={en?.title ?? course.title}
              locale="en"
            />
          </section>

          <section className="text-center">
            <p className="text-sm text-nova-cyan-light/60">
              Verifiable certificate · {course.verifyCertificatePrefix} ·{" "}
              <Link href={NOVAHUB_IMPACT.verifyPath} className="text-nova-cyan hover:underline">
                Verify certificate
              </Link>
            </p>
            <Link
              href="/partnership"
              className="nova-btn-secondary mt-4 inline-flex border-white/20 text-white"
            >
              Partner as an institution
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
