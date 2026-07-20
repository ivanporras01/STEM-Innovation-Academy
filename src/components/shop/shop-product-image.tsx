"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NovaLogoIcon } from "@/components/ui/nova-logo-mark";

type Props = {
  imagePath: string;
  name: string;
  accent: "cyan" | "orange" | "green";
  className?: string;
  priority?: boolean;
};

const ACCENT_RING: Record<Props["accent"], string> = {
  cyan: "ring-nova-cyan/30",
  orange: "ring-nova-orange/30",
  green: "ring-nova-green/30",
};

const ACCENT_GRADIENT: Record<Props["accent"], string> = {
  cyan: "from-[#0B1D3A] via-[#0a1628] to-nova-blue",
  orange: "from-[#0B1D3A] via-[#0a1628] to-nova-orange/40",
  green: "from-[#0B1D3A] via-[#0a1628] to-nova-green/40",
};

export function ShopProductImage({ imagePath, name, accent, className, priority }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#0a1628]",
        "ring-1 ring-inset",
        ACCENT_RING[accent],
        className,
      )}
    >
      {imgError ? (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
            ACCENT_GRADIENT[accent],
          )}
        >
          <NovaLogoIcon size="lg" className="opacity-90" />
        </div>
      ) : (
        <Image
          src={imagePath}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
          priority={priority}
          onError={() => setImgError(true)}
        />
      )}
      <span className="pointer-events-none absolute bottom-2 right-2 rounded-lg bg-black/50 p-1 backdrop-blur-sm">
        <NovaLogoIcon size="sm" />
      </span>
    </div>
  );
}
