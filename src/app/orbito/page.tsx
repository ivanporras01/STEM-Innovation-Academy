"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { OrbitoRealGuide } from "@/components/orbit/orbito-real-guide";
import { ORBITO_REAL_VARIANTS, type OrbitoRealId } from "@/components/orbit/orbito-real-catalog";

export default function OrbitoGalleryPage() {
  const [index, setIndex] = useState(3); // Opción 4 · Orbita
  const [mode, setMode] = useState<"greeting" | "scan">("greeting");
  const [animating, setAnimating] = useState(false);

  const variant = ORBITO_REAL_VARIANTS[index];
  const guideMode = mode === "scan" ? "scan" : "greeting";
  const total = ORBITO_REAL_VARIANTS.length;

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="nova-space-section flex-1">
        <PageHero
          title="Elige tu Orbita"
          description="Uno por uno — usa las flechas para comparar. Cuando elijas, escríbeme el número."
          align="center"
          className="py-8"
        />
        <div className="nova-container pb-8">

          {/* Single robot viewer */}
          <div className="nova-glass-card mx-auto max-w-lg border-2 border-nova-cyan/30 p-6 sm:p-8">
            {/* Big number */}
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-nova-cyan text-5xl font-black text-nova-abyss shadow-[0_0_40px_rgba(0,180,216,0.4)]">
                {variant.number}
              </div>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.3em] text-nova-orange">
                Opción {variant.number} de {total}
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">{variant.name}</h2>
              <p className="mt-1 text-sm text-nova-cyan-light/60">{variant.vibe}</p>
            </div>

            {/* Robot — one at a time */}
            <div className="relative mx-auto my-8 flex h-[420px] items-end justify-center">
              <OrbitoRealGuide
                key={variant.id}
                variantId={variant.id as OrbitoRealId}
                size="hero"
                mode={guideMode}
                animate={animating && mode === "greeting"}
                frameIntervalMs={1600}
              />
            </div>

            <p className="text-center text-sm text-nova-cyan-light/80">{variant.taglineEs}</p>

            {/* Mode toggles */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                className={`nova-btn-secondary inline-flex border-white/20 text-sm text-white ${mode === "greeting" ? "border-nova-cyan/50 bg-nova-cyan/10" : ""}`}
                onClick={() => { setMode("greeting"); setAnimating(false); }}
              >
                👋 Saludo (fijo)
              </button>
              <button
                type="button"
                className={`nova-btn-secondary inline-flex border-white/20 text-sm text-white ${mode === "scan" ? "border-nova-cyan/50 bg-nova-cyan/10" : ""}`}
                onClick={() => { setMode("scan"); setAnimating(false); }}
              >
                🔍 Scan (fijo)
              </button>
              {mode === "greeting" && (
                <button
                  type="button"
                  className={`nova-btn-secondary inline-flex border-white/20 text-sm text-white ${animating ? "border-nova-orange/50 bg-nova-orange/10" : ""}`}
                  onClick={() => setAnimating((v) => !v)}
                >
                  {animating ? "⏸ Pausar" : "▶ Animar lento"}
                </button>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goPrev}
                className="nova-btn-secondary inline-flex items-center gap-1 border-white/20 text-sm text-white"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Anterior
              </button>

              <div className="flex gap-2">
                {ORBITO_REAL_VARIANTS.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-label={`Opción ${v.number}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => { setIndex(i); setAnimating(false); }}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
                      i === index
                        ? "bg-nova-cyan text-nova-abyss shadow-[0_0_16px_rgba(0,180,216,0.5)]"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {v.number}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="nova-btn-secondary inline-flex items-center gap-1 border-white/20 text-sm text-white"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Pick CTA */}
            <div className="mt-8 rounded-xl border border-nova-cyan/35 bg-nova-cyan/10 px-5 py-4 text-center">
              <p className="text-lg font-bold text-white">
                ¿Te gusta este? Escríbeme:
              </p>
              <p className="mt-1 text-3xl font-black text-nova-cyan">Opción {variant.number}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="nova-btn-primary nova-btn-glow inline-flex text-sm">
              Probar saludo en la home →
            </Link>
          </div>
        </div>
      </main>

      </div>
  );
}
