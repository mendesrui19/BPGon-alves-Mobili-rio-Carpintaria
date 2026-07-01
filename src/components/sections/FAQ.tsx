import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../ui/section-label";
import { faqs } from "../../lib/seo-data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 md:py-36 bg-bg-elevated border-t border-cream/[0.04]" aria-labelledby="faq-heading">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 id="faq-heading" className="display-lg text-cream">
            Perguntas <span className="italic text-champagne">frequentes</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="border-t border-cream/[0.08] last:border-b">
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-8 py-7 text-left cursor-pointer group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl font-light text-cream/90 group-hover:text-cream transition-colors duration-500">
                    {faq.question}
                  </span>
                  <span className="text-champagne/50 text-xl font-light shrink-0 pt-1 transition-transform duration-500" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 copy-dark-muted max-w-[640px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
