import type { APIRoute } from 'astro';
import { LOCALES } from '../util/content';
import { SITE_URL, pathForLocale } from '../util/site';

export const prerender = true;

/**
 * Sitemap con las dos versiones de idioma y sus alternativas hreflang.
 *
 * Se genera en el build en lugar de mantenerse a mano para que no pueda quedar
 * desincronizado con las páginas reales.
 */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urlFor = (locale: (typeof LOCALES)[number]) =>
    new URL(pathForLocale(locale), SITE_URL).href;

  const alternates = [
    ...LOCALES.map(
      (locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${urlFor(locale)}"/>`
    ),
    // x-default apunta al inglés: es la versión que se comparte desde LinkedIn.
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en')}"/>`,
  ].join('\n');

  const entries = LOCALES.map((locale) =>
    [
      '  <url>',
      `    <loc>${urlFor(locale)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      alternates,
      '  </url>',
    ].join('\n')
  ).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
