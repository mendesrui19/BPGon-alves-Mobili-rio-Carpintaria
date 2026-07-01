import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const LOGO_SRC = "/images/brand/logo.png";

type LogoSize = "sm" | "md" | "lg";

const sizeClasses: Record<LogoSize, string> = {
  sm: "h-10 sm:h-10 md:h-11",
  md: "h-11 sm:h-11 md:h-12 lg:h-14",
  lg: "h-12 sm:h-12 md:h-14 lg:h-16",
};

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: LogoSize;
}) {
  return (
    <Link
      to="/"
      className={cn("logo-wrap inline-flex shrink-0", className)}
      aria-label="BPGonçalves — página inicial"
    >
      <img
        src={LOGO_SRC}
        alt="BPGonçalves, Mobiliário & Carpintaria"
        className={cn("relative z-10 w-auto object-contain object-left", sizeClasses[size])}
      />
    </Link>
  );
}
