import { motion } from "framer-motion";
import { SectionLabel } from "../ui/section-label";
import { differentiators, serviceAreas } from "../../lib/seo-data";

function DifferentiatorCard({ index, text }: { index: number; text: string }) {
  return (
    <article className="promo-carousel-card shrink-0 w-[min(82vw,340px)] md:w-[380px] bg-cream border border-ink/[0.06] p-8 md:p-10 flex flex-col gap-5 shadow-[0_12px_40px_oklch(14%_0.014_55/0.04)]">
      <span className="font-display text-3xl text-champagne-dark/55">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="copy-light leading-[1.9]">{text}</p>
    </article>
  );
}

export function PorqueNos() {
  const slides = [...differentiators, ...differentiators];

  return (
    <section id="porquenos" className="section-pad-lg bg-cream-muted relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-[640px] mx-auto mb-14 md:mb-20"
        >
          <SectionLabel light>A nossa promessa</SectionLabel>
          <h2 className="display-lg text-ink">
            Porque escolher a<br />
            <span className="italic text-champagne-dark">BP Gonçalves</span>
          </h2>
        </motion.div>
      </div>

      <div className="promo-carousel-mask relative mb-20 md:mb-28">
        <div className="promo-carousel-track flex w-max gap-4 md:gap-5">
          {slides.map((item, i) => (
            <DifferentiatorCard key={`${item}-${i}`} index={i % differentiators.length} text={item} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hairline-dark mb-12" />

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="meta-light"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
