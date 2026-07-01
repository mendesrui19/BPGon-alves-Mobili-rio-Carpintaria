import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/sections/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";
import { PageMeta } from "../components/seo/PageMeta";
import { SectionLabel } from "../components/ui/section-label";
import { PremiumButton } from "../components/ui/premium-button";
import {
  catalogItems,
  catalogCategories,
  type CatalogCategory,
  type CatalogItem,
} from "../lib/catalog-data";
import { CatalogCard } from "../components/catalog/CatalogCard";
import { business, SITE_URL } from "../lib/seo-data";

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>("todos");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const filtered = useMemo(() => {
    const items =
      activeCategory === "todos"
        ? catalogItems
        : catalogItems.filter((item) => item.category === activeCategory);
    return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [activeCategory]);

  const showFullGrid = activeCategory === "todos" && filtered.length === catalogItems.length;

  const openItem = useCallback((item: CatalogItem, startIndex = 0) => {
    setSelectedItem(item);
    setActiveImage(startIndex);
  }, []);

  const closeItem = useCallback(() => {
    setSelectedItem(null);
    setActiveImage(0);
  }, []);

  const goToImage = useCallback(
    (direction: -1 | 1) => {
      if (!selectedItem) return;
      setActiveImage((prev) => {
        const total = selectedItem.images.length;
        return (prev + direction + total) % total;
      });
    },
    [selectedItem],
  );

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeItem();
      if (event.key === "ArrowLeft") goToImage(-1);
      if (event.key === "ArrowRight") goToImage(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItem, closeItem, goToImage]);

  return (
    <>
      <PageMeta
        title={`Catálogo | ${business.name}`}
        description="Catálogo de obras — cozinhas, escadarias e mobiliário por medida em Braga."
        canonical={`${SITE_URL}/catalogo`}
      />
      <Nav catalogMode />
      <main className="bg-bg-base min-h-screen pt-[calc(var(--nav-height)+1rem)]">
        <header className="container pt-14 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20">
          <Link
            to="/"
            className="inline-flex items-center gap-3 meta-dark hover:text-champagne transition-colors duration-500 mb-8 sm:mb-12 touch-target"
          >
            ← Início
          </Link>
          <SectionLabel>Portfólio</SectionLabel>
          <h1 className="display-xl text-cream max-w-[900px]">
            Catálogo de <span className="italic text-champagne">obras</span>
          </h1>
          <p className="mt-8 sm:mt-10 copy-dark-muted max-w-[520px] leading-relaxed">
            Projectos reais executados com rigor de atelier. Cada imagem, um compromisso
            com a madeira e o detalhe.
          </p>
        </header>

        <div className="sticky sticky-below-nav z-[150] bg-bg-base/90 backdrop-blur-2xl border-y border-cream/[0.06]">
          <div className="container py-5 sm:py-6 flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none -mx-1 px-1">
            {catalogCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 text-xs tracking-[0.22em] uppercase font-medium transition-colors duration-500 pb-1 border-b touch-target ${
                  activeCategory === cat.id
                    ? "text-champagne border-champagne"
                    : "text-cream/70 border-transparent hover:text-cream"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="container py-14 sm:py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-auto grid-flow-row">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  onOpen={openItem}
                  fullGrid={showFullGrid}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="container pb-20 sm:pb-28 text-center">
          <PremiumButton href="/#contacto">Iniciar o seu projecto</PremiumButton>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[500] bg-bg-base/97 backdrop-blur-xl flex items-stretch md:items-center justify-center p-0 md:p-10"
            onClick={closeItem}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-[100dvh] md:h-[92vh] md:max-w-[min(96vw,1500px)] overflow-hidden flex flex-col bg-black md:border border-cream/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 min-h-0 bg-black pt-[env(safe-area-inset-top,0px)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedItem.images[activeImage]}
                    src={selectedItem.images[activeImage]}
                    alt={`${selectedItem.title} — foto ${activeImage + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                  <p className="text-[0.5rem] tracking-[0.32em] uppercase text-champagne mb-1.5 sm:mb-2">
                    {catalogCategories.find((c) => c.id === selectedItem.category)?.label} ·{" "}
                    {selectedItem.location} · {selectedItem.year}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl md:text-4xl font-light text-cream leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="hidden md:block copy-dark-muted mt-3 max-w-[620px]">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToImage(-1)}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cream/75 hover:text-cream bg-black/45 backdrop-blur-md border border-cream/10 transition-colors touch-target"
                      aria-label="Foto anterior"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => goToImage(1)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cream/75 hover:text-cream bg-black/45 backdrop-blur-md border border-cream/10 transition-colors touch-target"
                      aria-label="Foto seguinte"
                    >
                      →
                    </button>
                    <span className="absolute top-[calc(0.75rem+env(safe-area-inset-top,0px))] left-3 sm:left-4 text-[0.5rem] tracking-[0.28em] uppercase text-cream/70 bg-black/45 backdrop-blur-md px-3 py-1.5 border border-cream/10">
                      {activeImage + 1} / {selectedItem.images.length}
                    </span>
                  </>
                )}

                <button
                  className="absolute top-[calc(0.75rem+env(safe-area-inset-top,0px))] right-3 sm:right-4 w-11 h-11 flex items-center justify-center text-cream/50 hover:text-cream bg-black/45 backdrop-blur-md border border-cream/10 text-2xl font-light transition-colors touch-target"
                  onClick={closeItem}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <p className="md:hidden shrink-0 copy-dark-muted px-4 py-3 border-t border-cream/[0.06] bg-black line-clamp-3">
                {selectedItem.description}
              </p>

              {selectedItem.images.length > 1 && (
                <div className="shrink-0 border-t border-cream/[0.06] bg-black p-2.5 sm:p-3 md:p-4 overflow-x-auto scrollbar-none pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]">
                  <div className="flex gap-2 min-w-max px-1">
                    {selectedItem.images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden border transition-colors touch-target ${
                          index === activeImage
                            ? "border-champagne"
                            : "border-cream/10 hover:border-cream/30"
                        }`}
                        aria-label={`Ver foto ${index + 1}`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
