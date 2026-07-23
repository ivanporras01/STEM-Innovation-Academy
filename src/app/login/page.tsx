import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { NovaLogo } from "@/components/ui/nova-logo-mark";
import { NOVA_STEM_HUB } from "@/lib/novahub-brand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Login — ${NOVA_STEM_HUB.name}`,
  description: `Sign in to ${NOVA_STEM_HUB.name} — Mission Paths, progress tracking, and STEM missions.`,
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
    <div className="flex flex-1 flex-col">
      <main className="nova-page-main flex flex-1 items-center justify-center py-12">
        <div className="nova-container max-w-md">
          <div className="nova-glass-island shadow-nova">
            <div className="mb-6 text-center">
              <div className="mb-3 flex justify-center">
                <NovaLogo size="sm" showText={true} />
              </div>
              <h1 className="text-2xl font-bold text-white">Sign in</h1>
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
              New to {NOVA_STEM_HUB.name}?{" "}
              <Link href="/register" className="font-semibold text-nova-cyan hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
      </div>
  );
}
