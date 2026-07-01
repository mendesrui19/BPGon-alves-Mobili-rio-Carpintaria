"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card";
import { Badge } from "./badge";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
}

export function RoadmapCard({
  title,
  description,
  items,
}: RoadmapCardProps) {
  return (
    <Card className="w-full max-w-6xl mx-auto border-black/5 bg-white/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300">
      {(title || description) && (
        <CardHeader className="text-center pb-8 pt-10">
          {title && <CardTitle className="text-3xl md:text-4xl text-text-dark">{title}</CardTitle>}
          {description && <CardDescription className="text-lg mt-2 text-text-dark-sec">{description}</CardDescription>}
        </CardHeader>
      )}
      
      <CardContent className="pt-8 pb-12">
        <div className="relative">
          {/* Timeline Line (Desktop Only) */}
          <div className="hidden md:block absolute left-10 right-10 top-4 h-[2px] bg-black/10" />

          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative">
            {/* Timeline Line (Mobile Only) */}
            <div className="md:hidden absolute left-[19px] top-4 bottom-4 w-[2px] bg-black/10" />

            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pt-0 md:pt-12 text-left md:text-center w-full md:w-1/4 pl-12 md:pl-0 pr-4 md:pr-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-[10px] md:left-1/2 top-1 md:top-2 -translate-x-1/2 md:-translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(200,169,110,0.3)] z-10 ${
                    item.status === "done" || item.status === "in-progress"
                      ? "bg-accent"
                      : "bg-white border-2 border-black/20"
                  }`}
                >
                  {(item.status === "done" || item.status === "in-progress") && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </motion.div>

                {/* Title in Golden Badge */}
                <div className="mb-4">
                  <Badge
                    variant={
                      item.status === "done" || item.status === "in-progress"
                        ? "default"
                        : "outline"
                    }
                    className="font-display font-bold text-lg md:text-xl px-5 py-2 shadow-xl whitespace-nowrap"
                  >
                    {item.title}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-text-dark-sec leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
