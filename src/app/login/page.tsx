import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login — NOVA Portal",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="nova-container max-w-md">
          <div className="nova-card shadow-nova">
            <div className="mb-6 text-center">
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan to-nova-blue text-xl text-white">
                ✦
              </span>
              <h1 className="text-2xl font-bold text-nova-deep-blue">NOVA Portal</h1>
              <p className="mt-1 text-sm text-nova-gray">
                Sign in to access your learning dashboard
              </p>
            </div>

            {params.registered && (
              <div className="mb-4 rounded-xl border border-nova-green/30 bg-nova-green/10 px-4 py-3 text-sm text-nova-green">
                Account created! Please sign in.
              </div>
            )}

            <LoginForm callbackUrl={params.callbackUrl} />

            <div className="mt-6 rounded-xl bg-nova-off-white p-4 text-xs text-nova-gray">
              <p className="mb-2 font-semibold text-nova-dark-gray">Demo accounts (password: nova2026)</p>
              <p>Student: student@steminnovationacademy.org</p>
              <p>Mentor: mentor@steminnovationacademy.org</p>
              <p>Admin: admin@steminnovationacademy.org</p>
            </div>

            <p className="mt-4 text-center text-sm text-nova-gray">
              New to NOVA?{" "}
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
