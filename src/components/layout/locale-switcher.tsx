"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { switchLocalePath, type AppLocale } from "@/lib/locale";

const LOCALES: { code: AppLocale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
];

type Props = {
  className?: string;
  onNavigate?: () => void;
};

export function LocaleSwitcher({ className, onNavigate }: Props) {
  const pathname = usePathname();
  const current =
    pathname === "/es" || pathname.startsWith("/es/")
      ? "es"
      : pathname === "/pt" || pathname.startsWith("/pt/")
        ? "pt"
        : "en";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-0.5 rounded-xl border border-white/15 bg-white/5 p-1",
        className,
      )}
      role="navigation"
      aria-label="Language"
    >
      {LOCALES.map(({ code, label }) => {
        const href = switchLocalePath(pathname, code);
        const active = current === code;
        return (
          <Link
            key={code}
            href={href}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition sm:px-3 sm:text-xs",
              active
                ? "bg-nova-cyan/25 text-white shadow-[0_0_12px_rgba(0,180,216,0.25)]"
                : "text-nova-cyan-light/70 hover:bg-white/10 hover:text-white",
            )}
            aria-current={active ? "page" : undefined}
            title={label}
          >
            {code === "en" ? "EN" : code === "es" ? "ES" : "PT"}
          </Link>
        );
      })}
    </div>
  );
}
