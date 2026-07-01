import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "../ui/section-label";
import { PremiumButton } from "../ui/premium-button";
import { business } from "../../lib/seo-data";

export function Contacto() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const nome = (f.elements.namedItem("nome") as HTMLInputElement).value;
    const telefone = (f.elements.namedItem("telefone") as HTMLInputElement).value;
    const email = (f.elements.namedItem("email") as HTMLInputElement).value;
    const servico = (f.elements.namedItem("servico") as HTMLSelectElement).value;
    const mensagem = (f.elements.namedItem("mensagem") as HTMLTextAreaElement).value;
    const body = encodeURIComponent(
      `Nome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}\nServiço: ${servico}\n\n${mensagem}`,
    );
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent("Orçamento — BP Gonçalves")}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-cream/20 py-4 text-cream font-light text-[1.0625rem] focus:outline-none focus:border-champagne/50 transition-colors duration-500 placeholder:text-cream/30";

  return (
    <section id="contacto" className="section-pad-lg bg-bg-base">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <SectionLabel>Contacto</SectionLabel>
            <h2 className="display-lg text-cream mb-10">
              Vamos criar<br />
              <span className="italic text-champagne">juntos</span>
            </h2>
            <p className="copy-dark max-w-[440px] mb-10 sm:mb-14">
              Descreva o seu projeto. Respondemos em menos de 24 horas com um
              orçamento gratuito e sem compromisso.
            </p>

            <div className="space-y-8 text-[1.0625rem] font-light">
              <div>
                <p className="meta-dark mb-2">Telefone</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <a href={`tel:${business.phone}`} className="text-cream hover:text-champagne transition-colors">
                    {business.phoneDisplay}
                  </a>
                  <span className="hidden sm:inline text-cream/50 mx-3">·</span>
                  <a href={`tel:${business.phoneSecondary}`} className="text-cream/80 hover:text-champagne transition-colors">
                    {business.phoneSecondaryDisplay}
                  </a>
                </div>
              </div>
              <div>
                <p className="meta-dark mb-2">Email</p>
                <a href={`mailto:${business.email}`} className="text-cream hover:text-champagne transition-colors">
                  {business.email}
                </a>
              </div>
              <div>
                <p className="meta-dark mb-2">Atelier</p>
                <p className="text-cream/80 leading-relaxed">
                  {business.address.street}<br />
                  {business.address.postalCode} {business.address.locality}
                </p>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 aspect-video w-full max-w-[400px] overflow-hidden border border-cream/[0.06]">
              <iframe
                title="Localização BPGonçalves"
                src={business.googleMapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="border border-cream/[0.06] p-6 sm:p-8 md:p-14 bg-bg-elevated/50">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <label className="meta-dark" htmlFor="f-nome">Nome</label>
                    <input className={inputClass} id="f-nome" name="nome" required placeholder="O seu nome" />
                  </div>
                  <div>
                    <label className="meta-dark" htmlFor="f-tel">Telefone</label>
                    <input className={inputClass} id="f-tel" name="telefone" type="tel" required placeholder="9XX XXX XXX" />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="meta-dark" htmlFor="f-email">Email</label>
                  <input className={inputClass} id="f-email" name="email" type="email" placeholder="email@exemplo.pt" />
                </div>
                <div className="mb-8">
                  <label className="meta-dark" htmlFor="f-svc">Serviço</label>
                  <select className={`${inputClass} cursor-pointer`} id="f-svc" name="servico">
                    <option value="" className="bg-bg-base">Seleccionar...</option>
                    <option className="bg-bg-base">Cozinha por Medida</option>
                    <option className="bg-bg-base">Roupeiro / Closet</option>
                    <option className="bg-bg-base">Escadaria / Corrimão</option>
                    <option className="bg-bg-base">Mobiliário Personalizado</option>
                    <option className="bg-bg-base">Outro</option>
                  </select>
                </div>
                <div className="mb-12">
                  <label className="meta-dark" htmlFor="f-msg">Projecto</label>
                  <textarea className={`${inputClass} min-h-[120px] resize-none`} id="f-msg" name="mensagem" required placeholder="Descreva a sua visão..." />
                </div>
                <PremiumButton type="submit" className="w-full justify-center">
                  Enviar pedido
                </PremiumButton>
              </form>
            ) : (
              <div className="border border-cream/[0.06] p-10 sm:p-16 text-center min-h-[320px] sm:min-h-[400px] flex flex-col items-center justify-center">
                <p className="font-display text-4xl text-cream font-light italic mb-4">Obrigado.</p>
                <p className="copy-dark-muted">Entraremos em contacto brevemente.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
