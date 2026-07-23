import Link from "next/link";
import { PathwayIcon } from "@/components/ui/pathway-icon";
import { ExploreNowButton } from "@/components/courses/explore-now-button";
import type { PathwayMeta } from "@/lib/pathways/meta";

type Props = {
  meta: PathwayMeta;
  title: string;
  description: string;
  totalMissions: number;
  totalPhases: number;
};

export function MissionPathHero({
  meta,
  title,
  description,
  totalMissions,
  totalPhases,
}: Props) {
  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-nova-light-gray bg-gradient-to-br from-nova-deep-blue via-[#0b1a3b] to-[#103663] p-8 text-white shadow-nova-lg sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
        <PathwayIcon
          pathway={meta.pathway}
          variant="card"
          className="h-20 w-20 bg-white/15 text-3xl text-white backdrop-blur-sm"
        />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-nova-cyan">
            NOVA Mission Path · {totalPhases} phases · {totalMissions} missions
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/80">{description}</p>
          <p className="mt-3 max-w-2xl text-sm italic text-white/65">{meta.hook}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ExploreNowButton
              experienceSlug={meta.experienceSlug}
              experienceTitle={meta.experienceTitle}
              pathway={meta.pathway}
              variant="hero"
            />
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white/90">
              Badge: {meta.badge}
            </span>
            <Link
              href="#path-outline"
              className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              View full path outline ↓
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
