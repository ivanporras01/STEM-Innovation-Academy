import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PathwayIcon, type PathwayKey } from "@/components/ui/pathway-icon";
import { ExploreNowButton } from "@/components/courses/explore-now-button";
import { pathwayLabels } from "@/lib/utils";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  slug: string;
  title: string;
  description: string;
  pathway: string;
  level: string;
  pathwayDisplayLabel?: string;
  pathwayHref?: string;
  levelHref?: string | null;
  progress?: number;
  enrolled?: boolean;
  mentorName?: string;
  experienceSlug?: string;
  experienceTitle?: string;
  /** 1-based stage when Explore Now is in progress */
  exploreStage?: number | null;
  exploreComplete?: boolean;
};

export function CourseCard({
  slug,
  title,
  description,
  pathway,
  level,
  pathwayDisplayLabel,
  pathwayHref,
  levelHref,
  progress,
  enrolled,
  mentorName,
  experienceSlug,
  experienceTitle,
  exploreStage,
  exploreComplete,
}: CourseCardProps) {
  const exploreStatus =
    exploreComplete === true
      ? "Explore Now complete"
      : exploreStage != null
        ? `Explore Now in progress — stage ${exploreStage}/8`
        : null;

  const pathwayText = pathwayDisplayLabel ?? pathwayLabels[pathway] ?? pathway;

  return (
    <article className="nova-glass-card group flex h-full min-h-0 flex-col">
      {exploreComplete && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-nova-green/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nova-green">
          Explore complete
        </span>
      )}

      <div className="mb-4 flex items-start justify-between gap-3">
        <PathwayIcon pathway={pathway as PathwayKey} variant="card" className="h-14 w-14 shrink-0" />
        <div className="flex flex-wrap justify-end gap-2">
          {pathwayHref ? (
            <Link
              href={pathwayHref}
              className="nova-badge bg-nova-cyan/10 text-nova-blue transition hover:bg-nova-cyan/20"
            >
              {pathwayText}
            </Link>
          ) : (
            <Badge variant="cyan">{pathwayText}</Badge>
          )}
          {levelHref ? (
            <Link
              href={levelHref}
              className="nova-badge bg-nova-light-gray text-nova-dark-gray transition hover:bg-white"
            >
              {level}
            </Link>
          ) : (
            <Badge variant="default">{level}</Badge>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-bold leading-snug text-white group-hover:text-nova-cyan-light">
        <Link href={`/courses/${slug}`}>{title}</Link>
      </h3>

      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-nova-cyan-light/75">
        {description}
      </p>

      {mentorName && (
        <p className="mb-3 text-xs text-nova-cyan-light/60">
          Innovation Mentor:{" "}
          <span className="font-medium text-white/90">{mentorName}</span>
        </p>
      )}

      {typeof progress === "number" && (
        <div className="mb-4">
          <ProgressBar value={progress} />
        </div>
      )}

      <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
        <Link href={`/courses/${slug}`} className="nova-btn-primary block w-full text-center">
          {enrolled ? "Continue Mission Path" : "Explore Mission Path"}
        </Link>

        {experienceSlug && experienceTitle && (
          <ExploreNowButton
            experienceSlug={experienceSlug}
            experienceTitle={experienceTitle}
            pathway={pathway as PathwayKey}
            className="mt-0"
          />
        )}

        <p
          className={cn(
            "min-h-[1.125rem] text-center text-xs leading-snug",
            exploreStatus ? "text-nova-cyan" : "text-transparent",
          )}
          aria-hidden={!exploreStatus}
        >
          {exploreStatus ?? "·"}
        </p>
      </div>
    </article>
  );
}
