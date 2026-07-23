import type { Metadata } from "next";
import { Atom, Orbit, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { buildPageMetadata } from "@/lib/seo";
import { isNovaAiTutoringEnabled } from "@/lib/nova-ai-tutoring";

export const metadata: Metadata = buildPageMetadata({
  title: isNovaAiTutoringEnabled
    ? "NOVA AI Tutoring — Órbita"
    : "NOVA AI Tutoring — Coming Soon",
  description: isNovaAiTutoringEnabled
    ? "Private Math & Science discovery sessions with Órbita for Middle and High School (grades 6–12)."
    : "NOVA AI Tutoring for Middle and High School Math and Science is coming soon.",
  path: "/ai-tutoring",
  noIndex: true,
});

export default async function AiTutoringPage() {
  if (!isNovaAiTutoringEnabled) {
    return (
      <>
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
                A quiet Math &amp; Science tutoring space for Middle &amp; High School (grades 6–12)—designed to help Explorers think through problems, one step at a time.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Orbit, title: "Guided steps", text: "Thoughtful prompts that make each next step feel possible." },
                { icon: Atom, title: "Math & Science", text: "Middle & High School only—grades 6–12, no other subjects." },
                { icon: Sparkles, title: "Built for focus", text: "A calm NOVA experience made for learning—not pressure." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="nova-glass-card p-6 text-left">
                  <Icon className="h-6 w-6 text-nova-cyan" aria-hidden />
                  <h2 className="mt-4 text-lg font-bold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                </article>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/60">
              The tutoring classroom is still being prepared. Check back soon.
            </p>
          </div>
        </main>
      </>
    );
  }

  // Isolated local/preview classroom — no HUB navbar or site chrome.
  const session = await auth();
  const { AiTutoringExperience } = await import("@/components/ai-tutoring/ai-tutoring-experience");

  return <AiTutoringExperience studentName={session?.user?.firstName ?? ""} />;
}
