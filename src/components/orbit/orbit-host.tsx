"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getLocaleFromPath } from "@/lib/locale";
import { OrbitWelcome } from "@/components/orbit/orbit-welcome";

const LEARNING_PREFIXES = ["/dashboard", "/courses", "/login", "/register", "/orbito", "/ai-tutoring"];

function isLearningRoute(pathname: string): boolean {
  if (LEARNING_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return true;
  }
  if (/\/lessons\//.test(pathname)) return true;
  if (pathname.startsWith("/experiences/") && pathname !== "/experiences") return true;
  return false;
}

function isHubLanding(pathname: string): boolean {
  return pathname === "/" || pathname === "/es" || pathname === "/pt";
}

/**
 * Orbita chatbot — welcomes anonymous visitors on marketing pages.
 * Hidden for logged-in users and all course / dashboard routes.
 */
export function OrbitHost() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status !== "loading" && session?.user) return null;

  if (isLearningRoute(pathname)) return null;

  const locale = getLocaleFromPath(pathname);
  const autoOpen = isHubLanding(pathname);

  return <OrbitWelcome locale={locale} autoOpen={autoOpen} />;
}

/** @deprecated Use OrbitHost */
export const NovitoHost = OrbitHost;
