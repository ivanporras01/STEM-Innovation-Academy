"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NovaHeroLogoMark } from "@/components/ui/nova-logo-mark";

const COPY = {
  en: {
    title: "404",
    message: "This page doesn't exist in the NOVA universe yet.",
    cta: "Back to Home",
    home: "/",
  },
  es: {
    title: "404",
    message: "Esta página aún no existe en el universo NOVA.",
    cta: "Volver al inicio",
    home: "/es",
  },
  pt: {
    title: "404",
    message: "Esta página ainda não existe no universo NOVA.",
    cta: "Voltar ao início",
    home: "/pt",
  },
} as const;

function localeFromPathname(pathname: string): keyof typeof COPY {
  if (pathname.startsWith("/es")) return "es";
  if (pathname.startsWith("/pt")) return "pt";
  return "en";
}

export default function NotFound() {
  const pathname = usePathname();
  const copy = COPY[localeFromPathname(pathname ?? "/")];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/10 ring-1 ring-nova-cyan/30">
        <NovaHeroLogoMark className="h-10 w-10 min-h-10 min-w-10" />
      </span>
      <h1 className="text-4xl font-bold text-white">{copy.title}</h1>
      <p className="mt-2 max-w-md text-nova-cyan-light/80">{copy.message}</p>
      <Link href={copy.home} className="nova-btn-primary nova-btn-glow mt-6">
        {copy.cta}
      </Link>
    </div>
  );
}
