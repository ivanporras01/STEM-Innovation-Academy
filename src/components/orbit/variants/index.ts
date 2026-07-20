import type { ComponentType } from "react";
import { OrbitoNexus } from "./orbito-nexus";
import { OrbitoSentinel } from "./orbito-sentinel";
import { OrbitoAero } from "./orbito-aero";
import { OrbitoPrime } from "./orbito-prime";
import { OrbitoSpark } from "./orbito-spark";

export type OrbitoVariantId = "nexus" | "sentinel" | "aero" | "prime" | "spark";

export type OrbitoVariantProps = {
  size?: "sm" | "md" | "hero";
  scanning?: boolean;
  greeting?: boolean;
  className?: string;
};

export type OrbitoVariantMeta = {
  id: OrbitoVariantId;
  number: number;
  name: string;
  tagline: string;
  taglineEs: string;
  vibe: string;
  greetLabel: string;
  Component: ComponentType<OrbitoVariantProps>;
};

/** Five articulated humanoid guides — real joint animations, pick your favorite. */
export const ORBITO_VARIANTS: readonly OrbitoVariantMeta[] = [
  {
    id: "nexus",
    number: 1,
    name: "Orbita Nexus",
    tagline: "Silver reference style — wave + open palm welcome",
    taglineEs: "Plateado estilo referencia — saludo con mano y palma abierta",
    vibe: "Tu foto · Premium",
    greetLabel: "Saludo con mano",
    Component: OrbitoNexus,
  },
  {
    id: "sentinel",
    number: 2,
    name: "Orbita Sentinel",
    tagline: "Dark tactical humanoid — salute gesture",
    taglineEs: "Humanoide táctico oscuro — gesto de saludo militar",
    vibe: "Tactical / STEM ops",
    greetLabel: "Saludo militar",
    Component: OrbitoSentinel,
  },
  {
    id: "aero",
    number: 3,
    name: "Orbita Aero",
    tagline: "Slim white-cyan bot — open arms welcome",
    taglineEs: "Bot delgado blanco-cyan — brazos abiertos de bienvenida",
    vibe: "Lightweight / Airy",
    greetLabel: "Brazos abiertos",
    Component: OrbitoAero,
  },
  {
    id: "prime",
    number: 4,
    name: "Orbita",
    tagline: "Tall athletic silver-black — warehouse scanner pro",
    taglineEs: "Atlético plateado-negro — escáner profesional",
    vibe: "Industrial pro",
    greetLabel: "Saludo + scan",
    Component: OrbitoPrime,
  },
  {
    id: "spark",
    number: 5,
    name: "Orbita Spark",
    tagline: "Energetic compact bot — fast bouncy double wave",
    taglineEs: "Bot compacto energético — doble saludo rápido",
    vibe: "Friendly / Dynamic",
    greetLabel: "Doble saludo",
    Component: OrbitoSpark,
  },
] as const;

export { OrbitoNexus, OrbitoSentinel, OrbitoAero, OrbitoPrime, OrbitoSpark };
