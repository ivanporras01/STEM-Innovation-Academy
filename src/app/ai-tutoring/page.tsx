import type { Metadata } from "next";
import { Atom, Orbit, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { isNovaAiTutoringEnabled } from "@/lib/nova-ai-tutoring";

export const metadata: Metadata = {
  title: "NOVA AI Tutoring — Coming Soon",
  description: "NOVA AI Tutoring for Middle and High School Math and Science is coming soon.",
};

export default async function AiTutoringPage() {
  if (!isNovaAiTutoringEnabled) {
    return (
      <>
        <Navbar />
        <main className="nova-section-cosmic relative overflow-hidden py-20 text-white sm:py-28">
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.16),transparent_26%),radial-gradient(circle_at_80%_65%,rgba(127,86,217,0.2),transparent_30%)]" />
          <div className="nova-container relative max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-nova-orange/40 bg-nova-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-nova-orange">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Coming Soon
              </p>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
                NOVA AI Tutoring is on its way.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-nova-cyan-light/85 sm:text-xl">
                A future discovery space for Middle and High School Math &amp; Science—designed to help Explorers think through problems, test ideas, and celebrate each breakthrough.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Orbit, title: "Guided discovery", text: "Thoughtful prompts that make each next step feel possible." },
                { icon: Atom, title: "Math & Science", text: "Support being shaped for the questions Explorers meet most." },
                { icon: Sparkles, title: "Built for breakthroughs", text: "A warm NOVA experience made for curiosity—not pressure." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="nova-glass-card p-6 text-left">
                  <Icon className="h-6 w-6 text-nova-cyan" aria-hidden />
                  <h2 className="mt-4 text-lg font-bold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                </article>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/60">
              The tutoring classroom is still being prepared. Check back soon for launch updates.
            </p>
          </div>
        </main>
      </>
    );
  }

  const session = await auth();
  const { AiTutoringExperience } = await import("@/components/ai-tutoring/ai-tutoring-experience");

  return (
    <>
      <Navbar />
      <AiTutoringExperience studentName={session?.user?.firstName ?? ""} />
    </>
  );
}
