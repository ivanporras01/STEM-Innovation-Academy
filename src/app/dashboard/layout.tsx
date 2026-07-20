import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NOVA_SCHOOL } from "@/lib/nova-brand";
import { NovaLogoIcon } from "@/components/ui/nova-logo-mark";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${NOVA_SCHOOL.portalName} Dashboard`,
  description: "Private learner and mentor portal — not indexed.",
  path: "/dashboard",
  noIndex: true,
});

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
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-nova-cyan">
            <NovaLogoIcon size="sm" className="h-5 w-5 min-h-5 min-w-5" />
            {NOVA_SCHOOL.portalName} · Mission Command
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
