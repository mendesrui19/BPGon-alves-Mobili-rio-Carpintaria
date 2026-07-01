import { useState, useEffect } from "react";
import { Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CatalogItem } from "../../lib/catalog-data";
import { catalogCategories } from "../../lib/catalog-data";

interface CatalogCardProps {
  item: CatalogItem;
  onOpen: (item: CatalogItem, startIndex?: number) => void;
}

export function CatalogCard({ item, onOpen }: CatalogCardProps) {
  const hasAlbum = item.images.length > 1;
  const [previewIndex, setPreviewIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPreviewIndex(0);
  }, [item.id]);

  useEffect(() => {
    if (!hasAlbum || paused) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % item.images.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [hasAlbum, paused, item.images.length, item.id]);

  const categoryLabel = catalogCategories.find((c) => c.id === item.category)?.label;
  const previewSrc = hasAlbum ? item.images[previewIndex] : item.image;

  const spanClass =
    item.span === "hero"
      ? "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto md:min-h-[560px]"
      : item.span === "wide"
        ? "md:col-span-7 aspect-[16/10]"
        : item.span === "tall"
          ? "md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-auto md:min-h-[560px]"
          : "md:col-span-5 aspect-[4/3]";

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => onOpen(item, previewIndex)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`group relative overflow-hidden cursor-pointer bg-bg-elevated ${spanClass}`}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={previewSrc}
            src={previewSrc}
            alt={`${item.title}${hasAlbum ? ` — foto ${previewIndex + 1}` : ""}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/95 via-bg-base/20 to-bg-base/10 opacity-75 group-hover:opacity-90 transition-opacity duration-700" />

      {hasAlbum && (
        <>
          <span className="absolute top-5 right-5 md:top-6 md:right-6 text-[0.5rem] tracking-[0.28em] uppercase text-cream/85 bg-bg-base/60 backdrop-blur-md px-3 py-1.5 border border-cream/10">
            {item.images.length} fotos
          </span>

          <span className="absolute top-5 left-5 md:top-6 md:left-6 text-[0.5rem] tracking-[0.28em] uppercase text-cream/75 bg-bg-base/55 backdrop-blur-md px-2.5 py-1.5 border border-cream/10 tabular-nums">
            {previewIndex + 1} / {item.images.length}
          </span>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
        <p className="text-[0.5rem] tracking-[0.32em] uppercase text-champagne/70 mb-2 sm:mb-3">
          {categoryLabel} · {item.year}
        </p>
        <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-light text-cream leading-tight mb-4 sm:mb-5">
          {item.title}
        </h2>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(item, previewIndex);
          }}
          className={`inline-flex items-center gap-2.5 text-[0.55rem] sm:text-[0.6rem] tracking-[0.24em] uppercase font-medium border transition-all duration-500 touch-target ${
            hasAlbum
              ? "px-4 py-2.5 sm:px-5 sm:py-3 bg-champagne/90 text-ink border-champagne hover:bg-champagne hover:border-champagne-light"
              : "px-3.5 py-2 sm:px-4 sm:py-2.5 bg-transparent text-cream border-cream/25 hover:border-champagne hover:text-champagne"
          }`}
        >
          {hasAlbum ? (
            <>
              <Images className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
              Ver álbum completo · {item.images.length} fotos
            </>
          ) : (
            <>Ver foto</>
          )}
        </button>
      </div>
    </motion.article>
  );
}
