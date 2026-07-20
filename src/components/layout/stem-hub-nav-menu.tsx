"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, BookOpen, Briefcase, Building2, DollarSign, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NovaStemHubNav } from "@/lib/nova-nav";

const HEADER_OFFSET_PX = 88;

const SECTION_ICONS = [BookOpen, DollarSign, Briefcase, Building2] as const;

type Props = {
  hub: NovaStemHubNav;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function StemHubNavMenu({ hub, variant, onNavigate }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Always close when route changes — prevents overlay stuck on new pages */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (variant !== "desktop" || !open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, variant]);

  useEffect(() => {
    if (variant !== "desktop" || !open) return;

    document.body.classList.add("nova-nav-explore-open", "nova-hyperspace");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("nova-nav-explore-open", "nova-hyperspace");
      document.body.style.overflow = prevOverflow;
    };
  }, [open, variant]);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5">
        <button
          type="button"
          className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold text-white"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex items-center gap-2">
            <Library className="h-4 w-4 text-nova-cyan" aria-hidden />
            {hub.menuLabel}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} aria-hidden />
        </button>
        {open && (
          <div id={menuId} className="flex flex-col gap-3 border-t border-white/10 p-3">
            <Link
              href={hub.homeHref}
              className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-nova-cyan hover:bg-white/10"
              onClick={close}
            >
              {hub.homeLabel}
            </Link>
            {hub.sections.map((section) => (
              <div key={section.title}>
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-nova-cyan-light/50">
                  {section.title}
                </p>
                <div className="flex flex-col gap-0.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-nova-cyan-light"
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const megaMenu =
    open && mounted
      ? createPortal(
          <>
            <button
              type="button"
              className="nova-nav-mega-backdrop fixed inset-0 z-[200] bg-[#030712]/88 backdrop-blur-md"
              style={{ top: HEADER_OFFSET_PX }}
              aria-label="Close menu"
              onClick={close}
            />

            <div
              id={`${menuId}-mega`}
              role="menu"
              aria-label={hub.megaTitle}
              className="nova-nav-mega-panel fixed left-0 right-0 z-[201] border-b border-nova-cyan/25 bg-[#0a1628] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
              style={{ top: HEADER_OFFSET_PX }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 top-0 h-40 w-40 rounded-full bg-nova-cyan/10 blur-3xl" />
                <div className="absolute -right-10 top-4 h-32 w-32 rounded-full bg-nova-orange/8 blur-3xl" />
              </div>

              <div className="nova-container relative max-h-[min(70vh,520px)] overflow-y-auto py-6 sm:py-8">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-nova-cyan">
                      NOVA STEM HUB
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">{hub.megaTitle}</h2>
                  </div>
                  <Link
                    href={hub.homeHref}
                    role="menuitem"
                    className="nova-btn-secondary inline-flex shrink-0 border-white/20 text-sm text-white hover:border-nova-cyan/40"
                    onClick={close}
                  >
                    {hub.homeLabel} →
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                  {hub.sections.map((section, index) => {
                    const Icon = SECTION_ICONS[index] ?? BookOpen;
                    return (
                      <div key={section.title} className="min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-nova-cyan/25 bg-nova-cyan/10">
                            <Icon className="h-4 w-4 text-nova-cyan" aria-hidden />
                          </span>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-nova-cyan-light/80">
                            {section.title}
                          </h3>
                        </div>
                        <ul className="space-y-0.5">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                role="menuitem"
                                className="group block rounded-xl px-3 py-2.5 transition hover:bg-white/[0.07]"
                                onClick={close}
                              >
                                <span className="block text-sm font-semibold text-white group-hover:text-nova-cyan-light">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block text-xs leading-relaxed text-nova-cyan-light/55 group-hover:text-nova-cyan-light/75">
                                    {link.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <div ref={rootRef} className="relative shrink-0">
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent px-2.5 py-2 text-xs font-medium text-white/85 transition hover:border-white/10 hover:bg-white/10 hover:text-nova-cyan-light lg:px-3 lg:text-sm",
            open && "border-nova-cyan/30 bg-nova-cyan/10 text-nova-cyan-light shadow-[0_0_20px_rgba(0,180,216,0.2)]",
          )}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={`${menuId}-mega`}
          onClick={() => setOpen((value) => !value)}
        >
          <Library className="h-3.5 w-3.5 text-nova-cyan/90" aria-hidden />
          {hub.menuLabel}
          <ChevronDown className={cn("h-3.5 w-3.5 opacity-70 transition", open && "rotate-180")} aria-hidden />
        </button>
      </div>
      {megaMenu}
    </>
  );
}
