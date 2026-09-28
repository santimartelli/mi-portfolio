/**
 * Clases compartidas de los desplegables de la barra de navegacion.
 *
 * El menu y el selector de idioma tienen que verse y comportarse igual, asi que
 * la caja vive en un solo sitio: si se cambia aqui, cambian los dos.
 *
 * El panel es un hijo de un `<details>` y su estado es el atributo `[open]`, que
 * pone el navegador: abrir y cerrar no necesita JavaScript. Las reglas que lo
 * enseñan y lo esconden —y las que cruzan las tres barras en aspa— viven en el
 * `<style is:global>` de `Layout.astro`, con la clase `dropdown-panel` como
 * enganche.
 *
 * Historia, porque el camino fue largo: primero el panel se montaba y
 * desmontaba con AnimatePresence y se desplegaba animando `height: 0 -> auto` con
 * Framer Motion, que obliga a medir el alto en tiempo de ejecucion (si la medida
 * sale cero, el panel se abre con altura cero, o sea invisible). Despues paso a
 * una clase de React con transicion, y seguia sin abrirse en el navegador del
 * usuario. Ahora el estado es del navegador y de nadie mas.
 */
export const dropdownPanelClass =
  'dropdown-panel absolute right-0 top-[72px] z-30 w-56 rounded-xl border border-black bg-white p-3 mobile-menu dark:border-gray-800 dark:bg-gray-950';

/** Clases de un item del panel, con el estado activo resuelto. */
export const dropdownItemClass = (isActive: boolean) =>
  `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out ${
    isActive
      ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
  }`;
