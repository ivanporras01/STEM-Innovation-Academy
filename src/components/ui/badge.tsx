import { cn } from "@/lib/utils";

const variants = {
  default: "bg-nova-light-gray text-nova-dark-gray",
  cyan: "bg-nova-cyan/10 text-nova-blue",
  green: "bg-nova-green/10 text-nova-green",
  orange: "bg-nova-orange/10 text-nova-orange",
  blue: "bg-nova-blue/10 text-nova-deep-blue",
} as const;

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span className={cn("nova-badge", variants[variant], className)}>
      {children}
    </span>
  );
}
