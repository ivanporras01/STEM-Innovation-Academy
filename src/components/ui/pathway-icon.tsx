import Image from "next/image";
import { cn } from "@/lib/utils";

export type PathwayKey = "CODING_AI" | "ROBOTICS" | "IOT";

const PATHWAY_ASSETS: Record<PathwayKey, { src: string; alt: string; mark: string }> = {
  CODING_AI: {
    src: "/pathways/coding-ai.svg",
    alt: "Coding & AI pathway",
    mark: "✦",
  },
  ROBOTICS: {
    src: "/pathways/robotics.svg",
    alt: "Robotics pathway",
    mark: "⚙",
  },
  IOT: {
    src: "/pathways/iot.svg",
    alt: "IoT pathway",
    mark: "◎",
  },
};

type Props = {
  pathway: PathwayKey | string;
  variant?: "mark" | "hero" | "card" | "badge";
  className?: string;
};

export function PathwayIcon({ pathway, variant = "card", className }: Props) {
  const key = pathway as PathwayKey;
  const asset = PATHWAY_ASSETS[key];

  if (variant === "mark" || variant === "badge") {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center font-black leading-none text-white",
          variant === "mark" &&
            "h-[50px] w-[50px] rounded-full text-[1.15rem] bg-[radial-gradient(circle,#fff_0_6%,var(--exp-accent-2)_18%,var(--exp-accent)_50%,#173469)] shadow-[0_0_28px_color-mix(in_srgb,var(--exp-accent)_45%,transparent)]",
          variant === "badge" && "experience-badge-inner h-full w-full text-5xl",
          className
        )}
        aria-hidden
      >
        {asset?.mark ?? "✦"}
      </span>
    );
  }

  if (!asset) {
    return (
      <span
        className={cn(
          "grid h-[68px] w-[68px] place-items-center rounded-[20px] bg-nova-deep-blue text-2xl text-white",
          className
        )}
        aria-hidden
      >
        ✦
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 overflow-hidden",
        variant === "card" && "h-[68px] w-[68px] rounded-[20px]",
        variant === "hero" && "h-28 w-28 rounded-[32px]",
        className
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        className="object-cover"
        sizes={variant === "hero" ? "112px" : "68px"}
      />
    </span>
  );
}

export function getPathwayMark(pathway: PathwayKey | string): string {
  return PATHWAY_ASSETS[pathway as PathwayKey]?.mark ?? "✦";
}
