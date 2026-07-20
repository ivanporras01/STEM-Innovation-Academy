import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";
import { NovaHeroLogoMark } from "@/components/ui/nova-logo-mark";
import { NOVA_SCHOOL } from "@/lib/nova-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Login — ${NOVA_SCHOOL.portalName}`,
  description: `Sign in to ${NOVA_SCHOOL.portalName} — Mission Paths, progress tracking, and STEM missions.`,
  path: "/login",
  noIndex: true,
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="nova-page-main flex flex-1 items-center justify-center py-12">
        <div className="nova-container max-w-md">
          <div className="nova-glass-island shadow-nova">
            <div className="mb-6 text-center">
              <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/10 ring-1 ring-nova-cyan/30">
                <NovaHeroLogoMark className="h-10 w-10 min-h-10 min-w-10 sm:h-11 sm:w-11 sm:min-h-11 sm:min-w-11" />
              </span>
              <h1 className="text-2xl font-bold text-white">{NOVA_SCHOOL.portalName}</h1>
              <p className="mt-1 text-sm text-nova-cyan-light/80">
                Enter your mission command center — Explorers, Mentors, and administrators welcome.
              </p>
            </div>

            {params.registered && (
              <div className="mb-4 rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
                Account created! Please sign in.
              </div>
            )}

            <LoginForm callbackUrl={params.callbackUrl} />

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-nova-cyan-light/80">
              <p className="mb-2 font-semibold text-white">Demo accounts (password: nova2026)</p>
              <p>Explorer: student@steminnovationacademy.org</p>
              <p>Mentor: mentor@steminnovationacademy.org</p>
              <p>Admin: admin@steminnovationacademy.org</p>
            </div>

            <p className="mt-4 text-center text-sm text-nova-cyan-light/80">
              New to {NOVA_SCHOOL.name}?{" "}
              <Link href="/register" className="font-semibold text-nova-cyan hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
