type Props = {
  /** More stars for immersive pages */
  dense?: boolean;
  className?: string;
};

/** Fixed starfield — Explorers feel like they're moving through the NOVA universe. */
export function NovaStarfield({ dense, className = "" }: Props) {
  return (
    <div
      className={`nova-starfield pointer-events-none fixed inset-0 -z-10 ${dense ? "nova-starfield-dense" : ""} ${className}`}
      aria-hidden
    />
  );
}

type OrbitProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function NovaOrbitRings({ className = "", size = "md" }: OrbitProps) {
  const sizes = {
    sm: "h-48 w-48",
    md: "h-72 w-72 sm:h-80 sm:w-80",
    lg: "h-96 w-96",
  };
  return (
    <div className={`relative ${sizes[size]} ${className}`} aria-hidden>
      <div className="nova-orbit-ring absolute inset-0 rounded-full border border-nova-cyan/25" />
      <div className="nova-orbit-ring nova-orbit-ring--reverse absolute inset-[12%] rounded-full border border-dashed border-nova-cyan/35" />
      <div className="nova-orbit-ring absolute inset-[24%] rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-nova-cyan shadow-[0_0_12px_#00b4d8]" />
      <div className="nova-orbit-dot absolute bottom-[18%] right-[8%] h-1.5 w-1.5 rounded-full bg-nova-orange/90 shadow-[0_0_10px_#ff7a00]" />
    </div>
  );
}

type ShellProps = {
  children: React.ReactNode;
  /** Dark cosmic canvas vs lighter exploration zones */
  variant?: "cosmos" | "nebula" | "light";
};

export function NovaUniverseShell({ children, variant = "light" }: ShellProps) {
  return (
    <div
      className={
        variant === "cosmos"
          ? "nova-universe-cosmos relative min-h-screen"
          : variant === "nebula"
            ? "nova-universe-nebula relative min-h-screen"
            : "nova-universe-light relative min-h-screen"
      }
    >
      <NovaStarfield />
      {children}
    </div>
  );
}
