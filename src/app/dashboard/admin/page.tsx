import type { Metadata } from "next";

import Link from "next/link";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";

import { StatCard } from "@/components/ui/stat-card";

import { getAdminStats } from "@/lib/courses";

import { db } from "@/lib/db";

import { formatDate, roleLabels } from "@/lib/utils";



export const metadata: Metadata = {

  title: "Administrator Portal — NOVA",

};



export default async function AdminDashboardPage() {

  const session = await auth();

  if (!session?.user) redirect("/login");

  if (session.user.role !== "ADMIN" && session.user.role !== "SCHOOL_ADMIN") {

    redirect("/dashboard/student");

  }



  const stats = await getAdminStats();



  const recentUsers = await db.user.findMany({

    take: 5,

    orderBy: { createdAt: "desc" },

    select: {

      id: true,

      firstName: true,

      lastName: true,

      email: true,

      role: true,

      createdAt: true,

    },

  });



  return (

    <DashboardShell user={session.user}>

      <div className="mb-8">

        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-nova-orange">

          Administrator Portal

        </p>

        <h1 className="text-2xl font-bold text-white">

          Platform Overview

        </h1>

        <p className="mt-1 text-nova-cyan-light/80">

          Monitor NOVA activity, manage users and paths, and keep missions running smoothly.

        </p>

      </div>



      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard label="Total Users" value={stats.users} icon="users" />

        <StatCard label="Published Paths" value={stats.courses} icon="book" accent="green" />

        <StatCard label="Enrollments" value={stats.enrollments} icon="graduation" accent="orange" />

        <StatCard label="Schools" value={stats.schools} icon="building" accent="cyan" />

      </div>



      <div className="grid gap-6 lg:grid-cols-2">

        <div className="nova-card">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="font-semibold text-white">Recent Users</h2>

            <Link href="/dashboard/admin/users" className="text-sm text-nova-cyan hover:underline">

              Manage users →

            </Link>

          </div>

          <div className="divide-y divide-white/10">

            {recentUsers.map((user) => (

              <div key={user.id} className="flex items-center justify-between py-3">

                <div>

                  <p className="text-sm font-medium text-white">

                    {user.firstName} {user.lastName}

                  </p>

                  <p className="text-xs text-nova-cyan-light/80">{user.email}</p>

                </div>

                <div className="text-right">

                  <span className="text-xs font-medium text-nova-cyan">

                    {roleLabels[user.role]}

                  </span>

                  <p className="text-[10px] text-nova-cyan-light/80">{formatDate(user.createdAt)}</p>

                </div>

              </div>

            ))}

          </div>

        </div>



        <div className="nova-card">

          <h2 className="mb-4 font-semibold text-white">Quick Actions</h2>

          <div className="flex flex-col gap-3">

            <Link href="/dashboard/admin/users" className="nova-btn-secondary justify-start">

              Manage Users

            </Link>

            <Link href="/dashboard/admin/courses" className="nova-btn-secondary justify-start">

              Manage Mission Paths

            </Link>

            <Link href="/courses" className="nova-btn-secondary justify-start">

              View Path Catalog

            </Link>

          </div>

        </div>

      </div>

    </DashboardShell>

  );

}


