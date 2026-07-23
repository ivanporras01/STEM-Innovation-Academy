import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

/**
 * Standard hero title block used across every top-level NOVA page.
 *
 * Font: inherit (Inter via body)
 * Weight: font-black
 * Size: text-3xl / sm:text-4xl / lg:text-5xl
 * Alignment: left (default)
 * Spacing: eyebrow mb-3, subtitle mt-4, description mt-3, children mt-6
 */
export function PageHero({
  title,
  eyebrow,
  subtitle,
  description,
  children,
  align = "left",
  className,
  titleClassName,
}: PageHeroProps) {
  const center = align === "center";

  return (
    <div
      className={cn(
        "nova-container relative",
        center && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-bold uppercase tracking-[0.25em] text-nova-cyan",
            center && "mx-auto max-w-2xl"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className={cn(
          "text-3xl font-black text-white sm:text-4xl lg:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg text-white/80",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className={cn(
            "mt-3 max-w-3xl text-sm text-nova-cyan-light/80",
            center && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
