import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PremiumButton } from "../ui/premium-button";
import { SectionLabel } from "../ui/section-label";
import { business } from "../../lib/seo-data";

const HERO_VIDEO = "/videos/hero-banner.mp4";
const HERO_POSTER = "/images/catalog/obra-04.jpg";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute("src");
      return;
    }

    video.play().catch(() => {
      /* autoplay blocked — poster stays visible */
    });
  }, []);

  return (
    <header className="relative min-h-[100svh] flex flex-col justify-start md:justify-end overflow-hidden bg-bg-base pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            className="w-full h-full object-cover motion-reduce:hidden"
            aria-hidden
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <img
            src={HERO_POSTER}
            alt=""
            aria-hidden
            className="hidden motion-reduce:block w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/75 to-bg-base/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-bg-base/85 via-bg-base/35 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 container pb-12 sm:pb-16 md:pb-24 pt-5 sm:pt-8 md:pt-16 flex-1 flex flex-col justify-end md:block">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[720px]"
          >
            <SectionLabel>Braga · Desde a origem</SectionLabel>

            <h1 className="display-xl text-cream mb-6 sm:mb-8">
              <span className="block italic font-light">Mobiliário</span>
              <span className="block font-normal text-champagne">& Carpintaria</span>
              <span className="block text-[0.45em] mt-3 sm:mt-4 tracking-[0.12em] not-italic font-light text-cream/65">
                por medida
              </span>
            </h1>

            <p className="copy-dark max-w-[540px] mb-4">
              {business.bio}
            </p>
            <p className="copy-pull max-w-[500px] mb-8 sm:mb-10 md:mb-12 !text-champagne/85">
              {business.motto} — cada projeto pensado, fabricado e montado com rigor de atelier.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6">
              <PremiumButton href="#contacto" className="w-full sm:w-auto justify-center">
                Pedir Orçamento
              </PremiumButton>
              <PremiumButton href="/catalogo" variant="ghost" className="w-full sm:w-auto justify-center">
                Ver Catálogo
              </PremiumButton>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden grid grid-cols-3 gap-4 sm:gap-6 pt-8 mt-8 border-t border-cream/10"
            >
              <div>
                <p className="font-display text-3xl sm:text-4xl font-light text-champagne leading-none">{business.foundedYear}</p>
                <p className="meta-dark mt-2">Desde</p>
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl font-light text-cream leading-none">100%</p>
                <p className="meta-dark mt-2">Por medida</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-light text-cream leading-snug italic">Braga</p>
                <p className="meta-dark mt-2">& Região</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Side stats — editorial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-10 border-l border-cream/10 pl-10 pb-2"
          >
            <div>
              <p className="font-display text-5xl font-light text-champagne leading-none">{business.foundedYear}</p>
              <p className="meta-dark mt-2">Desde</p>
            </div>
            <div>
              <p className="font-display text-5xl font-light text-cream leading-none">100%</p>
              <p className="meta-dark mt-2">Por medida</p>
            </div>
            <div>
              <p className="font-display text-3xl font-light text-cream leading-snug italic">Braga</p>
              <p className="meta-dark mt-2">& Região</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 container pb-6 sm:pb-8 flex items-center gap-4"
      >
        <div className="h-px flex-1 max-w-[80px] bg-champagne/30 origin-left animate-line-grow" />
        <span className="meta-dark">Descobrir</span>
      </motion.div>
    </header>
  );
}
