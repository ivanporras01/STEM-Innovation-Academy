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
        "lab-arena relative overflow-hidden rounded-3xl border p-4 sm:p-5",
        THEME_CLASS[theme],
        failFlash && "lab-arena--fail",
        success && "lab-arena--win",
        className,
      )}
    >
      <div className="lab-arena-scan" aria-hidden />
      <div className="lab-arena-stars" aria-hidden />

      <div className="relative z-[2] mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {meters.map((m) => (
            <div key={m.label} className="pixel-meter">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                <span className="text-white/70">{m.label}</span>
                <span className="text-white/90">{Math.round(m.value)}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/40">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                    TONE_FILL[m.tone ?? "cyan"],
                  )}
                  style={{ width: `${Math.max(0, Math.min(100, m.value))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pixel-meter flex min-w-[7.5rem] items-center justify-center sm:justify-end">
          <div className="text-center sm:text-right">
            <p className="text-[10px] font-black uppercase tracking-wider text-white/45">Mode</p>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">{mode}</p>
          </div>
        </div>
      </div>

      <div className="relative z-[2]">{children}</div>
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
        "lab-choice relative overflow-hidden rounded-2xl border px-3 py-3 text-left transition",
        active
          ? "border-[var(--exp-accent)]/55 bg-[var(--exp-accent)]/15 text-white shadow-[0_0_24px_color-mix(in_srgb,var(--exp-accent)_25%,transparent)]"
          : "border-white/10 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10",
        disabled && "opacity-50",
      )}
    >
      <div className="flex items-start gap-2.5">
        {icon && <span className="text-xl leading-none">{icon}</span>}
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-white/55">{subtitle}</p>}
        </div>
      </div>
    </button>
  );
}
