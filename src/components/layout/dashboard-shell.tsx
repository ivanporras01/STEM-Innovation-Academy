"use client";



import Link from "next/link";

import { usePathname } from "next/navigation";

import type { Role } from "@prisma/client";

import { cn, getInitials, roleLabels } from "@/lib/utils";

import {

  BookOpen,

  LayoutDashboard,

  Settings,

  Users,

} from "lucide-react";



const studentLinks = [

  { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },

  { href: "/courses", label: "Mission Paths", icon: BookOpen },

];



const mentorLinks = [

  { href: "/dashboard/mentor", label: "Overview", icon: LayoutDashboard },

  { href: "/courses", label: "Mission Paths", icon: BookOpen },

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



const roleBadgeStyles: Record<Role, string> = {

  STUDENT: "bg-nova-cyan/15 text-nova-blue border-nova-cyan/30",

  PARENT: "bg-nova-cyan/15 text-nova-blue border-nova-cyan/30",

  MENTOR: "bg-nova-green/15 text-nova-green border-nova-green/30",

  ADMIN: "bg-nova-orange/15 text-nova-orange border-nova-orange/30",

  SCHOOL_ADMIN: "bg-nova-orange/15 text-nova-orange border-nova-orange/30",

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

    <div className="relative min-h-screen bg-gradient-to-b from-[#eef2f8] via-nova-off-white to-[#e8edf5]">

      <div className="nova-starfield pointer-events-none fixed inset-0 -z-10 opacity-40" aria-hidden />

      <div className="nova-container flex gap-8 py-8">

        <aside className="hidden w-64 shrink-0 lg:block">

          <div className="nova-glass-card sticky top-24">

            <div className="mb-5 border-b border-nova-light-gray pb-4">

              <div className="mb-3 flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-nova-cyan to-nova-blue text-sm text-white shadow-[0_0_12px_rgba(0,180,216,0.35)]">

                  ✦

                </span>

                <div>

                  <p className="text-sm font-bold text-nova-deep-blue">NOVA Portal</p>

                  <span

                    className={cn(

                      "mt-0.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",

                      roleBadgeStyles[user.role]

                    )}

                  >

                    {roleLabels[user.role]}

                  </span>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue text-xs font-bold text-white">

                  {getInitials(user.firstName, user.lastName)}

                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-nova-deep-blue">

                    {user.firstName} {user.lastName}

                  </p>

                  <p className="truncate text-xs text-nova-gray">{user.email}</p>

                </div>

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


