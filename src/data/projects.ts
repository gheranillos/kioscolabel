export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  longDescription: string;
  tags: string[];
  coverImage: string;
  images: string[];
  accentColor: string;
};

export const projects: Project[] = [
  {
    slug: "el-kiosco",
    title: "El Kiosco",
    category: "Proyecto Propio / Cultura Visual",
    year: "2024",
    client: "El Kiosco",
    role: "Dirección Creativa",
    description:
      "Marca y universo creativo donde mezclo ropa, audiovisual, storytelling, comunidad y dirección estética con una energía urbana marcada.",
    longDescription:
      "El Kiosco nació como un proyecto personal para explorar la intersección entre moda urbana, contenido visual y comunidad. Desarrollé la identidad completa: naming, sistema gráfico, paleta, dirección de arte y estrategia de contenido para redes. Cada pieza comunica una estética coherente y con personalidad propia.",
    tags: ["Branding", "Dirección de Arte", "Contenido", "Identidad Visual"],
    coverImage: "/images/projects/coverkiosco.webp",
    images: [
      "/images/projects/kiosco1.jpg",
      "https://youtu.be/ItFnhcX-3Us",
      "/images/projects/kiosco2.jpg",
      "https://youtu.be/w9xrjCrzWKo",
      "/images/projects/kiosco3.jpg",
      "https://youtube.com/shorts/6pKUAn1O2_Y?feature=share",
      "/images/projects/kiosco4.jpg",
      "https://youtube.com/shorts/2Q0CYNURF7M?feature=share",
      "/images/projects/kiosco5.jpg",
      "https://youtube.com/shorts/91pYvwxr9J0?feature=share",
      "https://youtu.be/qhkgym3-Ik8",
    ],
    accentColor: "#f7b7ff",
  },
  {
    slug: "mtb-caracas",
    title: "Mtb caracas",
    category: "Canal de youtube | Edicion",
    year: "2024 - en curso",
    client: "Mtb Caracas",
    role: "Editor de videos",
    description:
      "Diseño de marcas, sistemas visuales, piezas gráficas y conceptos que buscan verse sólidos, actuales y con personalidad.",
    longDescription:
      "Me encargo de editar, filtrar y gestionar el contenido del canal de youtube. Buscando mostrar el MTB en Venezuela y Caracas.",
    tags: ["Youtube", "Edicion", "Dirección"],
    coverImage: "/images/projects/covermtb.webp",
    images: [
      "https://www.youtube.com/watch?v=u6CZna11jGE&t=885s",
      "https://www.youtube.com/watch?v=LbnLk-tDUM4&t=4s",
      "https://www.youtube.com/watch?v=iwsh9kQaL-A",
      "https://www.youtube.com/watch?v=9JdqWfUkwp0&t=1424s",
      "https://www.youtube.com/watch?v=Ez-fszUFfqk&t=5s",
    ],
    accentColor: "#f7b7ff",
  },
  {
    slug: "padelcafe",
    title: "Padel Cafe",
    category: "Branding",
    year: "2025",
    client: "Branding",
    role: "Dirección creativa | diseñador",
    description:
      "Piezas para redes, campañas, promos y contenido audiovisual pensado para retener, comunicar y elevar la imagen del proyecto.",
    longDescription:
      "Club enfocado en ser un centro deportivo y recreativo para familiares y amigos. Su enfoque principal es el Padel.",
    tags: ["Branding", "direccion creativa", "Diseño"],
    coverImage: "/images/projects/coverpadelcafe.webp",
    images: [
      "/images/projects/padel 1.png",
      "/images/projects/padel 3.png",
      "/images/projects/padel 4.png",
      "/images/projects/padel 5.png",
      "/images/projects/padel 6.png",
      "/images/projects/padel 7.png",
      "/images/projects/padel 8.png",
      "/images/projects/padel 9.png",
      "/images/projects/padel 10.png",
    ],
    accentColor: "#f7b7ff",
  },
  {
    slug: "freelance",
    title: "Trabajos Freelance",
    category: "Edicion y creación",
    year: "2024-2026",
    client: "Clientes Independientes",
    role: "Diseño y Producción",
    description:
      "Trabajos desarrollados para marcas y proyectos en áreas como contenido, visuales, branding y dirección creativa.",
    longDescription:
      "Colaboraciones con marcas, emprendedores y estudios creativos. Proyectos variados que van desde identidad visual hasta dirección de contenido, pasando por diseño gráfico y producción audiovisual.",
    tags: ["Freelance", "Colaboración", "Branding", "Diseño"],
    coverImage: "/images/projects/coverfreelancer.webp",
    images: [
      "/images/projects/free1.webp",
      "https://youtube.com/shorts/8_0muzhg-74?feature=share",
      "/images/projects/free2.webp",
      "https://youtube.com/shorts/ZDx5rVrPF00?feature=share",
      "/images/projects/free3.webp",
      "https://youtube.com/shorts/GcEDEXxUqHM?feature=share",
      "/images/projects/free4.webp",
      "https://youtu.be/ItFnhcX-3Us",
      "/images/projects/free5.webp",
      "https://youtu.be/5HJHZmgh3ho",
      "/images/projects/free6.webp",
      "https://youtube.com/shorts/kDNuenE-J6A?feature=share",
      "https://www.youtube.com/watch?v=1n8G_QSA8-Q&list=RD1n8G_QSA8-Q&start_radio=1",
    ],
    accentColor: "#f7b7ff",
  },
  {
    slug: "naponino",
    title: "Naponino",
    category: "Branding",
    year: "2025",
    client: "Naponino",
    role: "Diseño, Dirección",
    description:
      "Proyecto de branding para Naponino enfocado en construir una identidad visual clara, moderna y con personalidad.",
    longDescription:
      "Desarrollo de identidad de marca para Naponino con enfoque en dirección visual y diseño aplicado a piezas clave del proyecto.",
    tags: ["Diseño", "Dirección"],
    coverImage: "/images/projects/covernapo.webp",
    images: [
      "/images/projects/napo1.webp",
      "/images/projects/napo2.webp",
      "/images/projects/napo3.webp",
      "/images/projects/napo4.webp",
      "/images/projects/napo5.webp",
      "/images/projects/napo6.webp",
      "/images/projects/napo7.webp",
      "/images/projects/napo8.webp",
    ],
    accentColor: "#f7b7ff",
  },
  {
    slug: "dtf-lecheria",
    title: "DTF Lecheria",
    category: "Branding",
    year: "2026",
    client: "Naponino",
    role: "Diseño, dirección",
    description:
      "Proyecto de branding para DTF Lecheria, enfocado en una identidad visual sólida y versátil para piezas digitales y de marca.",
    longDescription:
      "Desarrollo de branding para DTF Lecheria con enfoque en diseño y dirección visual para reforzar su presencia y coherencia de marca.",
    tags: ["Diseño", "Dirección"],
    coverImage: "/images/projects/coverdtf.webp",
    images: [
      "/images/projects/dtf1.webp",
      "/images/projects/dtf2.webp",
      "/images/projects/dtf3.webp",
      "/images/projects/dtf4.webp",
      "/images/projects/dtf5.webp",
      "/images/projects/dtf6.webp",
    ],
    accentColor: "#f7b7ff",
  },
];

/** Orden en `/work`: ritmo editorial (no altera rutas de los proyectos). */
export const WORK_PAGE_PROJECT_SLUGS = [
  "el-kiosco",
  "mtb-caracas",
  "padelcafe",
  "freelance",
  "naponino",
  "dtf-lecheria",
] as const;

export function projectsInWorkGridOrder(all: Project[] = projects): Project[] {
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  return WORK_PAGE_PROJECT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is Project => Boolean(p),
  );
}
