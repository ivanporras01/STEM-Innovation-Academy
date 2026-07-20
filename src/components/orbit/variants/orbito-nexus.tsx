"use client";

import { OrbitoHumanoid, NEXUS_THEME, type OrbitoHumanoidProps } from "./orbito-humanoid-base";

export function OrbitoNexus(props: OrbitoHumanoidProps) {
  return <OrbitoHumanoid theme={NEXUS_THEME} {...props} />;
}
