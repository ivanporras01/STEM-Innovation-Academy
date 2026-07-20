"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  className?: string;
};

const SIZE = { sm: "h-11 w-11", md: "h-28 w-28", hero: "h-44 w-44 sm:h-48 sm:w-48" } as const;

/** Option 1 — Compact levitating capsule bot with hover disc. */
export function OrbitoHover({ size = "md", scanning = false, className }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div className={cn("orbit-robot-float absolute inset-0", scanning && "orbit-robot-scanning")}>
        <svg viewBox="0 0 160 180" className="h-full w-full" fill="none">
          {/* Hover disc */}
          <ellipse cx="80" cy="168" rx="42" ry="8" fill={`url(#${uid}-disc)`} className="orbit-hover-disc" />
          <ellipse cx="80" cy="166" rx="28" ry="4" fill="rgba(0,180,216,0.35)" />

          {/* Thruster glow */}
          <ellipse cx="80" cy="158" rx="18" ry="6" fill="rgba(0,180,216,0.2)" className="orbit-core" />

          {/* Body capsule */}
          <path
            d="M52 48 C52 28 68 18 80 18 C92 18 108 28 108 48 V118 C108 132 96 142 80 142 C64 142 52 132 52 118 Z"
            fill={`url(#${uid}-body)`}
            stroke="rgba(0,180,216,0.45)"
            strokeWidth="1.5"
          />
          {/* Shoulder caps */}
          <circle cx="48" cy="72" r="10" fill={`url(#${uid}-metal)`} stroke="rgba(0,180,216,0.3)" />
          <circle cx="112" cy="72" r="10" fill={`url(#${uid}-metal)`} stroke="rgba(0,180,216,0.3)" />
          {/* Arms */}
          <path d="M38 76 L28 98 L34 100 L42 80 Z" fill={`url(#${uid}-metal)`} className="orbit-arm-left" />
          <path d="M122 76 L132 98 L126 100 L118 80 Z" fill={`url(#${uid}-metal)`} className="orbit-arm-right" />
          {/* Hands */}
          <circle cx="30" cy="100" r="5" fill="#1a3a5c" stroke="rgba(0,180,216,0.5)" />
          <circle cx="130" cy="100" r="5" fill="#1a3a5c" stroke="rgba(0,180,216,0.5)" />

          {/* Visor band */}
          <rect x="58" y="42" width="44" height="20" rx="10" fill="#020617" stroke="rgba(0,180,216,0.4)" />
          <rect x="62" y="46" width="36" height="12" rx="6" fill={`url(#${uid}-visor)`} />
          {scanning && (
            <line x1="62" y1="52" x2="98" y2="52" stroke="#00b4d8" strokeWidth="1.5" className="orbit-scan-line" opacity="0.8" />
          )}
          <ellipse cx="70" cy="52" rx="4" ry="3" className="orbit-eye fill-[#00b4d8]" />
          <ellipse cx="90" cy="52" rx="4" ry="3" className="orbit-eye fill-[#00b4d8]" />

          {/* Hex reactor */}
          <path
            d="M80 88 L92 95 L92 109 L80 116 L68 109 L68 95 Z"
            fill="#030712"
            stroke="rgba(0,180,216,0.5)"
            strokeWidth="1"
          />
          <circle cx="80" cy="102" r="8" className="orbit-core fill-[#00b4d8]" opacity="0.85" />

          {/* Panel lines */}
          <path d="M58 125 H102" stroke="rgba(0,180,216,0.15)" strokeWidth="1" />
          <path d="M64 132 H96" stroke="rgba(0,180,216,0.1)" strokeWidth="1" />

          <defs>
            <linearGradient id={`${uid}-body`} x1="52" y1="18" x2="108" y2="142">
              <stop stopColor="#2d4a6e" />
              <stop offset="0.5" stopColor="#152a45" />
              <stop offset="1" stopColor="#0a1628" />
            </linearGradient>
            <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#5a7a9a" />
              <stop offset="1" stopColor="#1e3550" />
            </linearGradient>
            <linearGradient id={`${uid}-visor`} x1="62" y1="46" x2="98" y2="58">
              <stop stopColor="rgba(0,180,216,0.15)" />
              <stop offset="1" stopColor="rgba(0,100,140,0.05)" />
            </linearGradient>
            <radialGradient id={`${uid}-disc`}>
              <stop stopColor="rgba(0,180,216,0.35)" />
              <stop offset="1" stopColor="rgba(0,180,216,0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
