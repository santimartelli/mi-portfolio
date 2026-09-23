/**
 * Genera los assets derivados del portfolio.
 *
 *   node scripts/generate-assets.mjs
 *
 * Produce:
 *   - public/images/*.webp        Imágenes de los casos de estudio, redimensionadas
 *                                 y comprimidas (las originales pesaban ~1 MB).
 *   - public/og/og-es.png         Imagen social (1200×630) en español.
 *   - public/og/og-en.png         Imagen social (1200×630) en inglés.
 *
 * El texto de las imágenes se dibuja con SVG, así que necesita al menos una
 * fuente del sistema. Si `fc-list` no encuentra ninguna, el script lo avisa: las
 * imágenes se generan igualmente, pero sin texto.
 *
 * Usa `sharp`, que ya viene en el árbol de dependencias de Astro, por lo que no
 * hace falta declararlo aparte.
 *
 * Este script es una herramienta de desarrollo: se ejecuta a mano cuando cambian
 * las imágenes de origen. No forma parte del build.
 */

import { mkdir, writeFile, stat, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

// ---------------------------------------------------------------------------
// Fontconfig: librsvg necesita un config y una carpeta de fuentes para dibujar
// texto. Se apunta a los directorios habituales del sistema.
// ---------------------------------------------------------------------------

const FONT_DIRS = [
  '/usr/share/fonts',
  '/usr/local/share/fonts',
  '/tmp/syslibs/root/usr/share/fonts',
].filter((dir) => existsSync(dir));

const fontConfigDir = join(tmpdir(), 'mi-portfolio-fontconfig');
const fontConfigPath = join(fontConfigDir, 'fonts.conf');
await mkdir(fontConfigDir, { recursive: true });
await writeFile(
  fontConfigPath,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
${FONT_DIRS.map((dir) => `  <dir>${dir}</dir>`).join('\n')}
  <cachedir>${join(fontConfigDir, 'cache')}</cachedir>
</fontconfig>
`
);
process.env.FONTCONFIG_FILE = fontConfigPath;

if (FONT_DIRS.length === 0) {
  console.warn('⚠ No se encontraron directorios de fuentes: las imágenes saldrán sin texto.');
}

// sharp se importa después de fijar FONTCONFIG_FILE para que librsvg lo lea.
const { default: sharp } = await import('sharp');

const FONT_STACK = 'Liberation Sans, DejaVu Sans, Helvetica, Arial, sans-serif';

/** Escapa texto para incluirlo en SVG. */
const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------
// Paleta, alineada con el CSS del sitio
// ---------------------------------------------------------------------------

const COLORS = {
  bg: '#0a0b0f',
  surface: '#151821',
  border: '#2a3140',
  text: '#f8fafc',
  muted: '#94a3b8',
  accent: '#3b82f6',
  accentSoft: '#06b6d4',
};

/**
 * Fondo común: rejilla tenue + halo de acento, para que las imágenes no sean
 * un rectángulo plano.
 */
const background = (width, height) => `
  <defs>
    <linearGradient id="glow" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${COLORS.accent}" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="${COLORS.accentSoft}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${COLORS.bg}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${COLORS.border}" stroke-width="1" stroke-opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="${COLORS.bg}"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
`;

/** Genera la imagen social de un idioma. */
const socialSvg = ({ eyebrow, name, headlineLines, url }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${background(1200, 630)}
  <rect x="80" y="96" width="56" height="4" fill="${COLORS.accent}"/>
  <text x="80" y="152" font-family="${FONT_STACK}" font-size="22" font-weight="600"
        letter-spacing="5" fill="${COLORS.muted}">${escapeXml(eyebrow)}</text>
  <text x="80" y="272" font-family="${FONT_STACK}" font-size="82" font-weight="700"
        letter-spacing="-1" fill="${COLORS.text}">${escapeXml(name)}</text>
  <line x1="80" y1="326" x2="1120" y2="326" stroke="${COLORS.border}" stroke-width="1"/>
${headlineLines
  .map(
    (line, index) => `  <text x="80" y="${404 + index * 54}" font-family="${FONT_STACK}" font-size="38" font-weight="400"
        fill="${COLORS.text}">${escapeXml(line)}</text>`
  )
  .join('\n')}
  <text x="80" y="530" font-family="${FONT_STACK}" font-size="26" font-weight="600"
        letter-spacing="3" fill="${COLORS.accent}">${escapeXml(url)}</text>
</svg>
`;

/** Imagen del caso de estudio de martelli.dev: el cambio de posicionamiento. */
const repositioningSvg = ({ brand, beforeLabel, afterLabel, before, after }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  ${background(1200, 675)}
  <text x="80" y="112" font-family="${FONT_STACK}" font-size="34" font-weight="700"
        letter-spacing="-0.5" fill="${COLORS.text}">${escapeXml(brand)}</text>
  <text x="80" y="152" font-family="${FONT_STACK}" font-size="20" font-weight="600"
        letter-spacing="4" fill="${COLORS.muted}">${escapeXml(beforeLabel)} / ${escapeXml(afterLabel)}</text>

  <rect x="80" y="204" width="1040" height="140" fill="${COLORS.surface}" fill-opacity="0.75"
        stroke="${COLORS.border}" stroke-width="1"/>
  <rect x="80" y="204" width="6" height="140" fill="${COLORS.muted}"/>
  <text x="124" y="256" font-family="${FONT_STACK}" font-size="18" font-weight="700"
        letter-spacing="4" fill="${COLORS.muted}">${escapeXml(beforeLabel)}</text>
  <text x="124" y="308" font-family="${FONT_STACK}" font-size="30" font-weight="400"
        fill="${COLORS.muted}">${escapeXml(before)}</text>

  <rect x="80" y="392" width="1040" height="140" fill="${COLORS.surface}" fill-opacity="0.95"
        stroke="${COLORS.accent}" stroke-width="1.5"/>
  <rect x="80" y="392" width="6" height="140" fill="${COLORS.accent}"/>
  <text x="124" y="444" font-family="${FONT_STACK}" font-size="18" font-weight="700"
        letter-spacing="4" fill="${COLORS.accent}">${escapeXml(afterLabel)}</text>
  <text x="124" y="496" font-family="${FONT_STACK}" font-size="30" font-weight="600"
        fill="${COLORS.text}">${escapeXml(after)}</text>
</svg>
`;

// ---------------------------------------------------------------------------
// Ejecución
// ---------------------------------------------------------------------------

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

/** Informa del antes/después de un archivo generado. */
const report = async (outPath, originalPath) => {
  const size = (await stat(outPath)).size;
  const before = originalPath && existsSync(originalPath) ? ` (antes ${kb((await stat(originalPath)).size)})` : '';
  console.log(`  ${outPath.replace(`${ROOT}/`, '')} — ${kb(size)}${before}`);
};

/**
 * Convierte una imagen de origen en su versión optimizada.
 *
 * Es idempotente: los originales se eliminan al final de la primera ejecución
 * (siguen en el historial de git), así que si ya no están solo se avisa.
 */
const optimise = async ({ source, out, width, height, quality, label }) => {
  if (!existsSync(source)) {
    if (existsSync(out)) {
      console.log(`  ${label}: ya generado (origen ausente, se conserva el actual)`);
    } else {
      console.warn(`  ${label}: falta el origen ${source.replace(`${ROOT}/`, '')}.`);
    }
    return;
  }

  await sharp(source)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .webp({ quality, effort: 5 })
    .toFile(out);
  await report(out, source);
};

await mkdir(join(PUBLIC, 'images'), { recursive: true });
await mkdir(join(PUBLIC, 'og'), { recursive: true });

console.log('Imágenes de casos de estudio:');

// Tanya Martelli: el original ya es webp y ligero, solo se ajusta el tamaño.
await optimise({
  label: 'Tanya Martelli Photography',
  source: join(PUBLIC, 'tmphoto.webp'),
  out: join(PUBLIC, 'images', 'tanya-martelli.webp'),
  width: 1200,
  height: 675,
  quality: 80,
});

// Acerko: el original era un PNG de 1920×1080 de más de 1 MB.
await optimise({
  label: 'Acerko.com',
  source: join(PUBLIC, 'acerko.png'),
  out: join(PUBLIC, 'images', 'acerko.webp'),
  width: 1200,
  height: 675,
  quality: 80,
});

// martelli.dev: gráfico propio antes/después.
const repositioningOut = join(PUBLIC, 'images', 'martelli-dev.webp');
await sharp(
  Buffer.from(
    repositioningSvg({
      brand: 'martelli.dev',
      beforeLabel: 'ANTES',
      afterLabel: 'DESPUÉS',
      before: 'LinkedIn: hospitality · Web: Full Stack Developer',
      after: 'Hospitality + Operations + Technology',
    })
  )
)
  .webp({ quality: 88, effort: 5 })
  .toFile(repositioningOut);
await report(repositioningOut);

console.log('Imágenes sociales:');

const ogEs = join(PUBLIC, 'og', 'og-es.png');
await sharp(
  Buffer.from(
    socialSvg({
      eyebrow: 'HOSPITALITY OPERATIONS · HOTEL TECH',
      name: 'Santiago Martelli',
      headlineLines: ['Operaciones hoteleras y tecnología,', 'en un mismo perfil.'],
      url: 'martelli.dev',
    })
  )
)
  .png({ compressionLevel: 9 })
  .toFile(ogEs);
await report(ogEs);

const ogEn = join(PUBLIC, 'og', 'og-en.png');
await sharp(
  Buffer.from(
    socialSvg({
      eyebrow: 'HOSPITALITY OPERATIONS · HOTEL TECH',
      name: 'Santiago Martelli',
      headlineLines: ['Hotel operations and technology,', 'in one profile.'],
      url: 'martelli.dev/en/',
    })
  )
)
  .png({ compressionLevel: 9 })
  .toFile(ogEn);
await report(ogEn);

// Los originales ya no se usan: las páginas apuntan a /images/*.webp
for (const obsolete of ['acerko.png', 'tmphoto.webp']) {
  const path = join(PUBLIC, obsolete);
  if (existsSync(path)) {
    await unlink(path);
    console.log(`  eliminado public/${obsolete}`);
  }
}

console.log('\nListo.');
