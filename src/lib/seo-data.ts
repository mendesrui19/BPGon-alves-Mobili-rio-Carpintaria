/** Dados centralizados para SEO, JSON-LD e conteúdo do site — fontes: Instagram @_bp_carpintaria_, placa da empresa, registo comercial */

export const SITE_URL = "https://www.bpgoncalves.pt";

export const business = {
  name: "BPGonçalves, Mobiliário & Carpintaria",
  shortName: "BP Gonçalves",
  legalName: "Paulo Jorge Fernandes, Unipessoal, Lda",
  tagline: "Transformamos madeira em arte",
  motto: "Transformando sonhos em realidade",
  bio: "Transformamos madeira em arte | Projetos sob medida | Qualidade e dedicação em cada detalhe",
  description:
    "Carpintaria e mobiliário por medida em Pousada, Braga. Cozinhas, escadarias, corrimãos, casas de banho, portas e mobiliário personalizado — com qualidade e dedicação em cada detalhe. Orçamento gratuito.",
  phone: "+351936455181",
  phoneDisplay: "936 455 181",
  phoneSecondary: "+351933630771",
  phoneSecondaryDisplay: "933 630 771",
  email: "bpgorcamentos@gmail.com",
  address: {
    street: "Rua da Cruz, nº 37",
    locality: "Pousada, Braga",
    postalCode: "4710-730",
    region: "Braga",
    country: "PT",
  },
  geo: { latitude: 41.5458, longitude: -8.4265 },
  hours: "Segunda a sexta: 08:00–18:00. Sábado: sob marcação.",
  priceRange: "€€",
  foundedYear: 2017,
  image: `${SITE_URL}/images/catalog/obra-04.jpg`,
  instagram: "https://www.instagram.com/_bp_carpintaria_/",
  instagramHandle: "@_bp_carpintaria_",
  facebook: "https://www.facebook.com/BPGoncalvesMobiliarioCarpintaria",
  followersInstagram: 152,
  followersFacebook: 2600,
  googleMapsEmbed:
    "https://maps.google.com/maps?q=Rua+da+Cruz+37+Pousada+Braga+4710-730&z=15&output=embed",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+da+Cruz+37+Pousada+Braga+4710-730",
  sameAs: [
    "https://www.instagram.com/_bp_carpintaria_/",
    "https://www.facebook.com/BPGoncalvesMobiliarioCarpintaria",
  ],
};

export const nap = {
  name: business.name,
  phone: business.phoneDisplay,
  street: business.address.street,
  locality: business.address.locality,
  postalCode: business.address.postalCode,
  country: "Portugal",
  website: SITE_URL,
};

/** Materiais e acabamentos visíveis nas obras publicadas no Instagram */
export const materials = [
  {
    name: "Madeira maciça e folheados",
    description: "Carvalho, nogueira e madeiras nobres com grão natural ou lacado.",
  },
  {
    name: "Pedra e mármore",
    description: "Bancadas, tampos e ilhas em pedra natural com veios e acabamento waterfall.",
  },
  {
    name: "Microcimento",
    description: "Combinação com escadarias e corrimãos para um acabamento contemporâneo.",
  },
  {
    name: "Iluminação LED integrada",
    description: "Fitas LED embutidas em corrimãos, vitrines e armários.",
  },
  {
    name: "Lacados e acabamentos premium",
    description: "Superfícies sem puxadores, push-to-open e integração de eletrodomésticos.",
  },
];

export const services = [
  {
    name: "Cozinhas por Medida",
    slug: "cozinhas",
    description:
      "Cozinhas personalizadas em madeira e pedra natural. Cada detalhe pensado para unir praticidade e estilo — ilhas, armários até ao teto e eletrodomésticos integrados.",
    keywords: ["cozinhas por medida Braga", "mobiliário cozinha Braga"],
  },
  {
    name: "Escadarias & Corrimãos",
    slug: "escadarias",
    description:
      "Escadas de madeira sob medida com corrimãos perfeitos para um acabamento moderno. Iluminação LED integrada e combinação com paredes em microcimento.",
    keywords: ["escadarias madeira Braga", "corrimãos madeira"],
  },
  {
    name: "Mobiliário de Casa de Banho",
    slug: "casas-banho",
    description:
      "Móveis suspensos em madeira nobre com tampos em mármore, gavetas push-to-open e acabamentos contemporâneos.",
    keywords: ["móvel casa de banho Braga", "mobiliário wc por medida"],
  },
  {
    name: "Portas & Caixilharias",
    slug: "portas",
    description:
      "Fabrico e instalação de portas interiores, portadas e caixilharias de madeira — lacadas ou com acabamento natural.",
    keywords: ["portas madeira Braga", "caixilharias por medida"],
  },
  {
    name: "Mobiliário Personalizado",
    slug: "mobiliario",
    description:
      "Roupeiros, closets, salas e peças únicas — tudo desenhado e fabricado na nossa oficina em Pousada.",
    keywords: ["mobiliário por medida Braga", "marcenaria Braga"],
  },
  {
    name: "Carpintaria em Obra",
    slug: "carpintaria",
    description:
      "Carpintaria para construção civil e reabilitação: fabrico, acabamento e instalação em moradias e empreendimentos residenciais.",
    keywords: ["carpintaria Braga", "carpinteiro Braga"],
  },
];

export const homeSeo = {
  title: "Carpintaria & Mobiliário por Medida em Braga | BPGonçalves — Orçamento Grátis",
  description:
    "BPGonçalves — Transformamos madeira em arte. Carpintaria e mobiliário por medida em Pousada, Braga. Cozinhas, escadarias, casas de banho e mobiliário personalizado. Orçamento gratuito: 936 455 181.",
  h1Line1: "Mobiliário & Carpintaria",
  h1Line2: "por Medida em Braga",
};

export const faqs = [
  {
    question: "Onde fica a BPGonçalves, Mobiliário & Carpintaria?",
    answer:
      "A nossa oficina fica na Rua da Cruz, nº 37, Pousada, 4710-730 Braga. Atendemos Braga, Palmeira, Famalicão, Guimarães e toda a região.",
  },
  {
    question: "Fazem cozinhas por medida em Braga?",
    answer:
      "Sim. Fabricamos cozinhas completas por medida em madeira e pedra natural — armários, ilhas, bancadas e integração de eletrodomésticos. Veja exemplos no nosso catálogo e Instagram.",
  },
  {
    question: "Como pedir orçamento?",
    answer:
      "Contacte-nos por telefone (936 455 181 ou 933 630 771), WhatsApp, email (bpgorcamentos@gmail.com) ou pelo formulário no site.",
  },
  {
    question: "Que materiais utilizam?",
    answer:
      "Trabalhamos com madeira maciça e folheados (carvalho, nogueira), pedra e mármore, microcimento, lacados e iluminação LED integrada — sempre adaptados ao projeto.",
  },
  {
    question: "Trabalham em Famalicão e Guimarães?",
    answer:
      "Sim. Deslocamo-nos a Braga, Vila Nova de Famalicão, Guimarães, Barcelos e concelhos vizinhos para medição, entrega e montagem.",
  },
  {
    question: "Posso ver trabalhos anteriores?",
    answer:
      "Sim. Visite a página Catálogo no site ou o nosso Instagram @_bp_carpintaria_ com fotos de projetos reais como Moradia C&A (Palmeira) e Projeto Bertrand (Braga).",
  },
];

export const differentiators = [
  "Transformamos madeira em arte — projetos 100% por medida",
  "Qualidade e dedicação em cada detalhe, do projeto à montagem",
  "Atelier em Pousada, Braga — carpintaria desde 2017",
  "Madeira, mármore, microcimento e LED integrado nas nossas obras",
  "Orçamento gratuito por telefone, WhatsApp ou email",
];

export const serviceAreas = [
  "Braga",
  "Pousada",
  "Palmeira",
  "Vila Nova de Famalicão",
  "Guimarães",
  "Barcelos",
  "Fafe",
  "Esposende",
  "Vila Verde",
  "Minho",
];
