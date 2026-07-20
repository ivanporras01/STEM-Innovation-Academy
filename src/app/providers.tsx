"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { OrbitHost } from "@/components/orbit/orbit-host";
import { getLocaleFromPath } from "@/lib/locale";

function DocumentLang() {
  const pathname = usePathname();
  useEffect(() => {
    const locale = getLocaleFromPath(pathname);
    document.documentElement.lang = locale === "es" ? "es" : locale === "pt" ? "pt" : "en";
  }, [pathname]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={false}>
      <DocumentLang />
      {children}
      <OrbitHost />
    </SessionProvider>
  );
}
