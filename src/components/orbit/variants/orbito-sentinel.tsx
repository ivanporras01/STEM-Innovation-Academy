"use client";

import { OrbitoHumanoid, SENTINEL_THEME, type OrbitoHumanoidProps } from "./orbito-humanoid-base";

export function OrbitoSentinel(props: OrbitoHumanoidProps) {
  return <OrbitoHumanoid theme={SENTINEL_THEME} {...props} />;
}
