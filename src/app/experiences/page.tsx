import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EXPERIENCES } from "@/lib/experiences/catalog";
import { PathwayIcon } from "@/components/ui/pathway-icon";

export const metadata: Metadata = {
  title: "NOVA Mission Board",
  description: "Interactive mission-based STEM adventures with your NOVA Buddy.",
};

export default function ExperiencesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-nova-deep-blue via-[#0b1a3b] to-[#103663] py-20 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-nova-cyan/30 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
          </div>
          <div className="nova-container relative text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-nova-cyan">
              NOVA Mission Board
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Choose Your Next Mission
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
              Choose from <strong className="text-white">20 NOVA Buddies</strong> — Friendly
              Explorers for middle school and Pro Explorers for high school. Your companion
              guides every quest, discovery, and breakthrough.
            </p>
          </div>
        </section>

        <section className="nova-container py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {EXPERIENCES.map((exp) => (
              <article
                key={exp.slug}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-nova-light-gray bg-white shadow-nova transition hover:-translate-y-1 hover:shadow-nova-lg"
              >
                <div
                  className="relative p-8 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${exp.accent}, ${exp.accentSecondary})`,
                  }}
                >
                  <PathwayIcon pathway={exp.pathway} variant="card" />
                  <p className="mt-4 text-xs font-black uppercase tracking-wider opacity-90">
                    {exp.labCode}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{exp.title}</h2>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs font-bold uppercase text-nova-cyan">
                    {exp.pathwayTitle}
                  </p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-nova-gray">
                    {exp.missionLead}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-nova-off-white px-2.5 py-0.5 text-xs font-semibold text-nova-dark-gray"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4 text-xs text-nova-gray">
                    8 stages · Buddy-guided quest · Badge:{" "}
                    <strong className="text-nova-deep-blue">{exp.achievementTitle}</strong>
                  </p>
                  <Link
                    href={`/experiences/${exp.slug}`}
                    className="nova-btn-primary w-full text-center"
                  >
                    Launch Mission →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
