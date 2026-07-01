import { useEffect, useRef } from "react";
import { animate, useInView, motion } from "framer-motion";
import { SectionLabel } from "../ui/section-label";
import { PremiumButton } from "../ui/premium-button";
import { business } from "../../lib/seo-data";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
        },
      });
    }
  }, [isInView, value, suffix]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-6xl font-light text-ink leading-none">
      0
    </span>
  );
}

export function Sobre() {
  return (
    <section id="sobre" className="section-pad-lg bg-cream text-ink relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel light>A Empresa</SectionLabel>
            <h2 className="display-lg text-ink mb-8">
              Onde a madeira<br />
              <span className="italic text-champagne-dark">ganha forma</span>
            </h2>
            <p className="copy-light max-w-[540px] mb-8">
              A{" "}
              <span className="font-display not-italic text-[1.08em] tracking-[0.01em] text-ink">
                {business.shortName}
              </span>{" "}
              é um atelier de carpintaria e mobiliário na Rua da Cruz, Pousada, Braga. Desde{" "}
              {business.foundedYear}, transformamos madeira em peças únicas — sem produção em
              série, com projetos pensados ao detalhe.
            </p>
            <div className="border-l border-champagne-dark/25 pl-6 max-w-[540px] mb-12">
              <p className="copy-pull mb-4">{business.bio}</p>
              <p className="copy-light-muted">
                {business.motto} com a beleza e a funcionalidade da carpintaria.
              </p>
            </div>
            <PremiumButton href="#contacto" variant="light">
              Agendar conversa
            </PremiumButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-14 sm:pb-16 md:pb-0"
          >
            <div className="frame-luxury">
              <img
                src="/images/catalog/obra-02.jpg"
                alt="Cozinha por medida — BPGonçalves"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 sm:-bottom-6 sm:-left-4 md:-bottom-8 md:-left-12 w-[48%] sm:w-[52%] md:w-[55%] shadow-[0_40px_80px_oklch(14%_0.014_55/0.12)]">
              <img
                src="/images/catalog/obra-05.jpg"
                alt="Mobiliário casa de banho"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="hairline-dark mt-20 md:mt-32 mb-12 md:mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          {[
            { el: <AnimatedCounter value={business.foundedYear} />, label: "Desde" },
            { el: <AnimatedCounter value={100} suffix="%" />, label: "Por medida" },
            { el: <span className="font-display text-4xl md:text-6xl font-light text-ink">24h</span>, label: "Resposta" },
            { el: <span className="font-display text-3xl md:text-5xl font-light italic text-ink">Braga</span>, label: "& Região" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col gap-3"
            >
              {stat.el}
              <span className="meta-light">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
