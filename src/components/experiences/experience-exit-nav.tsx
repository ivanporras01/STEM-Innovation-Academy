import Link from "next/link";

type Props = {
  courseSlug: string;
  isLoggedIn: boolean;
  variant?: "inline" | "footer";
};

export function ExperienceExitNav({ courseSlug, isLoggedIn, variant = "inline" }: Props) {
  const linkClass =
    variant === "footer"
      ? "rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white/85 transition hover:border-[var(--exp-accent)] hover:bg-white/10 hover:text-white"
      : "rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white";

  return (
    <nav
      className={
        variant === "footer"
          ? "mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-6"
          : "flex flex-wrap items-center gap-2"
      }
      aria-label="Leave mission"
    >
      <Link href="/" className={linkClass}>
        NOVA Home
      </Link>
      <Link href="/courses" className={linkClass}>
        Mission Paths
      </Link>
      <Link href={`/courses/${courseSlug}`} className={linkClass}>
        This Path
      </Link>
      {isLoggedIn ? (
        <Link href="/dashboard/student" className={linkClass}>
          NOVA Portal
        </Link>
      ) : (
        <Link href="/login" className={linkClass}>
          Sign In
        </Link>
      )}
    </nav>
  );
}
