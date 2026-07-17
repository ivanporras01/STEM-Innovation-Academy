import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type Props = {
  experienceSlug: string;
  experienceTitle: string;
  variant?: "card" | "inline" | "hero";
  className?: string;
};

export function ExploreNowButton({
  experienceSlug,
  experienceTitle,
  variant = "card",
  className,
}: Props) {
  const href = `/experiences/${experienceSlug}`;

  if (variant === "hero") {
    return (
      <Link
        href={href}
        className={cn(
          "group inline-flex flex-col gap-1 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 backdrop-blur-sm transition hover:border-nova-cyan hover:bg-white/15",
          className
        )}
      >
        <span className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-nova-cyan">
          <Sparkles className="h-4 w-4" />
          Explore Now
        </span>
        <span className="text-base font-semibold text-white group-hover:text-nova-cyan-light">
          {experienceTitle}
        </span>
      </Link>
    );
  }

  if (variant === "inline") {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-bold text-nova-cyan transition hover:text-nova-blue",
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
        "nova-btn-secondary mt-3 flex w-full flex-col items-center gap-0.5 border-nova-cyan/40 bg-gradient-to-br from-white to-nova-off-white/80 py-3 text-center transition hover:border-nova-cyan hover:shadow-[0_0_20px_rgba(0,180,216,0.2)]",
        className
      )}
    >
      <span className="flex items-center gap-1.5 text-sm font-bold text-nova-deep-blue">
        <Sparkles className="h-3.5 w-3.5 text-nova-cyan" />
        Explore Now
      </span>
      <span className="text-xs font-medium text-nova-gray">{experienceTitle}</span>
    </Link>
  );
}
