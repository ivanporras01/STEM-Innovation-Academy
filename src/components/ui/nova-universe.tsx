"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

/**
 * Full-viewport animated cosmos — stars drift toward the Explorer (infinite space feel).
 */
export function NovaCosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let stars: Star[] = [];
    const STAR_COUNT = 220;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1.5 + 0.2,
        radius: Math.random() * 2.2 + 0.4,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const star of stars) {
        star.y += star.z * 0.35;
        star.x += Math.sin(time * 0.0003 + star.twinklePhase) * 0.08 * star.z;

        if (star.y > h + 4) {
          star.y = -4;
          star.x = Math.random() * w;
        }
        if (star.x < -4) star.x = w + 4;
        if (star.x > w + 4) star.x = -4;

        const twinkle =
          0.55 + 0.45 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.opacity * twinkle;
        const r = star.radius * (0.6 + star.z * 0.5);

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx!.fill();

        if (star.z > 1 && twinkle > 0.85) {
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, r * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(110, 231, 249, ${alpha * 0.15})`;
          ctx!.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    animationId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="nova-cosmos-root" aria-hidden>
      <div className="nova-nebula nova-nebula--cyan" />
      <div className="nova-nebula nova-nebula--violet" />
      <div className="nova-nebula nova-nebula--orange" />
      <canvas ref={canvasRef} className="nova-cosmos-canvas" />
      <div className="nova-cosmos-vignette" />
    </div>
  );
}

/** Legacy wrapper — canvas + nebulae replace subtle CSS-only stars */
export function NovaStarfield({ dense: _dense, className = "" }: { dense?: boolean; className?: string }) {
  return <NovaCosmosBackground />;
}

export function NovaOrbitRings({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-52 w-52",
    md: "h-80 w-80 sm:h-96 sm:w-96",
    lg: "h-[28rem] w-[28rem]",
  };
  return (
    <div className={`relative ${sizes[size]} ${className}`} aria-hidden>
      <div className="nova-orbit-ring absolute inset-0 rounded-full border-2 border-nova-cyan/40 shadow-[0_0_30px_rgba(0,180,216,0.2)]" />
      <div className="nova-orbit-ring nova-orbit-ring--reverse absolute inset-[10%] rounded-full border border-dashed border-nova-cyan/50" />
      <div className="nova-orbit-ring absolute inset-[22%] rounded-full border border-white/20" />
      <div className="nova-orbit-ring nova-orbit-ring--reverse absolute inset-[34%] rounded-full border border-nova-cyan/20" />
      <div className="nova-orbit-satellite absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-nova-cyan shadow-[0_0_20px_#00b4d8,0_0_40px_#00b4d8]" />
      <div className="nova-orbit-satellite nova-orbit-satellite--slow absolute bottom-[12%] right-[6%] h-2 w-2 rounded-full bg-nova-orange shadow-[0_0_16px_#ff7a00]" />
      <div className="nova-orbit-satellite nova-orbit-satellite--fast absolute left-[8%] top-[45%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
    </div>
  );
}

export function NovaUniverseShell({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "cosmos" | "nebula" | "light";
}) {
  return (
    <div
      className={
        variant === "cosmos"
          ? "nova-universe-cosmos relative min-h-screen"
          : variant === "nebula"
            ? "nova-universe-nebula relative min-h-screen"
            : "nova-universe-light relative min-h-screen"
      }
    >
      <NovaCosmosBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
