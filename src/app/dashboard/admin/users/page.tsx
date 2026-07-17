import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { db } from "@/lib/db";
import { roleLabels, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Manage Users",
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "SCHOOL_ADMIN") {
    redirect("/dashboard/student");
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { school: { select: { name: true } } },
  });

  return (
    <DashboardShell user={session.user}>
      <h1 className="mb-6 text-2xl font-bold text-white">Users</h1>

      <div className="nova-card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-nova-cyan-light/70">
              <th className="pb-3 pr-4 font-medium">Name</th>
              <th className="pb-3 pr-4 font-medium">Email</th>
              <th className="pb-3 pr-4 font-medium">Role</th>
              <th className="pb-3 pr-4 font-medium">School</th>
              <th className="pb-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10">
                <td className="py-3 pr-4 font-medium text-white">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 pr-4 text-nova-cyan-light/80">{user.email}</td>
                <td className="py-3 pr-4">
                  <Badge variant="cyan">{roleLabels[user.role]}</Badge>
                </td>
                <td className="py-3 pr-4 text-nova-cyan-light/80">
                  {user.school?.name ?? "—"}
                </td>
                <td className="py-3 text-nova-cyan-light/80">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
