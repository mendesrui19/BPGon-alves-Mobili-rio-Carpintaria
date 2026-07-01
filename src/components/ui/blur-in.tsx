import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

interface BlurIntProps {
  word: string;
  className?: string;
  as?: "h1" | "span";
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
export const BlurIn = ({ word, className, as: Tag = "h1", variant, duration = 1 }: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;
  const MotionTag = Tag === "h1" ? motion.h1 : motion.span;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {word}
    </MotionTag>
  );
};
