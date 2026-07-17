"use client";

import { useEffect, useRef } from "react";

type StarTint = "white" | "cyan" | "orange";

type Star = {
  bx: number;
  by: number;
  z: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  tint: StarTint;
  prevPx: number;
  prevPy: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

const STAR_COUNT = 520;
const TINT_COLORS: Record<StarTint, [number, number, number]> = {
  white: [255, 255, 255],
  cyan: [110, 231, 249],
  orange: [255, 180, 100],
};

function pickTint(): StarTint {
  const r = Math.random();
  if (r < 0.12) return "cyan";
  if (r < 0.2) return "orange";
  return "white";
}

/**
 * Full-viewport animated cosmos — warp-speed starfield with depth, parallax, and shooting stars.
 */
export function NovaCosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let lastShootingStarSpawn = 0;
    let scrollBoost = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

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
        bx: (Math.random() - 0.5) * 2,
        by: (Math.random() - 0.5) * 2,
        z: Math.random() * 0.95 + 0.05,
        radius: Math.random() * 2.4 + 0.5,
        opacity: Math.random() * 0.45 + 0.55,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        tint: pickTint(),
        prevPx: 0,
        prevPy: 0,
      }));
    }

    function spawnShootingStar() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const fromTop = Math.random() > 0.5;
      shootingStars.push({
        x: Math.random() * w,
        y: fromTop ? -10 : Math.random() * h * 0.4,
        vx: (Math.random() - 0.3) * 14,
        vy: Math.random() * 10 + 8,
        life: 1,
        maxLife: 1,
      });
    }

    function projectStar(star: Star, cx: number, cy: number, spread: number) {
      const scale = spread / star.z;
      return {
        px: cx + star.bx * scale + parallaxX * (1 - star.z) * 18,
        py: cy + star.by * scale + parallaxY * (1 - star.z) * 18,
        size: star.radius * (1.4 / star.z) * 0.55,
      };
    }

    function draw(time: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const spread = Math.min(w, h) * 0.55;

      parallaxX += (targetParallaxX - parallaxX) * 0.06;
      parallaxY += (targetParallaxY - parallaxY) * 0.06;
      scrollBoost *= 0.94;

      const speedMult = 1 + scrollBoost * 2.8;
      root!.style.setProperty("--nova-parallax-x", `${parallaxX}px`);
      root!.style.setProperty("--nova-parallax-y", `${parallaxY}px`);
      root!.classList.toggle("nova-hyperspace", scrollBoost > 0.35);

      ctx!.clearRect(0, 0, w, h);

      for (const star of stars) {
        const warpSpeed = (0.008 + (1 - star.z) * 0.022) * speedMult;
        star.z -= warpSpeed;

        if (star.z <= 0.02) {
          star.bx = (Math.random() - 0.5) * 2;
          star.by = (Math.random() - 0.5) * 2;
          star.z = 1;
          star.tint = pickTint();
          star.prevPx = cx;
          star.prevPy = cy;
        }

        const { px, py, size } = projectStar(star, cx, cy, spread);
        const depth = 1 - star.z;
        const twinkle =
          0.65 + 0.35 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = Math.min(1, star.opacity * twinkle * (0.35 + depth * 0.85));
        const [r, g, b] = TINT_COLORS[star.tint];

        if (depth > 0.35 && star.z < 0.85) {
          const streakLen = depth * speedMult * 12;
          const dx = px - star.prevPx;
          const dy = py - star.prevPy;
          const len = Math.hypot(dx, dy) || 1;
          ctx!.beginPath();
          ctx!.moveTo(px, py);
          ctx!.lineTo(px - (dx / len) * streakLen, py - (dy / len) * streakLen);
          ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.55})`;
          ctx!.lineWidth = size * 0.7;
          ctx!.stroke();
        }

        ctx!.beginPath();
        ctx!.arc(px, py, Math.max(0.6, size), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.fill();

        if (depth > 0.5) {
          ctx!.beginPath();
          ctx!.arc(px, py, size * 2.8, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.22})`;
          ctx!.fill();
        }

        star.prevPx = px;
        star.prevPy = py;
      }

      if (time - lastShootingStarSpawn > 2200 + Math.random() * 4000) {
        spawnShootingStar();
        lastShootingStarSpawn = time;
        if (Math.random() > 0.6) spawnShootingStar();
      }

      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.vx * speedMult;
        ss.y += ss.vy * speedMult;
        ss.life -= 0.028 * speedMult;

        if (ss.life <= 0) return false;

        const fade = ss.life / ss.maxLife;
        const tailLen = 80 * fade;
        const angle = Math.atan2(ss.vy, ss.vx);

        const grad = ctx!.createLinearGradient(
          ss.x,
          ss.y,
          ss.x - Math.cos(angle) * tailLen,
          ss.y - Math.sin(angle) * tailLen
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${fade * 0.95})`);
        grad.addColorStop(0.3, `rgba(110, 231, 249, ${fade * 0.5})`);
        grad.addColorStop(1, "rgba(110, 231, 249, 0)");

        ctx!.beginPath();
        ctx!.moveTo(ss.x, ss.y);
        ctx!.lineTo(
          ss.x - Math.cos(angle) * tailLen,
          ss.y - Math.sin(angle) * tailLen
        );
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2.2 * fade;
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.arc(ss.x, ss.y, 2.5 * fade, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx!.fill();

        return ss.x > -100 && ss.x < w + 100 && ss.y > -100 && ss.y < h + 100;
      });

      animationId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      targetParallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetParallaxY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollBoost = Math.min(1.2, scrollBoost + delta * 0.018);
    };

    const onWheel = (e: WheelEvent) => {
      scrollBoost = Math.min(1.2, scrollBoost + Math.abs(e.deltaY) * 0.0015);
    };

    resize();
    initStars();
    animationId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div ref={rootRef} className="nova-cosmos-root" aria-hidden>
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
