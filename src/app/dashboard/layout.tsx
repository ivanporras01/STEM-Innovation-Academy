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
      <section className="nova-section-cosmic border-b border-white/10 py-6 text-white">
        <div className="nova-container">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-nova-cyan">
            ✦ NOVA Portal · Mission Command
          </p>
          <p className="mt-1 max-w-2xl text-sm text-white/70">
            Your progress, Mission Paths, and Explore Now quests — all in one place inside the NOVA universe.
          </p>
        </div>
      </section>
      <div className="nova-page-main">{children}</div>
      <Footer />
    </div>
  );
}
