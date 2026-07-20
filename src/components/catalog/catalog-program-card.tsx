import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NovaProgram, ProgramVertical } from "@/data/courses";
import { enrollPathForProgram } from "@/lib/program-enrollment";
import { localizeProgram } from "@/lib/program-locale-copy";

const VERTICAL_STYLE: Record<
  ProgramVertical,
  { label: string; badge: string; border: string; glow: string }
> = {
  school: {
    label: "NOVA School",
    badge: "bg-nova-orange/20 text-nova-orange border-nova-orange/40",
    border: "border-nova-orange/30 hover:border-nova-orange/55",
    glow: "hover:shadow-[0_0_40px_rgba(255,107,53,0.15)]",
  },
  college: {
    label: "NOVA College",
    badge: "bg-nova-cyan/15 text-nova-cyan border-nova-cyan/40",
    border: "border-nova-cyan/30 hover:border-nova-cyan/55",
    glow: "hover:shadow-[0_0_40px_rgba(0,180,216,0.18)]",
  },
  language: {
    label: "NOVA Language",
    badge: "bg-nova-green/15 text-nova-green border-nova-green/40",
    border: "border-nova-green/30 hover:border-nova-green/55",
    glow: "hover:shadow-[0_0_40px_rgba(0,255,136,0.12)]",
  },
};

type Props = {
  program: NovaProgram;
};

export function CatalogProgramCard({ program }: Props) {
  const style = VERTICAL_STYLE[program.vertical];
  // Catalog is the EN product surface — never show Spanish curriculum titles here.
  const copy = localizeProgram(program, "en");
  const highlights = (copy.highlights?.length ? copy.highlights : program.highlights).slice(0, 3);

  return (
    <article
      className={cn(
        "nova-glass-card flex h-full flex-col border-2 transition duration-300",
        style.border,
        style.glow,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", style.badge)}>
          {style.label}
        </span>
        {program.tier === "advanced" && (
          <span className="rounded-full border border-nova-orange/50 bg-nova-orange/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-nova-orange">
            Tier 2 Advanced
          </span>
        )}
        {program.access === "demo-then-paid" && (
          <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
            Free demo mission
          </span>
        )}
      </div>

      <h3 className="text-lg font-black text-white">{copy.title}</h3>
      <p className="mt-1 text-sm font-medium text-nova-cyan-light/90">{copy.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{copy.description}</p>

      <ul className="mt-4 space-y-1.5">
        {highlights.map((h) => (
          <li key={h} className="flex gap-2 text-xs text-white/65">
            <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-nova-cyan" aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {program.durationLabel}
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5" aria-hidden />
          Ages {program.ageRange}
        </span>
        {program.certCode && (
          <span className="inline-flex items-center gap-1 text-nova-cyan-light/80">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            {program.certCode}
          </span>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Tuition</p>
        <p className="mt-0.5 text-xl font-black text-white">{program.tuitionLabel}</p>
        {program.deliveryNote && (
          <p className="mt-1 text-[11px] text-white/55">{program.deliveryNote}</p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href={enrollPathForProgram(program.slug)}
          className="nova-btn-primary nova-btn-glow inline-flex w-full items-center justify-center gap-1.5 text-sm"
        >
          Enroll &amp; pay
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={program.catalogHref}
            className="nova-btn-secondary inline-flex flex-1 items-center justify-center border-white/20 text-sm text-white"
          >
            View syllabus
          </Link>
          {program.demoHref && (
            <Link
              href={program.demoHref}
              className="nova-btn-secondary inline-flex flex-1 items-center justify-center border-white/20 text-sm text-white"
            >
              {program.demoLabel ?? "Try demo"}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
