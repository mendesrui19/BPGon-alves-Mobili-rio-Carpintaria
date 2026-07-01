import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Logo } from "../ui/logo";
import { PremiumButton } from "../ui/premium-button";

const navItems = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Obras", href: "/#obras" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Contacto", href: "/#contacto" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function NavLink({
  to,
  children,
  active,
  index,
}: {
  to: string;
  children: React.ReactNode;
  active: boolean;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.07, ease }}
    >
      <Link to={to} className="group relative py-2 block">
        <span
          className={cn(
            "text-[0.6875rem] tracking-[0.28em] uppercase font-normal transition-colors duration-500",
            active ? "text-champagne" : "text-cream/65 group-hover:text-cream/90",
          )}
        >
          {children}
        </span>
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px bg-champagne origin-left"
          initial={{ scaleX: active ? 1 : 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease }}
          style={{ width: "100%" }}
        />
      </Link>
    </motion.li>
  );
}

export function Nav({ catalogMode = false }: { catalogMode?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const elevated = catalogMode || scrolled;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[200] pt-[env(safe-area-inset-top,0px)]"
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease }}
      >
        <motion.nav
          layout
          className={cn(
            "w-full transition-[box-shadow,background,border-color] duration-700",
            elevated ? "py-3.5 md:py-[18px]" : "py-4 md:py-[26px]",
            elevated
              ? "bg-bg-base/88 backdrop-blur-2xl border-b border-cream/[0.08] shadow-[0_18px_60px_oklch(0%_0_0/0.28)]"
              : "bg-bg-base/8 backdrop-blur-[6px] border-b border-cream/[0.03]",
          )}
        >
          <div className="container flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Logo />
              </div>

              <ul className="hidden lg:flex items-center gap-10 list-none m-0 p-0">
                {navItems.map((item, i) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    active={location.pathname === item.href}
                    index={i}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </ul>

              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
              >
                <PremiumButton href="/#contacto" variant="outline" className="!py-3 !px-6">
                  Orçamento
                </PremiumButton>
              </motion.div>

              <motion.button
                className="flex lg:hidden flex-col justify-center gap-[7px] p-3 -mr-1 cursor-pointer z-[210] touch-target"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
                aria-expanded={isOpen}
                whileTap={{ scale: 0.92 }}
              >
                <motion.span
                  className="block w-7 h-px bg-cream/80 origin-center"
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease }}
                />
                <motion.span
                  className="block w-7 h-px bg-cream/80"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-7 h-px bg-cream/80 origin-center"
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease }}
                />
              </motion.button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[190] bg-bg-base/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 sm:gap-10 px-6 pb-[env(safe-area-inset-bottom,0px)]"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
              >
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="font-display text-[2.25rem] sm:text-5xl md:text-6xl font-light tracking-[0.02em] text-cream/75 hover:text-champagne transition-colors duration-500"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              <PremiumButton href="/#contacto" onClick={closeMenu} className="mt-2">
                Pedir Orçamento
              </PremiumButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
