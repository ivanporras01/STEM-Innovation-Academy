import { cn } from "@/lib/utils";

export type LabArenaTheme =
  | "pixel"
  | "viral"
  | "pitch"
  | "story"
  | "cyber"
  | "impact"
  | "code"
  | "robot"
  | "iot";

export type LabMeter = {
  label: string;
  value: number;
  tone?: "cyan" | "amber" | "rose" | "emerald" | "violet";
};

type Props = {
  theme: LabArenaTheme;
  mode: string;
  meters: LabMeter[];
  success?: boolean;
  failFlash?: boolean;
  children: React.ReactNode;
  className?: string;
};

const TONE_FILL: Record<NonNullable<LabMeter["tone"]>, string> = {
  cyan: "from-cyan-400 via-sky-400 to-emerald-300",
  amber: "from-amber-400 via-orange-400 to-rose-300",
  rose: "from-rose-500 via-fuchsia-500 to-orange-400",
  emerald: "from-emerald-400 via-teal-400 to-cyan-300",
  violet: "from-violet-400 via-fuchsia-400 to-cyan-300",
};

/** Full class strings so Tailwind keeps themed arena CSS in production. */
const THEME_CLASS: Record<LabArenaTheme, string> = {
  pixel: "lab-arena--pixel",
  viral: "lab-arena--viral",
  pitch: "lab-arena--pitch",
  story: "lab-arena--story",
  cyber: "lab-arena--cyber",
  impact: "lab-arena--impact",
  code: "lab-arena--code",
  robot: "lab-arena--robot",
  iot: "lab-arena--iot",
};

/** Shared cinematic play-field used by every Explore Now LAB. */
export function LabArena({
  theme,
  mode,
  meters,
  success = false,
  failFlash = false,
  children,
  className,
}: Props) {
  return (
    <div
      data-theme={theme}
      className={cn(
        "lab-arena relative overflow-hidden rounded-[28px] border p-4 sm:p-6",
        THEME_CLASS[theme],
        failFlash && "lab-arena--fail",
        success && "lab-arena--win",
        className,
      )}
    >
      <div className="lab-arena-aurora" aria-hidden />
      <div className="lab-arena-grid" aria-hidden />
      <div className="lab-arena-scan" aria-hidden />
      <div className="lab-arena-stars" aria-hidden />
      <div className="lab-arena-rim" aria-hidden />

      <div className="relative z-[2] mb-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {meters.map((m) => (
            <div key={m.label} className="lab-meter">
              <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.14em]">
                <span className="text-white/65">{m.label}</span>
                <span className="tabular-nums text-white/95">{Math.round(m.value)}%</span>
              </div>
              <div className="lab-meter-track mt-2">
                <div
                  className={cn(
                    "lab-meter-fill h-full rounded-full bg-gradient-to-r transition-all duration-500",
                    TONE_FILL[m.tone ?? "cyan"],
                  )}
                  style={{ width: `${Math.max(0, Math.min(100, m.value))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="lab-mode-badge flex min-w-[8.5rem] items-center justify-center sm:justify-end">
          <div className="text-center sm:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Mode</p>
            <p className="mt-0.5 flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--lab-arena-accent-2,#67e8f9)] sm:justify-end">
              <span className="lab-mode-led" aria-hidden />
              {mode}
            </p>
          </div>
        </div>
      </div>

      <div className="lab-arena-playfield relative z-[2]">{children}</div>
    </div>
  );
}

export function LabChoiceCard({
  active,
  title,
  subtitle,
  icon,
  onClick,
  disabled,
}: {
  active: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "lab-choice relative overflow-hidden rounded-2xl border px-3.5 py-3.5 text-left transition duration-300",
        active
          ? "lab-choice--active border-[var(--exp-accent)]/55 bg-[var(--exp-accent)]/15 text-white"
          : "border-white/12 bg-black/25 text-white/75 hover:border-white/28 hover:bg-white/[0.08]",
        disabled && "opacity-50",
      )}
    >
      {active && <span className="lab-choice-glow" aria-hidden />}
      <div className="relative flex items-start gap-2.5">
        {icon && (
          <span className="text-xl leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">{icon}</span>
        )}
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs leading-snug text-white/55">{subtitle}</p>}
        </div>
      </div>
    </button>
  );
}
