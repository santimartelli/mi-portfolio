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
  /** Parrafos de presentacion, en orden. */
  description: string[];
  /** El enfoque: las areas hacia las que apunta el perfil, como chips. */
  focus: string[];
  /** La experiencia practica, en una sola linea de rotulo y valor. */
  practice: { label: string; value: string };
  /** Las dos acciones del hero: ir a la experiencia y abrir LinkedIn. */
  buttons: { experience: string; linkedin: string };
  /**
   * El panel lateral. Cada texto va como lista de lineas para fijar los cortes
   * exactos: en mayusculas y con tracking amplio, el corte automatico no es
   * predecible y el dibujo depende de donde rompe cada frase.
   */
  panel: {
    heading: string[];
    subline: string[];
    /** El eje: las palabras de arriba y las de abajo de la linea del punto. */
    axis: { above: string[]; below: string[] };
    footer: string[];
  };
  /** Estado de disponibilidad, sin rotulo: lo precede un punto de color. */
  availability: string;
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
  /** Etiquetas accesibles del conmutador de tema. */
  themeLabels: {
    toLight: string;
    toDark: string;
  };
}

export interface AboutTranslations {
  title: string;
  lead: string;
  story: Array<{ id: string; title: string; paragraphs: string[] }>;
  bridge: { title: string; paragraphs: string[] };
  principles: { title: string; items: Array<{ title: string; text: string }> };
}

export type ExperienceTrack = 'hospitality' | 'technology';

export interface ExperienceEntry {
  id: string;
  track: ExperienceTrack;
  company: string;
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
  /** Nota de honestidad sobre áreas objetivo aún no desempeñadas como cargo. */
  note: string;
  entries: ExperienceEntry[];
}

export interface SkillsTranslations {
  title: string;
  description: string;
  groups: Array<{
    id: string;
    title: string;
    note?: string;
    items: Array<{ label: string; level?: string }>;
  }>;
  languages: {
    title: string;
    items: Array<{ name: string; level: string }>;
  };
  education: {
    title: string;
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
