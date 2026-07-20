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
  card: "aspect-square w-full rounded-none",
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
        "relative shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50",
        sizeClasses[size],
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn("buddy-portrait h-full w-full", size === "card" && "buddy-portrait--card")}
        draggable={false}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
