import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      firstName: string;
      lastName: string;
      name: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: Role;
    firstName: string;
    lastName: string;
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.name = `${token.firstName} ${token.lastName}`;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const dashboardRoutes: Record<Role, string> = {
  STUDENT: "/dashboard/student",
  MENTOR: "/dashboard/mentor",
  PARENT: "/dashboard/student",
  ADMIN: "/dashboard/admin",
  SCHOOL_ADMIN: "/dashboard/admin",
};

export function requireRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}
