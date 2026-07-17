import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const protectedPrefixes = ["/dashboard", "/admin"];

function isProtectedPath(pathname: string): boolean {
  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }
  return /\/courses\/[^/]+\/lessons\//.test(pathname);
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isProtected = isProtectedPath(pathname);

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isLoggedIn) {
    const role = req.auth?.user?.role ?? "STUDENT";
    const dashboardMap: Record<string, string> = {
      STUDENT: "/dashboard/student",
      MENTOR: "/dashboard/mentor",
      PARENT: "/dashboard/student",
      ADMIN: "/dashboard/admin",
      SCHOOL_ADMIN: "/dashboard/admin",
    };
    return NextResponse.redirect(
      new URL(dashboardMap[role] ?? "/dashboard/student", req.nextUrl.origin)
    );
  }

  if (pathname.startsWith("/admin") && isLoggedIn) {
    const role = req.auth?.user?.role;
    if (role !== "ADMIN" && role !== "SCHOOL_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:slug/lessons/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
