import { cn } from "@/lib/utils";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";

type HeroAccent = "cyan" | "orange" | "green";

export type NovaPageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  cta?: React.ReactNode;
  centered?: boolean;
  accent?: HeroAccent;
  className?: string;
};

const ACCENT_TEXT: Record<HeroAccent, string> = {
  cyan: "text-nova-cyan",
  orange: "text-nova-orange",
  green: "text-nova-green",
};

/**
 * Standardized page hero used across every public page.
 *
 * Hierarchy:
 *   Small Brand Label  →  NOVA STEM HUB
 *   Page Title
 *   Subtitle (optional)
 *   Description (optional)
 *   CTA (optional)
 *
 * Never repeat the brand in the title or eyebrow.
 */
export function NovaPageHero({
  eyebrow = NOVA_STEM_HUB.name,
  title,
  subtitle,
  description,
  cta,
  centered = false,
  accent = "cyan",
  className,
}: NovaPageHeroProps) {
  return (
    <section
      className={cn(
        "nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nova-cyan/10 via-transparent to-nova-blue/10" />
      <div className={cn("nova-container relative", centered && "text-center")}>
        <p
          className={cn(
            "mb-2 text-sm font-bold uppercase tracking-[0.2em]",
            ACCENT_TEXT[accent],
          )}
        >
          ✦ {eyebrow}
        </p>
        <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-lg text-white/80",
              centered && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p
            className={cn(
              "mt-3 max-w-3xl text-sm text-nova-cyan-light/80",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
        {cta && <div className={cn("mt-6 flex flex-wrap gap-3", centered && "justify-center")}>{cta}</div>}
      </div>
    </section>
  );
}
