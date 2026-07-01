import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { SectionLabel } from "../ui/section-label";
import { PremiumButton } from "../ui/premium-button";
import { featuredCatalog } from "../../lib/catalog-data";

export function Obras() {
  return (
    <section id="obras" className="bg-bg-base">
      <div className="container py-16 md:py-28 lg:py-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-14 md:mb-28">
          <div>
            <SectionLabel>Portfólio</SectionLabel>
            <h2 className="display-lg text-cream">
              Obras
            </h2>
          </div>
          <PremiumButton href="/catalogo" variant="ghost" className="!px-0">
            Catálogo completo
          </PremiumButton>
        </div>
      </div>

      {featuredCatalog.map((item, i) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative min-h-[55vh] sm:min-h-[62vh] md:min-h-[85vh] flex items-end overflow-hidden",
            i % 2 === 1 && "md:justify-end",
          )}
        >
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />
          {i % 2 === 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-bg-base/80 to-transparent hidden md:block" />
          )}

          <div
            className={cn(
              "relative z-10 container pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32 max-w-[560px]",
              i % 2 === 1 && "md:ml-auto md:text-right md:max-w-[520px]",
            )}
          >
            <p className="meta-dark mb-4">
              {item.location} · {item.year}
            </p>
            <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-cream mb-3 sm:mb-4 leading-[1.05]">
              {item.title}
            </h3>
            <p className="copy-dark-muted mb-8">
              {item.subtitle}
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-champagne hover:text-champagne-light transition-colors duration-500"
            >
              Ver no catálogo <span>→</span>
            </Link>
          </div>
        </motion.article>
      ))}

      <div className="container py-14 sm:py-20 flex justify-center">
        <PremiumButton href="/catalogo">Explorar todas as obras</PremiumButton>
      </div>
    </section>
  );
}
