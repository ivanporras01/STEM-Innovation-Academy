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

/** Horizontal lockup: Logo #3 icon + "NOVA STEM Hub" wordmark with unified gradient. */
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
          NOVA STEM Hub
        </span>
      )}
    </span>
  );
}

/** @deprecated Use NovaLogoIcon — kept for backward compatibility. */
export function NovaLogoMark({ size = "md", className }: IconProps) {
  return <NovaLogoIcon size={size} className={className} />;
}

/** Large hero center mark — Logo #3 at orbit focal point */
export function NovaHeroLogoMark({ className }: { className?: string }) {
  return (
    <NovaLogoIcon
      className={cn(
        "h-16 w-16 min-h-16 min-w-16 sm:h-20 sm:w-20 sm:min-h-20 sm:min-w-20",
        "drop-shadow-[0_0_28px_rgba(0,212,255,0.55)]",
        className,
      )}
    />
  );
}

/** Certificate header mark — star in glowing cyan ring (no planet dot). */
export function NovaCertificateLogoMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const glowId = `nova-cert-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn(
        "inline-block shrink-0 aspect-square h-12 w-12 min-h-12 min-w-12 sm:h-14 sm:w-14 sm:min-h-14 sm:min-w-14",
        "drop-shadow-[0_0_20px_rgba(0,229,255,0.65)]",
        className,
      )}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill={`url(#${glowId})`} />
      <circle cx="24" cy="24" r="14" stroke="#00E5FF" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="15.5" stroke="#00E5FF" strokeWidth="0.5" opacity="0.45" fill="none" />
      <polygon
        points="24,14 26.2,21.8 34,24 26.2,26.2 24,34 21.8,26.2 14,24 21.8,21.8"
        fill="#FFFFFF"
      />
    </svg>
  );
}
