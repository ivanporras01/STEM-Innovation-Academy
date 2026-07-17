import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="nova-page-main">{children}</div>
      <Footer />
    </div>
  );
}
