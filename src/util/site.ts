/**
 * Configuración central del sitio.
 *
 * Fuente única de verdad para la URL canónica, los enlaces externos y los datos
 * de contacto. Todo lo que aparece en más de un componente vive aquí para evitar
 * que LinkedIn, el CV y la web se contradigan entre sí.
 */

/** Dominio canónico de producción. `www.martelli.dev` es un problema aparte. */
export const SITE_URL = 'https://martelli.dev';

/** Ruta del CV de desarrollo web (los PDF actuales). */
export const CV_FILES = {
  es: 'Santiago_Martelli_CV_Esp.pdf',
  en: 'Santiago_Martelli_CV_Eng.pdf',
} as const;

export const SITE = {
  name: 'Santiago Martelli',
  /** Línea corta de posicionamiento del logo, válida en ambos idiomas. */
  tagline: 'Hotel Tech & Operations',
  email: 'santimartelli@gmail.com',
  phone: '+34 628 434 434',
  location: 'Girona · Barcelona · Remoto',
  github: 'https://github.com/santimartelli',
  githubHandle: '@santimartelli',
  linkedin: 'https://www.linkedin.com/in/santiagomartelli/',
  linkedinHandle: '@santiagomartelli',
  whatsapp: 'https://wa.me/34628434434',
} as const;

/**
 * Imagen social por defecto. Se genera con `scripts/generate-og.mjs`.
 */
export const OG_IMAGE = {
  es: '/og/og-es.png',
  en: '/og/og-en.png',
} as const;

/**
 * Devuelve la ruta canónica de una página a partir del locale.
 * El español vive en `/` y el inglés en `/en/`.
 */
export const pathForLocale = (locale: 'es' | 'en'): string => (locale === 'en' ? '/en/' : '/');
