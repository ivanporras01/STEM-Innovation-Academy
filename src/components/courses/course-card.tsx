import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PathwayIcon, type PathwayKey } from "@/components/ui/pathway-icon";
import { ExploreNowButton } from "@/components/courses/explore-now-button";
import { pathwayLabels } from "@/lib/utils";

type CourseCardProps = {
  slug: string;
  title: string;
  description: string;
  pathway: string;
  level: string;
  progress?: number;
  enrolled?: boolean;
  mentorName?: string;
  experienceSlug?: string;
  experienceTitle?: string;
};

export function CourseCard({
  slug,
  title,
  description,
  pathway,
  level,
  progress,
  enrolled,
  mentorName,
  experienceSlug,
  experienceTitle,
}: CourseCardProps) {
  return (
    <article className="nova-glass-card group flex flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <PathwayIcon
          pathway={pathway as PathwayKey}
          variant="card"
          className="h-14 w-14 shrink-0 text-2xl"
        />
        <div className="flex flex-wrap justify-end gap-2">
          <Badge variant="cyan">{pathwayLabels[pathway] ?? pathway}</Badge>
          <Badge variant="default">{level}</Badge>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-bold text-white group-hover:text-nova-cyan-light">
        <Link href={`/courses/${slug}`}>{title}</Link>
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-nova-cyan-light/75 line-clamp-3">
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

      <Link
        href={`/courses/${slug}`}
        className="nova-btn-primary mt-auto w-full text-center"
      >
        {enrolled ? "Continue Mission Path" : "Explore Mission Path"}
      </Link>

      {experienceSlug && experienceTitle && (
        <ExploreNowButton
          experienceSlug={experienceSlug}
          experienceTitle={experienceTitle}
          pathway={pathway as PathwayKey}
        />
      )}
    </article>
  );
}
