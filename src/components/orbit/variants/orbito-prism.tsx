"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  className?: string;
};

const SIZE = { sm: "h-11 w-11", md: "h-28 w-28", hero: "h-44 w-44 sm:h-48 sm:w-48" } as const;

/** Option 5 — Faceted crystal bot with internal core glow. */
export function OrbitoPrism({ size = "md", scanning = false, className }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative shrink-0", SIZE[size], className)} aria-hidden>
      <div className={cn("orbit-robot-float absolute inset-0", scanning && "orbit-robot-scanning")}>
        <svg viewBox="0 0 160 180" className="h-full w-full" fill="none">
          {/* Base shadow */}
          <ellipse cx="80" cy="158" rx="36" ry="8" fill="rgba(0,180,216,0.12)" />

          {/* Lower body facet */}
          <path d="M80 48 L118 78 L100 130 L60 130 L42 78 Z" fill={`url(#${uid}-f1)`} stroke="rgba(0,180,216,0.35)" strokeWidth="1" />
          {/* Left facet */}
          <path d="M42 78 L60 130 L60 90 L50 55 Z" fill={`url(#${uid}-f2)`} stroke="rgba(0,180,216,0.2)" strokeWidth="0.8" />
          {/* Right facet */}
          <path d="M118 78 L100 130 L100 90 L110 55 Z" fill={`url(#${uid}-f3)`} stroke="rgba(0,180,216,0.2)" strokeWidth="0.8" />
          {/* Top head facet */}
          <path d="M80 28 L110 55 L80 48 L50 55 Z" fill={`url(#${uid}-f4)`} stroke="rgba(0,180,216,0.45)" strokeWidth="1.2" />

          {/* Face panel */}
          <path d="M62 52 L98 52 L92 72 L68 72 Z" fill="rgba(2,6,23,0.85)" stroke="rgba(0,180,216,0.4)" />
          <polygon points="72,58 76,66 68,66" className="orbit-eye fill-[#00b4d8]" />
          <polygon points="88,58 92,66 84,66" className="orbit-eye fill-[#00b4d8]" />
          {scanning && (
            <line x1="68" y1="62" x2="92" y2="62" stroke="#00b4d8" strokeWidth="1" className="orbit-scan-line" />
          )}

          {/* Internal core (visible through facets) */}
          <circle cx="80" cy="95" r="16" fill="rgba(0,180,216,0.08)" />
          <circle cx="80" cy="95" r="10" className="orbit-core fill-[#00b4d8]" opacity="0.7" />
          <circle cx="80" cy="95" r="5" fill="white" opacity="0.5" />

          {/* Glass highlights */}
          <path d="M55 60 L65 85 L58 100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M105 58 L98 82" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" />

          {/* Small float arms */}
          <path d="M38 85 L24 95 L28 100 L40 92 Z" fill={`url(#${uid}-arm)`} opacity="0.9" className="orbit-arm-left" />
          <path d="M122 85 L136 95 L132 100 L120 92 Z" fill={`url(#${uid}-arm)`} opacity="0.9" className="orbit-arm-right" />

          <defs>
            <linearGradient id={`${uid}-f1`} x1="80" y1="48" x2="80" y2="130">
              <stop stopColor="#3a6a8a" />
              <stop offset="1" stopColor="#0f2035" />
            </linearGradient>
            <linearGradient id={`${uid}-f2`} x1="42" y1="55" x2="60" y2="130">
              <stop stopColor="#2a5070" />
              <stop offset="1" stopColor="#0a1525" />
            </linearGradient>
            <linearGradient id={`${uid}-f3`} x1="118" y1="55" x2="100" y2="130">
              <stop stopColor="#356080" />
              <stop offset="1" stopColor="#0c1828" />
            </linearGradient>
            <linearGradient id={`${uid}-f4`} x1="80" y1="28" x2="80" y2="55">
              <stop stopColor="#5a90b0" />
              <stop offset="1" stopColor="#284860" />
            </linearGradient>
            <linearGradient id={`${uid}-arm`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="rgba(0,180,216,0.5)" />
              <stop offset="1" stopColor="rgba(0,100,140,0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
