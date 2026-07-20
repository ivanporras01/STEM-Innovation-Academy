"use client";

import { OrbitoHumanoid, SPARK_THEME, type OrbitoHumanoidProps } from "./orbito-humanoid-base";

export function OrbitoSpark(props: OrbitoHumanoidProps) {
  return <OrbitoHumanoid theme={SPARK_THEME} {...props} />;
}
