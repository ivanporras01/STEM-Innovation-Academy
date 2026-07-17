import Image from "next/image";
import { cn } from "@/lib/utils";

export type PathwayKey = "CODING_AI" | "ROBOTICS" | "IOT";

const PATHWAY_ASSETS: Record<PathwayKey, { src: string; alt: string }> = {
  CODING_AI: {
    src: "/pathways/coding-ai.svg",
    alt: "Coding & Artificial Intelligence pathway",
  },
  ROBOTICS: {
    src: "/pathways/robotics.svg",
    alt: "Robotics & Engineering Design pathway",
  },
  IOT: {
    src: "/pathways/iot.svg",
    alt: "IoT & Emerging Technologies pathway",
  },
};

const VARIANT_STYLES = {
  mark: {
    box: "h-[50px] w-[50px] rounded-full bg-[radial-gradient(circle,#fff_0_6%,var(--exp-accent-2)_18%,var(--exp-accent)_50%,#173469)] shadow-[0_0_28px_color-mix(in_srgb,var(--exp-accent)_45%,transparent)] p-[7px]",
    sizes: "36px",
  },
  sm: {
    box: "h-12 w-12 rounded-[16px]",
    sizes: "48px",
  },
  card: {
    box: "h-[68px] w-[68px] rounded-[20px]",
    sizes: "68px",
  },
  hero: {
    box: "h-28 w-28 rounded-[32px]",
    sizes: "112px",
  },
  badge: {
    box: "h-[88px] w-[88px] rounded-[24px]",
    sizes: "88px",
  },
} as const;

type Props = {
  pathway: PathwayKey | string;
  variant?: keyof typeof VARIANT_STYLES;
  className?: string;
};

export function PathwayIcon({ pathway, variant = "card", className }: Props) {
  const key = pathway as PathwayKey;
  const asset = PATHWAY_ASSETS[key];
  const styles = VARIANT_STYLES[variant];

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
        "relative inline-grid shrink-0 place-items-center overflow-hidden",
        styles.box,
        className
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        className="object-contain p-0"
        sizes={styles.sizes}
        priority={variant === "hero"}
      />
    </span>
  );
}
