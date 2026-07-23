"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NovaLogo } from "@/components/ui/nova-logo-mark";

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
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 text-center">
      <div className="mb-4">
        <NovaLogo size="sm" showText={true} />
      </div>
      <h1 className="text-4xl font-bold text-white">{copy.title}</h1>
      <p className="mt-2 max-w-md text-nova-cyan-light/80">{copy.message}</p>
      <Link href={copy.home} className="nova-btn-primary nova-btn-glow mt-6">
        {copy.cta}
      </Link>
    </div>
  );
}
