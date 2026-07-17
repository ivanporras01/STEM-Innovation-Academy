import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { dashboardRoutes } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  redirect(dashboardRoutes[session.user.role] ?? "/dashboard/student");
}
