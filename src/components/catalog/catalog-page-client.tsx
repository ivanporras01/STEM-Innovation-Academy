"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CatalogProgramCard } from "@/components/catalog/catalog-program-card";
import {
  CATALOG_STATS,
  NOVA_PROGRAM_BUNDLES,
  NOVA_PROGRAM_CATALOG,
  type ProgramVertical,
} from "@/data/courses";
import { cn } from "@/lib/utils";
import { SaleTuitionDisplay } from "@/components/pricing/sale-price";
import { PageHero } from "@/components/ui/page-hero";

const FILTERS: { id: "all" | ProgramVertical; label: string }[] = [
  { id: "all", label: "All programs" },
  { id: "school", label: "NOVA School (9)" },
  { id: "college", label: "NOVA College (9)" },
  { id: "language", label: "NOVA Language (3)" },
];

export function CatalogPageClient() {
  const [filter, setFilter] = useState<"all" | ProgramVertical>("all");

  const programs = useMemo(() => {
    if (filter === "all") return NOVA_PROGRAM_CATALOG;
    return NOVA_PROGRAM_CATALOG.filter((p) => p.vertical === filter);
  }, [filter]);

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-deep-blue/50 via-transparent to-nova-orange/5" />
        <PageHero
          eyebrow="NOVA STEM HUB · Official Catalog"
          title={
            <>
              21 programs. One ecosystem.{" "}
              <span className="text-nova-cyan-light">Play to learn</span> — explore before you enroll.
            </>
          }
          titleClassName="max-w-3xl"
          subtitle={
            <>
              Every syllabus and outcome is public — no login required. Start with{" "}
              <strong className="text-nova-cyan-light">free demo missions</strong> on NOVA School electives,
              then unlock the full journey when you&apos;re ready.
            </>
          }
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { label: "Total programs", value: CATALOG_STATS.totalPrograms },
              { label: "School electives", value: CATALOG_STATS.school },
              { label: "College tracks", value: CATALOG_STATS.college },
              { label: "Languages", value: CATALOG_STATS.language },
            ].map((stat) => (
              <div key={stat.label} className="nova-glass-card border border-white/10 px-4 py-3 text-center">
                <p className="text-2xl font-black text-nova-cyan">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/downloads/NOVA-STEM-HUB-Program-Catalog.pdf"
              download
              className="nova-btn-primary nova-btn-glow inline-flex items-center gap-2 text-sm"
            >
              Download PDF Catalog (pricing &amp; syllabi)
            </a>
            <a
              href="/downloads/NOVA-STEM-HUB-Program-Catalog.html"
              target="_blank"
              rel="noopener noreferrer"
              className="nova-btn-secondary inline-flex border-white/20 text-sm text-white"
            >
              View HTML Catalog
            </a>
            <a
              href="/catalog/print"
              className="nova-btn-secondary inline-flex border-white/20 text-sm text-white"
            >
              Print / Save as PDF
            </a>
          </div>
        </PageHero>
      </section>

      <main className="nova-space-section flex-1">
        <div className="nova-container py-12">
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  filter === f.id
                    ? "border-nova-cyan bg-nova-cyan/15 text-nova-cyan-light"
                    : "border-white/15 text-white/70 hover:border-white/30 hover:text-white",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <CatalogProgramCard key={program.slug} program={program} />
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-black text-white">Bundle & save</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/65">
              Save on multi-program paths. Institutional licenses and scholarships available through NOVA
              Partnership and Scholarships.
            </p>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {NOVA_PROGRAM_BUNDLES.map((bundle) => (
                <div
                  key={bundle.slug}
                  className="nova-glass-island border-2 border-nova-cyan/25 p-6"
                >
                  <h3 className="text-lg font-bold text-white">{bundle.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{bundle.description}</p>
                  <p className="mt-4 text-2xl font-black text-nova-cyan">
                    <SaleTuitionDisplay listUsd={bundle.tuitionUsd} />
                  </p>
                  <p className="mt-1 text-xs text-nova-green">
                    Plus 50% sitewide sale on list price · save more vs individual enrollment
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="nova-glass-card mt-16 border border-white/10 p-6 sm:p-8">
            <h2 className="text-xl font-black text-white">How access works</h2>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Browse free",
                  body: "Compare programs, outcomes, and pricing — no account needed.",
                },
                {
                  step: "2",
                  title: "Play a demo",
                  body: "Jump into a free demo mission on select NOVA School tracks.",
                },
                {
                  step: "3",
                  title: "Enroll when ready",
                  body: "Create your Explorer account and unlock the full program.",
                },
                {
                  step: "4",
                  title: "Learn & certify",
                  body: "Missions, mentor support, and verifiable NOVA credentials.",
                },
              ].map((item) => (
                <li key={item.step} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="text-xs font-bold text-nova-cyan">Step {item.step}</span>
                  <p className="mt-1 font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/65">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/enroll" className="nova-btn-primary nova-btn-glow inline-flex text-sm">
                Enroll &amp; pay online
              </Link>
              <Link href="/register" className="nova-btn-secondary inline-flex border-white/20 text-sm text-white">
                Create Explorer account
              </Link>
              <Link href="/partnership/apply" className="nova-btn-secondary inline-flex border-white/20 text-sm text-white">
                Schools: apply here
              </Link>
              <Link href="/scholarships" className="nova-btn-secondary inline-flex border-white/20 text-sm text-white">
                Apply for scholarship
              </Link>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
