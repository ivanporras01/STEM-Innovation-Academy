"use client";

import { OrbitoHumanoid, PRIME_THEME, type OrbitoHumanoidProps } from "./orbito-humanoid-base";

export function OrbitoPrime(props: OrbitoHumanoidProps) {
  return <OrbitoHumanoid theme={PRIME_THEME} {...props} />;
}
