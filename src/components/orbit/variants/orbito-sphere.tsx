"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  className?: string;
};

const SIZE = { sm: "h-11 w-11", md: "h-28 w-28", hero: "h-44 w-44 sm:h-48 sm:w-48" } as const;

/** Option 3 — Floating sphere with holographic face and particle ring. */
export function OrbitoSphere({ size = "md", scanning = false, className }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div className={cn("orbit-robot-float absolute inset-0", scanning && "orbit-robot-scanning")}>
        <svg viewBox="0 0 160 180" className="h-full w-full" fill="none">
          {/* Orbit ring */}
          <ellipse cx="80" cy="90" rx="58" ry="18" stroke="rgba(0,180,216,0.25)" strokeWidth="1" strokeDasharray="4 6" className="orbit-sphere-ring" />
          <ellipse cx="80" cy="90" rx="48" ry="14" stroke="rgba(255,122,0,0.2)" strokeWidth="0.8" className="orbit-sphere-ring-reverse" />

          {/* Particles */}
          <circle cx="138" cy="90" r="3" className="orbit-antenna-pulse fill-[#00b4d8]" />
          <circle cx="22" cy="82" r="2" className="orbit-eye fill-[#ff7a00]" />
          <circle cx="80" cy="48" r="2.5" fill="white" opacity="0.7" />

          {/* Main sphere */}
          <circle cx="80" cy="90" r="38" fill={`url(#${uid}-sphere)`} stroke="rgba(0,180,216,0.35)" strokeWidth="1.5" />
          <circle cx="80" cy="90" r="34" fill={`url(#${uid}-inner)`} />

          {/* Holographic face panel */}
          <ellipse cx="80" cy="88" rx="26" ry="22" fill="rgba(0,180,216,0.06)" stroke="rgba(0,180,216,0.25)" />
          {/* Eyes */}
          <ellipse cx="68" cy="84" rx="5" ry="6" className="orbit-eye fill-[#00b4d8]" />
          <ellipse cx="92" cy="84" rx="5" ry="6" className="orbit-eye fill-[#00b4d8]" />
          {scanning && (
            <rect x="54" y="78" width="52" height="14" rx="4" fill="none" stroke="rgba(0,180,216,0.4)" className="orbit-scan-line" />
          )}
          {/* Smile arc */}
          <path d="M68 98 Q80 108 92 98" stroke="rgba(0,180,216,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Core glow */}
          <circle cx="80" cy="90" r="8" className="orbit-core fill-[#00b4d8]" opacity="0.35" />

          {/* Hover shadow */}
          <ellipse cx="80" cy="138" rx="32" ry="6" fill="rgba(0,180,216,0.15)" />

          <defs>
            <radialGradient id={`${uid}-sphere`} cx="35%" cy="30%">
              <stop stopColor="#3a6088" />
              <stop offset="0.6" stopColor="#152840" />
              <stop offset="1" stopColor="#080f18" />
            </radialGradient>
            <radialGradient id={`${uid}-inner`} cx="50%" cy="40%">
              <stop stopColor="rgba(0,180,216,0.08)" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
