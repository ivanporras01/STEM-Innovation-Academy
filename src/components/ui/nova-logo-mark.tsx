"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

type IconProps = {
  size?: LogoSize;
  className?: string;
};

type LogoProps = IconProps & {
  showText?: boolean;
};

const ICON_SIZES: Record<LogoSize, string> = {
  sm: "h-9 w-9 min-h-9 min-w-9",
  md: "h-12 w-12 min-h-12 min-w-12",
  lg: "h-16 w-16 min-h-16 min-w-16",
};

const TEXT_SIZES: Record<LogoSize, string> = {
  sm: "text-[1.075rem] leading-5",
  md: "text-[1.3rem] leading-6",
  lg: "text-[1.6rem] leading-7",
};

/** Orbit ring + 4-point star + planet — Logo #3 icon mark. */
export function NovaLogoIcon({ size = "md", className }: IconProps) {
  const uid = useId().replace(/:/g, "");
  const orbitGradientId = `nova-orbit-${uid}`;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("inline-block shrink-0 grow-0 aspect-square", ICON_SIZES[size], className)}
    >
      <defs>
        <linearGradient id={orbitGradientId} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#0B1D3A" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke={`url(#${orbitGradientId})`}
        strokeWidth="1.75"
        fill="none"
      />
      <polygon
        points="16,9 17.4,14.6 23,16 17.4,17.4 16,23 14.6,17.4 9,16 14.6,14.6"
        fill="#FFFFFF"
      />
      <circle cx="25.5" cy="10.5" r="2" fill="#00D4FF" />
    </svg>
  );
}

/** Horizontal lockup: Logo #3 icon + "NOVA STEM HUB" wordmark with unified gradient. */
export function NovaLogo({ size = "md", className, showText = true }: LogoProps) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-2.5", className)}>
      <NovaLogoIcon size={size} />
      {showText && (
        <span
          className={cn(
            "whitespace-nowrap bg-gradient-to-r from-nova-cyan-light to-nova-cyan bg-clip-text font-bold tracking-tight text-transparent",
            TEXT_SIZES[size],
          )}
        >
          NOVA STEM HUB
        </span>
      )}
    </span>
  );
}

/** @deprecated Use NovaLogoIcon — kept for backward compatibility. */
export function NovaLogoMark({ size = "md", className }: IconProps) {
  return <NovaLogoIcon size={size} className={className} />;
}

