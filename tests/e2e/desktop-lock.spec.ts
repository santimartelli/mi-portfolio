import { test, expect, type Page } from '@playwright/test';

/**
 * **Diseno de escritorio bloqueado.**
 *
 * El usuario dio por bueno el escritorio («Desktop ya esta perfecto, no lo toques
 * y bloquea el diseno»), asi que estas medidas son el contrato: si alguien mueve
 * el hero, la retícula, la fila de iconos o el pie de escritorio, este test falla
 * y obliga a decidirlo a proposito.
 *
 * No compara pixeles de una captura —eso ata el test a la version del navegador y
 * a las fuentes—, sino la **geometria** en px de CSS a 1440x900: las cajas de las
 * piezas del hero, los pasos de letra, el ancho de las dos columnas y la caja del
 * pie. El tiron es de 1px, que es lo que puede bailar por redondeo.
 *
 * El pie se mide **relativo a su propia caja** (alto, filete, posicion de los
 * items dentro y distancia al final de la pagina) y no en coordenadas absolutas:
 * su `y` depende de cuanto ocupen las secciones de en medio, y esas crecen o
 * menguan cuando un texto largo parte en una linea mas segun la maquina. La
 * frontera con Contacto si se comprueba: el pie empieza donde acaba la seccion.
 *
 * El pulido de movil se hace por debajo de `lg`, asi que no toca nada de esto:
 * `--text-display` vive en su media query, `.hero-media` en su regla base y la
 * entradilla usa `text-sm lg:text-lead`. Si este test sigue verde, el escritorio
 * no se ha movido.
 */

const VIEWPORT = { width: 1440, height: 900 };

/** Cajas absolutas: las del hero, que empieza en el borde de arriba. */
const CAJAS_HERO: Array<{ nombre: string; selector: string; caja: [number, number, number, number] }> = [
  { nombre: 'hero', selector: '#home', caja: [0, 0, 1440, 900] },
  { nombre: 'ilustracion', selector: '#home img', caja: [752, 198, 608, 456] },
  { nombre: 'titular', selector: '#home h1', caja: [80, 216, 608, 195] },
  { nombre: 'entradilla', selector: '#home p', caja: [80, 443, 608, 144] },
  { nombre: 'cta', selector: '#home a[href="#experience"]', caja: [80, 619, 116, 17] },
  { nombre: 'fila de iconos del hero', selector: '#home .shell > ul', caja: [80, 788, 1280, 48] },
  { nombre: 'icono de contacto del hero', selector: '#home .shell > ul svg', caja: [618, 800, 24, 24] },
];

const cajaDe = (page: Page, selector: string, ejeY: 'documento' | 'relativo' = 'documento') =>
  page
    .locator(selector)
    .first()
    .evaluate(
      (el, eje) => {
        const b = el.getBoundingClientRect();
        const base = eje === 'relativo' ? el.closest('footer')!.getBoundingClientRect().top : 0;
        return [b.x, eje === 'relativo' ? b.top - base : b.top + window.scrollY, b.width, b.height].map(
          (n) => Math.round(n),
        );
      },
      ejeY,
    );

const comprobar = (nombre: string, medida: number[], esperada: number[]) => {
  for (let i = 0; i < 4; i += 1) {
    expect(
      Math.abs(medida[i] - esperada[i]),
      `${nombre}: se esperaba [${esperada.join(', ')}] y mide [${medida.join(', ')}]`,
    ).toBeLessThanOrEqual(1);
  }
};

test.describe('diseno de escritorio bloqueado', () => {
  test('la geometria de 1440x900 no se mueve', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'El bloqueo es del escritorio');

    await page.setViewportSize(VIEWPORT);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    for (const { nombre, selector, caja } of CAJAS_HERO) {
      comprobar(nombre, await cajaDe(page, selector), caja);
    }

    // La retícula del hero: dos columnas iguales, 6/6.
    const columnas = await page
      .locator('#home .shell > div')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(columnas).toBe('608px 608px');

    // Los pasos de letra del hero.
    expect(await page.locator('#home h1').evaluate((el) => getComputedStyle(el).fontSize)).toBe(
      '66.24px',
    );
    expect(await page.locator('#home p').evaluate((el) => getComputedStyle(el).fontSize)).toBe(
      '18px',
    );

    // El pie: ancho completo, alto de la banda y filete del gris de las tarjetas.
    const cajaPie = await cajaDe(page, 'footer');
    expect(cajaPie[0], `pie: x=${cajaPie[0]}`).toBe(0);
    expect(cajaPie[2], `pie: ancho=${cajaPie[2]}`).toBe(1440);
    expect(cajaPie[3], `pie: alto=${cajaPie[3]}`).toBe(65);
    const pie = page.locator('footer');
    expect(await pie.evaluate((el) => getComputedStyle(el).borderTopWidth)).toBe('1px');
    expect(await pie.evaluate((el) => getComputedStyle(el).borderTopColor)).toBe(
      'rgb(229, 231, 235)',
    );
    comprobar(
      'iconos dentro del pie',
      await cajaDe(page, 'footer .bleed ul', 'relativo'),
      [1188, 9, 204, 48],
    );
    // El aviso legal se comprueba por su esquina y su centrado, no por su ancho:
    // el ancho lo pone el texto, y dos maquinas pueden medirlo con 1-2px de
    // diferencia sin que el diseno haya cambiado.
    const cajaLegal = await cajaDe(page, 'footer .bleed > p', 'relativo');
    expect(cajaLegal[0], `aviso legal: x=${cajaLegal[0]}`).toBe(48);
    expect(Math.abs(cajaLegal[1] - 23), `aviso legal: y=${cajaLegal[1]}`).toBeLessThanOrEqual(1);

    // El pie empieza donde acaba Contacto, y sus iconos quedan a 8px del final.
    const frontera = await page.evaluate(() => {
      const contacto = document.querySelector('#contact')!.getBoundingClientRect();
      const footer = document.querySelector('footer')!.getBoundingClientRect();
      const iconos = document.querySelector('footer ul')!.getBoundingClientRect();
      return {
        contactoAbajo: Math.round(contacto.bottom + window.scrollY),
        pieArriba: Math.round(footer.top + window.scrollY),
        iconosAlFinal: Math.round(document.documentElement.scrollHeight - (iconos.bottom + window.scrollY)),
      };
    });
    expect(frontera.pieArriba).toBe(frontera.contactoAbajo);
    expect(frontera.iconosAlFinal).toBe(8);

    // Sin desbordamiento horizontal.
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
  });
});
