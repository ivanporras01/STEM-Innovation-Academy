"use client";

import { OrbitoHumanoid, AERO_THEME, type OrbitoHumanoidProps } from "./orbito-humanoid-base";

export function OrbitoAero(props: OrbitoHumanoidProps) {
  return <OrbitoHumanoid theme={AERO_THEME} {...props} />;
}
