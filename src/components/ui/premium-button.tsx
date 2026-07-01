import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-champagne text-ink border border-champagne hover:bg-champagne-light hover:border-champagne-light",
  outline:
    "bg-transparent text-cream border border-cream/25 hover:border-champagne hover:text-champagne",
  ghost: "bg-transparent text-cream/70 border border-transparent hover:text-cream",
  light:
    "bg-ink text-cream border border-ink hover:bg-ink-soft",
};

export function PremiumButton({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: PremiumButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-3 touch-target",
    "text-[0.6875rem] tracking-[0.3em] uppercase font-normal",
    "px-6 py-3.5 sm:px-8 sm:py-4 transition-all duration-500 ease-out",
    "group",
    variants[variant],
    className,
  );

  const arrow = (
    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
      →
    </span>
  );

  if (href?.startsWith("/")) {
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {children}
        {arrow}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
      {arrow}
    </button>
  );
}
