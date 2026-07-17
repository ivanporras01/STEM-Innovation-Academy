"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@prisma/client";
import { cn, getInitials, roleLabels } from "@/lib/utils";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  ClipboardList,
} from "lucide-react";

const studentLinks = [
  { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
  { href: "/courses", label: "My Courses", icon: BookOpen },
];

const mentorLinks = [
  { href: "/dashboard/mentor", label: "Overview", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/courses", label: "Courses", icon: Settings },
  { href: "/courses", label: "Catalog", icon: BookOpen },
];

const linksByRole: Record<Role, typeof studentLinks> = {
  STUDENT: studentLinks,
  MENTOR: mentorLinks,
  PARENT: studentLinks,
  ADMIN: adminLinks,
  SCHOOL_ADMIN: adminLinks,
};

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: {
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
  };
}) {
  const pathname = usePathname();
  const links = linksByRole[user.role];

  return (
    <div className="min-h-screen bg-nova-off-white">
      <div className="nova-container flex gap-8 py-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="nova-card sticky top-24">
            <div className="mb-6 flex items-center gap-3 border-b border-nova-light-gray pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue text-sm font-bold text-white">
                {getInitials(user.firstName, user.lastName)}
              </div>
              <div>
                <p className="text-sm font-semibold text-nova-deep-blue">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-nova-gray">{roleLabels[user.role]}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      active
                        ? "bg-nova-cyan/10 text-nova-blue"
                        : "text-nova-dark-gray hover:bg-nova-off-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "cyan",
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "cyan" | "green" | "orange";
}) {
  const colors = {
    cyan: "from-nova-cyan/20 to-nova-blue/10 text-nova-blue",
    green: "from-nova-green/20 to-nova-green/5 text-nova-green",
    orange: "from-nova-orange/20 to-nova-orange/5 text-nova-orange",
  };

  return (
    <div className="nova-card flex items-center gap-4">
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", colors[accent])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-nova-deep-blue">{value}</p>
        <p className="text-sm text-nova-gray">{label}</p>
      </div>
    </div>
  );
}

export { GraduationCap, ClipboardList };
