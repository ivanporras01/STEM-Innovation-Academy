"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Rocket, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AppLocale } from "@/lib/locale";
import { getOrbitaMenuItems } from "@/lib/nova-nav";
import { OrbitoRealGuide } from "@/components/orbit/orbito-real-guide";
import { getOrbitoRealVariant } from "@/components/orbit/orbito-real-catalog";
import {
  ORBITA_CHAT_FRAME_MS,
  ORBITA_FAB_FRAME_MS,
  preloadOrbitaGreetingFrames,
} from "@/components/orbit/orbita-chatbot-sizes";
import { ORBIT_IDENTITY } from "@/components/orbit/orbit-robot";

const DISMISS_KEY = "orbita-dismissed-session";
const ORBITA_FRAMES = getOrbitoRealVariant("orbita").greetingFrames;

if (typeof window !== "undefined") {
  preloadOrbitaGreetingFrames(ORBITA_FRAMES);
}

const COPY = {
  en: {
    role: "NOVA Welcome Guide",
    greeting: "Welcome to NOVA STEM HUB.",
    body: "I'm Orbita — pick a destination, same options as the menu above.",
    dismiss: "Start exploring",
    reopen: "Chat with Orbita",
    close: "Close chat",
  },
  es: {
    role: "Guía de bienvenida NOVA",
    greeting: "Bienvenido a NOVA STEM HUB.",
    body: "Soy Orbita — elige un destino, las mismas opciones del menú de arriba.",
    dismiss: "Empezar a explorar",
    reopen: "Hablar con Orbita",
    close: "Cerrar chat",
  },
  pt: {
    role: "Guia de boas-vindas NOVA",
    greeting: "Bem-vindo ao NOVA STEM HUB.",
    body: "Sou Orbita — escolha um destino, as mesmas opções do menu acima.",
    dismiss: "Começar a explorar",
    reopen: "Falar com Orbita",
    close: "Fechar chat",
  },
} as const;

/** Shared chip style — matches main header tab calm uniformity (no mixed accent borders). */
const MENU_CHIP =
  "flex w-full items-center justify-center rounded-lg border border-white/20 bg-white/[0.04] px-3 py-2.5 text-center text-[11px] font-semibold leading-snug text-white/90 transition hover:border-nova-cyan/50 hover:bg-nova-cyan/10 hover:text-nova-cyan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nova-cyan";

type Props = {
  locale: AppLocale;
  autoOpen?: boolean;
};

function readChatOpen(autoOpen: boolean): boolean {
  if (typeof window === "undefined") return autoOpen;
  if (window.sessionStorage.getItem(DISMISS_KEY)) return false;
  return autoOpen;
}

export function OrbitWelcome({ locale, autoOpen = true }: Props) {
  const [chatOpen, setChatOpen] = useState(() => readChatOpen(autoOpen));
  const [reduceMotion, setReduceMotion] = useState(false);
  const copy = COPY[locale];

  const actions = useMemo(() => getOrbitaMenuItems(locale), [locale]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    preloadOrbitaGreetingFrames(ORBITA_FRAMES);
  }, []);

  useEffect(() => {
    if (!chatOpen) {
      document.body.classList.remove("nova-orbit-open");
      return;
    }
    document.body.classList.add("nova-orbit-open");
  }, [chatOpen]);

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
    setChatOpen(false);
  };

  return (
    <div
      className="orbita-chatbot-root pointer-events-none fixed bottom-3 right-3 z-[210] flex flex-col items-end gap-2 sm:bottom-4 sm:right-4"
      data-orbita-widget="compact-v3"
    >
      {chatOpen && (
        <div
          className={cn(
            "orbita-chatbot-panel nova-orbita-panel pointer-events-auto overflow-hidden rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
            !reduceMotion && "animate-[novito-chip-in-fast_0.08s_ease-out_both]",
          )}
          role="dialog"
          aria-modal="false"
          aria-labelledby="orbita-chat-greeting"
        >
          <div className="relative overflow-hidden rounded-[inherit] bg-nova-surface/98">
            <div className="relative z-[2] flex items-center gap-2 border-b border-white/10 px-3 py-2 pr-9">
              <div className="nova-orbita-portal nova-orbita-portal-sm relative shrink-0 rounded-lg">
                <OrbitoRealGuide
                  size="chatbot"
                  variantId="orbita"
                  mode="greeting"
                  animate
                  frameIntervalMs={ORBITA_CHAT_FRAME_MS}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">{ORBIT_IDENTITY.name}</p>
                <p className="truncate text-[10px] text-nova-cyan/90">{copy.role}</p>
              </div>
              <button
                type="button"
                className="absolute right-1.5 top-1.5 rounded-md bg-black/25 p-1 text-white/70 transition hover:text-white"
                aria-label={copy.close}
                onClick={dismiss}
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>

            <div className="relative z-[2] px-3 pb-3 pt-2.5">
              <h2 id="orbita-chat-greeting" className="text-sm font-black leading-snug text-white">
                {copy.greeting}
              </h2>
              <p className="mt-1.5 text-[11px] leading-relaxed text-nova-cyan-light/85">{copy.body}</p>

              <nav className="mt-3 flex flex-col gap-1.5" aria-label="Main navigation">
                {actions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={MENU_CHIP}
                    onClick={dismiss}
                  >
                    {action.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                className="nova-btn-primary nova-btn-glow mt-2.5 flex w-full items-center justify-center gap-1.5 py-2 text-[11px]"
                onClick={dismiss}
              >
                <Rocket className="h-3 w-3" aria-hidden />
                {copy.dismiss}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className={cn(
          "nova-orbita-panel pointer-events-auto flex items-center gap-1.5 rounded-full border bg-nova-surface/95 py-0.5 pl-0.5 pr-2.5 text-[11px] font-bold text-white backdrop-blur-md transition hover:scale-105",
          chatOpen ? "border-nova-cyan/60" : "border-nova-cyan/45",
          !reduceMotion && !chatOpen && "motion-safe:animate-[novito-float_3s_ease-in-out_infinite]",
        )}
        aria-label={chatOpen ? copy.close : copy.reopen}
        aria-expanded={chatOpen}
        onClick={() => setChatOpen((open) => !open)}
      >
        <span className="nova-orbita-portal nova-orbita-portal-sm relative shrink-0 overflow-hidden rounded-full">
          <OrbitoRealGuide
            size="fab"
            variantId="orbita"
            mode="greeting"
            animate={!chatOpen}
            frameIntervalMs={ORBITA_FAB_FRAME_MS}
          />
        </span>
        <span className="flex items-center gap-1 pr-0.5">
          {!chatOpen && <MessageCircle className="h-3 w-3 text-nova-cyan" aria-hidden />}
          {ORBIT_IDENTITY.name}
        </span>
      </button>
    </div>
  );
}

/** @deprecated Use OrbitWelcome */
export const NovitoWelcome = OrbitWelcome;
