import Link from "next/link";
import { cn } from "@/lib/utils";
import { getExperience } from "@/lib/experiences/catalog";
import { PathwayIcon, type PathwayKey } from "@/components/ui/pathway-icon";
import { ArrowRight, Clock, Layers, Sparkles, Zap } from "lucide-react";

type Props = {
  experienceSlug: string;
  experienceTitle: string;
  pathway?: PathwayKey;
  variant?: "card" | "inline" | "hero";
  className?: string;
};

const PATHWAY_GLOW: Record<PathwayKey, string> = {
  CODING_AI: "from-nova-cyan/20 via-nova-blue/10 to-transparent hover:shadow-[0_0_28px_rgba(0,180,216,0.3)]",
  ROBOTICS: "from-nova-orange/20 via-nova-deep-blue/10 to-transparent hover:shadow-[0_0_28px_rgba(255,122,0,0.25)]",
  IOT: "from-nova-green/20 via-nova-cyan/10 to-transparent hover:shadow-[0_0_28px_rgba(18,166,106,0.25)]",
};

const PATHWAY_ACCENT: Record<PathwayKey, string> = {
  CODING_AI: "border-nova-cyan/40 group-hover:border-nova-cyan/70",
  ROBOTICS: "border-nova-orange/40 group-hover:border-nova-orange/70",
  IOT: "border-nova-green/40 group-hover:border-nova-green/70",
};

function DifficultyStars({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex gap-0.5 text-[10px]" aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <Zap
          key={n}
          className={cn("h-3 w-3", n <= level ? "fill-nova-cyan text-nova-cyan" : "text-white/20")}
        />
      ))}
    </span>
  );
}

export function ExploreNowButton({
  experienceSlug,
  experienceTitle,
  pathway,
  variant = "card",
  className,
}: Props) {
  const href = `/experiences/${experienceSlug}`;
  const exp = getExperience(experienceSlug);
  const difficulty = exp?.difficulty ?? 2;
  const duration = exp?.durationMinutes ?? 25;
  const teaser = exp?.questTeaser ?? "Interactive quest with buddy, LAB, and badge.";
  const glow = pathway ? PATHWAY_GLOW[pathway] : PATHWAY_GLOW.CODING_AI;
  const accent = pathway ? PATHWAY_ACCENT[pathway] : PATHWAY_ACCENT.CODING_AI;

  if (variant === "hero") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-6 backdrop-blur-xl transition duration-300",
          accent,
          glow,
          className
        )}
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-nova-cyan/10 blur-2xl transition group-hover:bg-nova-cyan/20" />
        <span className="relative flex items-center gap-2 text-sm font-black uppercase tracking-wider text-nova-cyan-light">
          <Sparkles className="h-4 w-4" />
          Explore Now
        </span>
        <span className="relative mt-1 block text-lg font-bold text-white group-hover:text-nova-cyan-light">
          {experienceTitle}
        </span>
        <span className="relative mt-2 flex items-center gap-3 text-xs text-nova-cyan-light/75">
          <DifficultyStars level={difficulty} />
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> ~{duration} min
          </span>
        </span>
      </Link>
    );
  }

  if (variant === "inline") {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-bold text-nova-cyan transition hover:text-nova-cyan-light",
          className
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        Explore Now — {experienceTitle}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative mt-0 block overflow-hidden rounded-2xl border bg-gradient-to-br from-[#0a1628]/95 to-[#0d1b3d]/85 p-4 backdrop-blur-xl transition duration-300",
        accent,
        glow,
        className
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1 bg-gradient-to-b",
          pathway === "ROBOTICS"
            ? "from-nova-orange to-nova-deep-blue"
            : pathway === "IOT"
              ? "from-nova-green to-nova-cyan"
              : "from-nova-cyan to-nova-blue"
        )}
      />

      <div className="relative flex items-start gap-3 pl-2">
        {pathway && (
          <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
            <PathwayIcon pathway={pathway} variant="sm" className="h-10 w-10" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-nova-cyan">
              <Sparkles className="h-3 w-3" />
              Explore Now
            </span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-nova-cyan-light/80">
              {exp?.labCode ?? "NOVA LAB"}
            </span>
          </div>

          <p className="text-base font-bold leading-snug text-white group-hover:text-nova-cyan-light">
            {experienceTitle}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-nova-cyan-light/70">
            {teaser}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-wide text-nova-cyan-light/60">
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3 w-3" /> 8 stages
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> ~{duration} min
            </span>
            <DifficultyStars level={difficulty} />
          </div>
        </div>

        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-nova-cyan/50 transition group-hover:translate-x-0.5 group-hover:text-nova-cyan" />
      </div>
    </Link>
  );
}
