"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  GraduationCap,
  Trophy,
  Users,
  ClipboardList,
  Building2,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  book: BookOpen,
  graduation: GraduationCap,
  trophy: Trophy,
  users: Users,
  clipboard: ClipboardList,
  building: Building2,
} as const;

export type StatIconName = keyof typeof iconMap;

export function StatCard({
  label,
  value,
  icon,
  accent = "cyan",
}: {
  label: string;
  value: string | number;
  icon: StatIconName;
  accent?: "cyan" | "green" | "orange";
}) {
  const Icon: LucideIcon = iconMap[icon];

  const colors = {
    cyan: "from-nova-cyan/20 to-nova-blue/10 text-nova-blue",
    green: "from-nova-green/20 to-nova-green/5 text-nova-green",
    orange: "from-nova-orange/20 to-nova-orange/5 text-nova-orange",
  };

  return (
    <div className="nova-card flex items-center gap-4">
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
          colors[accent]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-nova-cyan-light/80">{label}</p>
      </div>
    </div>
  );
}
