import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/ui/stat-card";
import { getAdminStats } from "@/lib/courses";
import { db } from "@/lib/db";
import { roleLabels } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
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
        <h1 className="text-2xl font-bold text-nova-deep-blue">Admin Dashboard</h1>
        <p className="mt-1 text-nova-gray">NOVA platform overview and management</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={stats.users} icon="users" />
        <StatCard label="Published Courses" value={stats.courses} icon="book" accent="green" />
        <StatCard label="Enrollments" value={stats.enrollments} icon="graduation" accent="orange" />
        <StatCard label="Schools" value={stats.schools} icon="building" accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="nova-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-nova-deep-blue">Recent Users</h2>
            <Link href="/dashboard/admin/users" className="text-sm text-nova-cyan hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-nova-light-gray">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-nova-deep-blue">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-nova-gray">{user.email}</p>
                </div>
                <span className="text-xs font-medium text-nova-cyan">
                  {roleLabels[user.role]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="nova-card">
          <h2 className="mb-4 font-semibold text-nova-deep-blue">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/admin/users" className="nova-btn-secondary justify-start">
              Manage Users
            </Link>
            <Link href="/dashboard/admin/courses" className="nova-btn-secondary justify-start">
              Manage Courses
            </Link>
            <Link href="/courses" className="nova-btn-secondary justify-start">
              View Course Catalog
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
