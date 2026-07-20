"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "card";
};

const sizeClasses = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-[72px] w-[72px] rounded-[18px]",
  lg: "h-24 w-24 rounded-3xl",
  xl: "h-28 w-28 rounded-3xl",
  /** Portrait frame matching buddy art (~2:3) so faces stay proportional in the grid. */
  card: "aspect-[3/4] w-full rounded-none",
};

export function BuddyAvatar({ src, alt, className, size = "md" }: Props) {
  const [failed, setFailed] = useState(false);
  const initial = (alt.match(/[A-Za-z]/)?.[0] ?? "N").toUpperCase();

  if (failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-gradient-to-br from-nova-cyan/40 to-nova-blue/50 text-sm font-bold text-white",
          sizeClasses[size],
          className,
        )}
        aria-hidden={alt === ""}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate shrink-0 overflow-hidden bg-[#0a1628]",
        sizeClasses[size],
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className={cn(
          "buddy-portrait pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover object-top",
          size === "card" && "buddy-portrait--card",
        )}
      />
    </div>
  );
}
