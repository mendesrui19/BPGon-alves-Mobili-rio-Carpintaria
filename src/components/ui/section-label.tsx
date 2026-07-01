import { cn } from "../../lib/utils";

export function SectionLabel({
  children,
  light = false,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[0.6875rem] tracking-[0.32em] uppercase font-normal mb-6",
        light ? "text-champagne-dark/90" : "text-champagne/90",
        className,
      )}
    >
      <span className={cn("h-px w-10", light ? "bg-ink/20" : "bg-champagne/40")} />
      {children}
    </p>
  );
}
