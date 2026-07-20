"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ORBITA_AVATAR } from "@/components/orbit/orbita-chatbot-sizes";
import {
  DEFAULT_ORBITO_REAL_ID,
  getOrbitoRealVariant,
  getOrbitoStillFrame,
  type OrbitoRealId,
} from "@/components/orbit/orbito-real-catalog";

type Props = {
  variantId?: OrbitoRealId;
  size?: "sm" | "md" | "hero" | "chat" | "chatbot" | "fab";
  mode?: "idle" | "greeting" | "scan";
  animate?: boolean;
  frameIntervalMs?: number;
  className?: string;
};

const SIZE_CLASS: Record<Exclude<Props["size"], undefined>, string> = {
  chatbot: "orbita-chatbot-avatar",
  fab: "orbita-chatbot-fab",
  sm: "orbita-size-sm",
  chat: "orbita-size-chat",
  md: "orbita-size-md",
  hero: "orbita-size-hero",
};

const PRELOAD_SIZES = new Set<Props["size"]>(["hero", "chat", "chatbot", "fab"]);

export function OrbitoRealGuide({
  variantId = DEFAULT_ORBITO_REAL_ID,
  size = "md",
  mode = "idle",
  animate = true,
  frameIntervalMs,
  className,
}: Props) {
  const variant = useMemo(() => getOrbitoRealVariant(variantId), [variantId]);
  const [frameIndex, setFrameIndex] = useState(0);

  const displayMode = mode === "idle" ? "greeting" : mode;
  const compact = size === "chatbot" || size === "fab";

  const pixelSize =
    size === "fab"
      ? ORBITA_AVATAR.fab
      : size === "chatbot"
        ? ORBITA_AVATAR.chatbot
        : null;

  const frames = useMemo(
    () =>
      mode === "scan"
        ? [variant.scanFrame]
        : mode === "greeting"
          ? [...variant.greetingFrames]
          : [variant.idleFrame],
    [mode, variant],
  );

  const stillSrc = useMemo(
    () => getOrbitoStillFrame(variant, displayMode === "scan" ? "scan" : "greeting"),
    [variant, displayMode],
  );

  useEffect(() => {
    setFrameIndex(0);
  }, [variantId, mode, animate]);

  useEffect(() => {
    if (!animate || mode !== "greeting" || frames.length < 2) return;
    const ms = frameIntervalMs ?? variant.frameInterval;
    const interval = window.setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length);
    }, ms);
    return () => window.clearInterval(interval);
  }, [animate, mode, frames, variant.frameInterval, frameIntervalMs]);

  const currentSrc = animate ? (frames[frameIndex] ?? variant.idleFrame) : stillSrc;

  const boxStyle = pixelSize
    ? {
        width: pixelSize.width,
        height: pixelSize.height,
        minWidth: pixelSize.width,
        minHeight: pixelSize.height,
        maxWidth: pixelSize.width,
        maxHeight: pixelSize.height,
      }
    : undefined;

  return (
    <div
      className={cn("relative shrink-0", SIZE_CLASS[size], className)}
      style={boxStyle}
      data-orbita-size={size}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden bg-gradient-to-t from-[#0a2540] via-[#061018] to-[#0d2035] ring-1 ring-nova-cyan/25",
          compact ? "rounded-lg" : "rounded-2xl",
        )}
      >
        {!compact && (
          <>
            <div className="absolute inset-x-[10%] bottom-[8%] h-[35%] rounded-full bg-nova-cyan/25 blur-2xl" />
            <div className="absolute inset-x-[20%] top-[5%] h-[20%] rounded-full bg-white/5 blur-xl" />
          </>
        )}
      </div>

      {mode === "scan" && (
        <div className="pointer-events-none absolute bottom-[32%] right-[10%] z-20 h-[3px] w-[38%] origin-left rotate-[-6deg]">
          <div className="orbit-nexus-scan-beam h-full w-full rounded-full bg-gradient-to-r from-nova-cyan via-nova-cyan/90 to-transparent shadow-[0_0_16px_#00e5ff]" />
        </div>
      )}

      {compact && pixelSize ? (
        <Image
          src={currentSrc}
          alt="Orbita guía NOVA"
          width={pixelSize.width}
          height={pixelSize.height}
          unoptimized
          priority
          className="relative z-10 object-contain object-bottom brightness-110 contrast-105 drop-shadow-[0_2px_8px_rgba(0,180,216,0.35)]"
        />
      ) : (
        <Image
          src={currentSrc}
          alt="Orbita guía NOVA"
          fill
          unoptimized
          priority={PRELOAD_SIZES.has(size)}
          loading={PRELOAD_SIZES.has(size) ? undefined : "lazy"}
          className="z-10 object-contain object-bottom brightness-110 contrast-105 drop-shadow-[0_8px_32px_rgba(0,180,216,0.45)]"
        />
      )}
    </div>
  );
}
