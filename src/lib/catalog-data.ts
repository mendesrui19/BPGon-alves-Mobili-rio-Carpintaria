export type CatalogCategory =
  | "todos"
  | "cozinhas"
  | "escadarias"
  | "obras";

export interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<CatalogCategory, "todos">;
  location: string;
  year: string;
  description: string;
  image: string;
  images: string[];
  featured: boolean;
  span?: "wide" | "tall" | "hero";
  displayOrder: number;
}

export const catalogCategories: { id: CatalogCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "cozinhas", label: "Cozinhas" },
  { id: "escadarias", label: "Escadarias" },
  { id: "obras", label: "Obras" },
];

function album(slug: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/catalog/${slug}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

/** Projetos reais — fotos em public/images/catalog/{slug}/ */
export const catalogItems: CatalogItem[] = [
  {
    id: "03",
    slug: "projeto-bertrand",
    title: "Projeto Bertrand",
    subtitle: "Uma obra com história",
    category: "obras",
    location: "Braga",
    year: "2024",
    description:
      "Projeto Bertrand — uma obra com história. Carpintaria e mobiliário por medida num espaço com carácter, em Braga.",
    image: "/images/catalog/projeto-bertrand/01.jpg",
    images: album("projeto-bertrand", 18),
    featured: true,
    span: "hero",
    displayOrder: 1,
  },
  {
    id: "04",
    slug: "moradia-ca-palmeira",
    title: "Moradia C&A",
    subtitle: "Carpintaria em moradia unifamiliar",
    category: "obras",
    location: "Palmeira",
    year: "2025",
    description:
      "Moradia C&A, Palmeira — carpintaria e mobiliário por medida numa moradia unifamiliar. Execução coordenada com o espaço e acabamentos de arquitetura contemporânea.",
    image: "/images/catalog/moradia-ca-palmeira/01.jpg",
    images: album("moradia-ca-palmeira", 25),
    featured: true,
    span: "tall",
    displayOrder: 2,
  },
  {
    id: "01",
    slug: "cozinha-design-personalizado",
    title: "Cozinha por Medida",
    subtitle: "Madeira · Pedra natural · Design personalizado",
    category: "cozinhas",
    location: "Braga",
    year: "2024",
    description:
      "Transformando sonhos em realidade com a beleza e a funcionalidade da carpintaria. Cada detalhe desta cozinha foi pensado para unir praticidade e estilo, criando um espaço único e aconchegante.",
    image: "/images/catalog/cozinha-design-personalizado/01.jpg",
    images: album("cozinha-design-personalizado", 1),
    featured: true,
    span: "wide",
    displayOrder: 3,
  },
  {
    id: "02",
    slug: "escadaria-madeira-microcimento",
    title: "Escadas em Madeira e Corrimão",
    subtitle: "Microcimento · LED integrado",
    category: "escadarias",
    location: "Braga",
    year: "2025",
    description:
      "Escadas de madeira sob medida, com corrimãos perfeitos para um acabamento moderno. Combine com paredes em microcimento para um toque sofisticado. Transforme o seu espaço com elegância!",
    image: "/images/catalog/escadaria-madeira-microcimento/01.jpg",
    images: album("escadaria-madeira-microcimento", 1),
    featured: true,
    displayOrder: 4,
  },
];

export const featuredCatalog = [...catalogItems].sort(
  (a, b) => a.displayOrder - b.displayOrder,
);

export function getCatalogItem(slug: string) {
  return catalogItems.find((item) => item.slug === slug);
}
