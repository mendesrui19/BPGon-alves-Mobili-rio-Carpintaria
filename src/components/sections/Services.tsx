import { motion } from "framer-motion";
import { SectionLabel } from "../ui/section-label";
import { PremiumButton } from "../ui/premium-button";
import { services, materials } from "../../lib/seo-data";

export function Services() {
  return (
    <section id="servicos" className="section-pad-lg bg-bg-base relative">
      <div className="container">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)]"
          >
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="display-lg text-cream mb-6">
              O ofício da<br />
              <span className="italic text-champagne">madeira</span>
            </h2>
            <p className="copy-dark max-w-[420px] mb-10">
              Da cozinha à escadaria, trabalhamos madeira maciça, mármore, microcimento
              e iluminação LED — sempre com acabamentos de atelier.
            </p>
            <ul className="flex flex-col gap-5 mb-10 border-l border-champagne/25 pl-6">
              {materials.map((mat) => (
                <li key={mat.name}>
                  <span className="font-display text-[1.05rem] md:text-[1.1rem] text-champagne/90 block mb-1.5">
                    {mat.name}
                  </span>
                  <span className="copy-dark-muted block">{mat.description}</span>
                </li>
              ))}
            </ul>
            <PremiumButton href="#contacto" variant="outline">
              Falar sobre o seu projeto
            </PremiumButton>
          </motion.div>

          <div className="flex flex-col">
            {services.map((svc, i) => (
              <motion.article
                key={svc.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group border-t border-cream/[0.08] py-8 md:py-10 grid grid-cols-[3rem_1fr] gap-6 md:gap-10"
              >
                <span className="font-display text-2xl text-champagne/40 group-hover:text-champagne transition-colors duration-500 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-cream font-light mb-3 group-hover:text-champagne transition-colors duration-500">
                    {svc.name}
                  </h3>
                  <p className="copy-dark-muted max-w-[520px]">
                    {svc.description}
                  </p>
                </div>
              </motion.article>
            ))}
            <div className="border-t border-cream/[0.08]" />
          </div>
        </div>
      </div>
    </section>
  );
}
