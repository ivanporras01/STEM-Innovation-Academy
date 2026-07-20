import Link from "next/link";
import { PathwayIcon } from "@/components/ui/pathway-icon";
import type { PathwayKey } from "@/components/ui/pathway-icon";
import { cn } from "@/lib/utils";

type Props = {
  pathway: PathwayKey | string;
  pathwayTitle: string;
  badgeTitle: string;
  labCode: string;
  difficulty: 1 | 2 | 3;
  durationMinutes: number;
  questTeaser: string;
  className?: string;
};

/** Cinematic side panel — orbit rings, energy core, floating sparks. */
export function MissionCinemaPanel({
  pathway,
  pathwayTitle,
  badgeTitle,
  labCode,
  difficulty,
  durationMinutes,
  questTeaser,
  className,
}: Props) {
  return (
    <aside className={cn("mission-cinema relative overflow-hidden rounded-[28px] p-6 sm:p-8", className)}>
      <div className="mission-cinema-aurora" aria-hidden />
      <div className="mission-cinema-grid" aria-hidden />

      <div className="mission-orbit-stage relative mx-auto mb-6 grid place-items-center">
        <span className="mission-orbit mission-orbit--outer" aria-hidden />
        <span className="mission-orbit mission-orbit--mid" aria-hidden />
        <span className="mission-orbit mission-orbit--inner" aria-hidden />
        <span className="mission-core-glow" aria-hidden />
        <PathwayIcon
          pathway={pathway}
          variant="hero"
          className="relative z-10 drop-shadow-[0_0_28px_color-mix(in_srgb,var(--exp-accent)_55%,transparent)]"
        />
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={`mission-spark mission-spark--${i + 1}`} aria-hidden />
        ))}
      </div>

      <p className="relative text-center text-[10px] font-black uppercase tracking-[0.22em] text-[var(--exp-accent-2)]">
        {labCode} · Live briefing
      </p>
      <h2 className="relative mt-2 text-center text-xl font-black text-white sm:text-2xl">{pathwayTitle}</h2>
      <p className="relative mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-white/80">
        {questTeaser}
      </p>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/20 bg-black/25 p-4 backdrop-blur-md">
        <div className="mission-badge-shimmer" aria-hidden />
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Badge waiting</p>
        <p className="mt-1 text-lg font-black text-[var(--exp-accent-2)]">{badgeTitle}</p>
        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-white/60">
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: difficulty }).map((_, i) => (
              <span key={i} className="text-[var(--exp-accent-2)] drop-shadow-[0_0_6px_currentColor]">
                ⚡
              </span>
            ))}
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-semibold">
            ~{durationMinutes} min
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300/90">
          Mission Control online
        </span>
      </div>
    </aside>
  );
}

type CtaProps = {
  title: string;
  subtitle?: string;
  href: string;
  accent?: string;
  accentSecondary?: string;
  ctaLabel?: string;
};

/** High-impact CTA block for school elective pages. */
export function MissionInviteCard({
  title,
  subtitle = "Your first NOVA Explore Now mission",
  href,
  accent = "#00b4d8",
  accentSecondary = "#67e8f9",
  ctaLabel = "Start Explore Now mission →",
}: CtaProps) {
  return (
    <section
      className="mission-invite relative overflow-hidden rounded-[28px] border border-white/15 p-6 text-center sm:p-10"
      style={
        {
          "--exp-accent": accent,
          "--exp-accent-2": accentSecondary,
        } as React.CSSProperties
      }
    >
      <div className="mission-invite-aurora" aria-hidden />
      <div className="mission-invite-rings" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <p className="relative text-[11px] font-black uppercase tracking-[0.22em] text-[var(--exp-accent-2)]">
        ✦ First contact · Explore Now
      </p>
      <h2 className="relative mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="relative mx-auto mt-2 max-w-md text-sm text-white/75">{subtitle}</p>

      <div className="relative mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/55">
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1">Interactive LAB</span>
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1">Buddy co-pilot</span>
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1">Earn a badge</span>
      </div>

      <Link
        href={href}
        translate="no"
        className="experience-btn-primary mission-invite-cta relative mt-8 inline-flex"
      >
        {ctaLabel}
      </Link>
      <p className="relative mt-3 text-xs text-white/45">No pressure — play, explore, fall in love with STEM.</p>
    </section>
  );
}
