import { Link } from "react-router-dom";
import { Logo } from "../ui/logo";
import { business } from "../../lib/seo-data";

export function Footer() {
  return (
    <footer className="bg-bg-base border-t border-cream/[0.06] pt-16 sm:pt-20 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="container">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12 sm:gap-16 mb-14 sm:mb-20">
          <div>
            <Logo size="lg" />
            <p className="mt-8 copy-dark-muted max-w-[340px]">
              Carpintaria e mobiliário por medida em Braga. Cada peça, uma obra de arte.
            </p>
          </div>

          <div>
            <p className="meta-dark mb-6">Navegação</p>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Sobre", href: "/#sobre" },
                { label: "Serviços", href: "/#servicos" },
                { label: "Obras", href: "/#obras" },
                { label: "Catálogo", href: "/catalogo" },
                { label: "Contacto", href: "/#contacto" },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-cream/75 text-[1.0625rem] font-light hover:text-champagne transition-colors duration-500 w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="meta-dark mb-6">Contacto</p>
            <div className="flex flex-col gap-3 text-[1.0625rem] font-light text-cream/75">
              <a href={`tel:${business.phone}`} className="hover:text-champagne transition-colors">
                {business.phoneDisplay}
              </a>
              <a href={`mailto:${business.email}`} className="hover:text-champagne transition-colors">
                {business.email}
              </a>
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors">
                {business.instagramHandle}
              </a>
              <p className="mt-4 text-cream/65 leading-relaxed">
                {business.address.street}<br />
                {business.address.postalCode} {business.address.locality}
              </p>
            </div>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} {business.name}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a href="https://www.livroreclamacoes.pt/entrar" target="_blank" rel="noopener noreferrer" className="hover:text-cream/50 transition-colors">
              Livro de Reclamações
            </a>
            <a href="https://www.consumidor.gov.pt/" target="_blank" rel="noopener noreferrer" className="hover:text-cream/50 transition-colors">
              Portal do Consumidor
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
