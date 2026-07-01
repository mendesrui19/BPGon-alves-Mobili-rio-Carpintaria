export function Ticker() {
  const words = [
    "Cozinhas por Medida",
    "·",
    "Roupeiros",
    "·",
    "Escadarias",
    "·",
    "Corrimãos",
    "·",
    "Portas",
    "·",
    "Mobiliário Personalizado",
    "·",
    "Carpintaria Geral",
    "·",
    "Marcenaria",
    "·",
    "Casas de Banho",
    "·",
    "Closets",
    "·",
    "Madeira Maciça",
    "·",
    "Braga",
    "·",
    "Famalicão",
    "·",
    "Guimarães",
  ];

  const content = (
    <div className="flex gap-16 pr-16 items-center">
      {words.map((word, i) => (
        <span key={i} className={word === "·" ? "text-accent opacity-50 text-[1.2rem]" : "whitespace-nowrap"}>
          {word}
        </span>
      ))}
    </div>
  );

  return (
    <div className="py-4 border-b border-white/[0.06] overflow-hidden bg-bg-base/50 flex font-display text-[1.15rem] tracking-[0.06em] text-dim uppercase">
      <div className="flex animate-ticker w-max">
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
