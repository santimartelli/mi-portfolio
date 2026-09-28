/**
 * Tipos del contenido por idioma.
 *
 * El locale se resuelve en el servidor (build time) y se pasa como prop, igual
 * que el contenido de cada sección. Al ser contenido estático no necesita
 * contexto de React: pasarlo por props evita serializar todo el contenido del
 * sitio dentro de cada isla.
 *
 * Este módulo es solo de tipos: no importa React ni nada en tiempo de ejecución.
 */

/** Locales soportados por la web. */
export type Locale = 'es' | 'en';

export interface HeroTranslations {
  headline: string;
  /** Parrafo de presentacion. Va en un solo bloque, sin cortes. */
  description: string;
  /** Accion principal del hero. Enlaza a la seccion de experiencia. */
  cta: string;
  /** Segunda accion del hero, junto a la principal. Enlaza a proyectos. */
  ctaProjects: string;
  /**
   * Texto alternativo de la ilustracion del hero. Es contenido, no decoracion:
   * la imagen ocupa una columna entera y aporta significado, asi que se
   * describe en cada idioma en vez de dejarla con alt vacio.
   */
  imageAlt: string;
  /**
   * Caracteristicas y logros, en piezas cortas, para el marquee al pie del hero.
   * Cada una es una unidad suelta: se leen en diagonal y se separan con un punto
   * en el marcado, no dentro del texto. El orden del array es el de lectura.
   */
  marquee: string[];
}

export interface NavbarTranslations {
  navigation: {
    home: string;
    about: string;
    experience: string;
    skills: string;
    projects: string;
    contact: string;
  };
  /** Etiqueta accesible del botón que abre el menú. */
  menuLabel: string;
  /** Etiqueta accesible del selector de idioma. */
  languageLabel: string;
}

export interface AboutTranslations {
  title: string;
  /** Entradilla: el porque de la seccion, en dos o tres lineas. */
  lead: string;
  /**
   * Las tres etapas de la trayectoria, en orden cronologico. Una linea cada una:
   * el detalle vive en las secciones de experiencia, skills y proyectos, aqui
   * solo el arco.
   */
  steps: Array<{ id: string; title: string; line: string }>;
  /** Lo que puedo aportar: tres piezas cortas, con su rotulo. */
  principles: { title: string; items: Array<{ title: string; text: string }> };
}

export type ExperienceTrack = 'hospitality' | 'technology';

export interface ExperienceEntry {
  id: string;
  track: ExperienceTrack;
  company: string;
  /**
   * Logotipo de la empresa, para la esquina de la tarjeta. No lleva alt: el
   * nombre va justo al lado y la imagen solo lo acompania.
   */
  logo?: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tools?: string[];
}

export interface ExperienceTranslations {
  title: string;
  description: string;
  /** Etiqueta del filtro que muestra ambas facetas. */
  allLabel: string;
  trackLabels: Record<ExperienceTrack, string>;
  /**
   * Los puestos, en orden de lectura: los mas recientes primero, por fecha de
   * fin, y los que siguen abiertos arriba. El filtro conserva ese orden.
   */
  entries: ExperienceEntry[];
}

export interface SkillsTranslations {
  title: string;
  description: string;
  /**
   * Los bloques de la seccion. Cada uno lleva su titulo y una descripcion breve,
   * que es lo que se lee en la columna izquierda de su tarjeta; el contenido va a
   * la derecha.
   */
  groups: Array<{
    id: string;
    title: string;
    description: string;
    items: Array<{ label: string; level?: string }>;
  }>;
  languages: {
    title: string;
    description: string;
    items: Array<{ name: string; level: string }>;
  };
  education: {
    title: string;
    description: string;
    items: Array<{ title: string; meta: string }>;
  };
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  status: 'production' | 'development';
  image: string;
  imageAlt: string;
  href?: string;
  code?: string;
  problem: string;
  solution: string;
  role: string;
  implementation: string[];
  result: string;
  technologies: string[];
  previousStack?: string[];
  /** Tabla comparativa opcional con métricas medidas (no inventadas). */
  metrics?: {
    title: string;
    columns: string[];
    rows: string[][];
  };
}

export interface ProjectsTranslations {
  title: string;
  description: string;
  labels: {
    problem: string;
    solution: string;
    role: string;
    implementation: string;
    result: string;
    technology: string;
    previousStack: string;
    visit: string;
    code: string;
  };
  status: Record<'production' | 'development', string>;
  projects: ProjectCaseStudy[];
}

export interface ContactTranslations {
  title: string;
  description: string;
  statement: string;
  channelsTitle: string;
  channels: {
    email: { label: string; description: string };
    linkedin: { label: string; description: string };
    whatsapp: { label: string; description: string };
    github: { label: string; description: string };
  };
  cv: {
    title: string;
    subtitle: string;
    summary: string;
    download: string;
    hotelTech: {
      title: string;
      description: string;
      status: string;
    };
    files: Array<{ id: 'es' | 'en'; language: string; label: string; description: string }>;
  };
  availability: { title: string; text: string };
  closing: string;
}

export interface FooterTranslations {
  brand: { name: string; description: string };
  navigation: {
    title: string;
    links: {
      home: string;
      about: string;
      experience: string;
      skills: string;
      projects: string;
      contact: string;
    };
  };
  technologies: { title: string };
  builtWith: { label: string; items: string[] };
  location: { label: string; value: string };
  copyright: string;
}

/** Agrupa todas las traducciones del sitio para un locale. */
export interface Translations {
  hero: HeroTranslations;
  navbar: NavbarTranslations;
  about: AboutTranslations;
  experience: ExperienceTranslations;
  skills: SkillsTranslations;
  projects: ProjectsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
}
