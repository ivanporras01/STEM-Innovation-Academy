"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Rocket, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AppLocale } from "@/lib/locale";
import { getNovaStemHubNav, getOrbitaMenuItems } from "@/lib/nova-nav";
import { NOVA_COLLEGE, NOVA_LANGUAGE, NOVA_SCHOOL, NOVA_SHOP } from "@/lib/novahub-brand";
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
    body: "I'm Orbita — pick a product or open NOVA Resources, just like the menu above.",
    dismiss: "Start exploring",
    reopen: "Chat with Orbita",
    close: "Close chat",
  },
  es: {
    role: "Guía de bienvenida NOVA",
    greeting: "Bienvenido a NOVA STEM HUB.",
    body: "Soy Orbita — elige un producto o NOVA Resources, igual que el menú de arriba.",
    dismiss: "Empezar a explorar",
    reopen: "Hablar con Orbita",
    close: "Cerrar chat",
  },
  pt: {
    role: "Guia de boas-vindas NOVA",
    greeting: "Bem-vindo ao NOVA STEM HUB.",
    body: "Sou Orbita — escolha um produto ou NOVA Resources, como no menu acima.",
    dismiss: "Começar a explorar",
    reopen: "Falar com Orbita",
    close: "Fechar chat",
  },
} as const;

/** Match navbar product accent colors */
function menuAccent(label: string): string {
  if (label === NOVA_SCHOOL.name) {
    return "from-nova-cyan/20 to-nova-cyan/5 border-nova-cyan/30";
  }
  if (label === NOVA_COLLEGE.name) {
    return "from-nova-orange/20 to-nova-orange/5 border-nova-orange/30";
  }
  if (label === NOVA_LANGUAGE.name) {
    return "from-nova-green/20 to-nova-green/5 border-nova-green/30";
  }
  if (label === NOVA_SHOP.name) {
    return "from-nova-cyan/15 to-nova-blue/10 border-nova-cyan/25";
  }
  return "from-nova-blue/20 to-nova-violet/10 border-white/20";
}

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

  const actions = useMemo(() => {
    const resourcesLabel = getNovaStemHubNav(locale).menuLabel;
    return getOrbitaMenuItems(locale).map((item) => ({
      ...item,
      accent: menuAccent(item.label),
      wide: item.label === resourcesLabel,
    }));
  }, [locale]);

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
          <div className="relative overflow-hidden rounded-[inherit] bg-[#0a1628]/98">
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

              <nav className="mt-2.5 grid grid-cols-2 gap-1" aria-label="Main navigation">
                {actions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={cn(
                      "rounded-md border bg-gradient-to-br px-1.5 py-2 text-[9px] font-semibold leading-tight text-white transition hover:-translate-y-0.5 sm:text-[10px]",
                      action.accent,
                      action.wide && "col-span-2",
                    )}
                    onClick={dismiss}
                  >
                    {action.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                className="nova-btn-primary nova-btn-glow mt-2 flex w-full items-center justify-center gap-1.5 py-1.5 text-[11px]"
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
          "nova-orbita-panel pointer-events-auto flex items-center gap-1.5 rounded-full border bg-[#0a1628]/95 py-0.5 pl-0.5 pr-2.5 text-[11px] font-bold text-white backdrop-blur-md transition hover:scale-105",
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
