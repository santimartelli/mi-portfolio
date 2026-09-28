/**
 * Carga de contenido por locale.
 *
 * Solo lo importan las páginas de Astro (servidor). Se usan imports estáticos a
 * propósito: si a un idioma le falta una sección o una cadena, el typecheck falla
 * en lugar de fallar en producción.
 *
 * Los JSON importados tienen tipos ensanchados (`track: string` en lugar de la
 * unión literal), así que cada campo discriminante se valida aquí en tiempo de
 * ejecución y se estrecha al tipo correcto. Eso da validación real de los datos
 * sin añadir dependencias.
 */

import type { Locale, Translations } from './i18n';

import esHero from '../content/es/hero.json';
import esNavbar from '../content/es/navbar.json';
import esAbout from '../content/es/about.json';
import esExperience from '../content/es/experience.json';
import esSkills from '../content/es/skills.json';
import esProjects from '../content/es/projects.json';
import esContact from '../content/es/contact.json';
import esFooter from '../content/es/footer.json';

import enHero from '../content/en/hero.json';
import enNavbar from '../content/en/navbar.json';
import enAbout from '../content/en/about.json';
import enExperience from '../content/en/experience.json';
import enSkills from '../content/en/skills.json';
import enProjects from '../content/en/projects.json';
import enContact from '../content/en/contact.json';
import enFooter from '../content/en/footer.json';

type Experience = Translations['experience'];
type Projects = Translations['projects'];
type Contact = Translations['contact'];

const EXPERIENCE_TRACKS = ['hospitality', 'technology'] as const;
const PROJECT_STATUSES = ['production', 'development'] as const;
const CV_LOCALES = ['es', 'en'] as const;

/** Valida y estrecha la faceta de una entrada de experiencia. */
const parseTrack = (value: string): Experience['entries'][number]['track'] => {
  const match = EXPERIENCE_TRACKS.find((track) => track === value);
  if (!match) {
    throw new Error(`Contenido inválido: faceta de experiencia desconocida "${value}".`);
  }
  return match;
};

/** Valida y estrecha el estado de un caso de estudio. */
const parseStatus = (value: string): Projects['projects'][number]['status'] => {
  const match = PROJECT_STATUSES.find((status) => status === value);
  if (!match) {
    throw new Error(`Contenido inválido: estado de proyecto desconocido "${value}".`);
  }
  return match;
};

/** Valida y estrecha el idioma de un archivo de CV. */
const parseCvLocale = (value: string): Contact['cv']['files'][number]['id'] => {
  const match = CV_LOCALES.find((locale) => locale === value);
  if (!match) {
    throw new Error(`Contenido inválido: idioma de CV desconocido "${value}".`);
  }
  return match;
};

/** Aplica las validaciones a la sección de experiencia de un idioma. */
const toExperience = (raw: typeof esExperience): Experience => ({
  ...raw,
  entries: raw.entries.map((entry) => ({ ...entry, track: parseTrack(entry.track) })),
});

/** Aplica las validaciones a la sección de proyectos de un idioma. */
const toProjects = (raw: typeof esProjects): Projects => ({
  ...raw,
  projects: raw.projects.map((project) => ({ ...project, status: parseStatus(project.status) })),
});

/** Aplica las validaciones a la sección de contacto de un idioma. */
const toContact = (raw: typeof esContact): Contact => ({
  ...raw,
  cv: {
    ...raw.cv,
    files: raw.cv.files.map((file) => ({ ...file, id: parseCvLocale(file.id) })),
  },
});

/**
 * Traducciones completas por idioma.
 *
 * La anotación `Record<Locale, Translations>` obliga a que ambos idiomas
 * expongan exactamente la misma estructura.
 */
const CONTENT: Record<Locale, Translations> = {
  es: {
    hero: esHero,
    navbar: esNavbar,
    about: esAbout,
    experience: toExperience(esExperience),
    skills: esSkills,
    projects: toProjects(esProjects),
    contact: toContact(esContact),
    footer: esFooter,
  },
  en: {
    hero: enHero,
    navbar: enNavbar,
    about: enAbout,
    experience: toExperience(enExperience),
    skills: enSkills,
    projects: toProjects(enProjects),
    contact: toContact(enContact),
    footer: enFooter,
  },
};

/** Devuelve todas las traducciones de un locale. */
export const getTranslations = (locale: Locale): Translations => CONTENT[locale];

/** Lista de locales soportados, útil para generar rutas y hreflang. */
export const LOCALES: readonly Locale[] = ['es', 'en'];
