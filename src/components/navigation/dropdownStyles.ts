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
 * La caja es **la de las tarjetas de la web**: 1px de `gray-200` (a peticion del
 * usuario, que el filete negro del panel era demasiado duro), el mismo radio de
 * 12px y el mismo `p-3` que el resto de superficies. La profundidad de este mundo
 * se declara asi, con un filete de 1px y sin sombra, asi que el panel flota con
 * el mismo recurso que una tarjeta: no hay una segunda forma de elevar nada. El
 * panel no oscurece el filete al pasar el puntero como las tarjetas: aqui lo que
 * responde es cada item, y el panel entero no es una superficie que se pulse.
 *
 * Historia, porque el camino fue largo: primero el panel se montaba y
 * desmontaba con AnimatePresence y se desplegaba animando `height: 0 -> auto` con
 * Framer Motion, que obliga a medir el alto en tiempo de ejecucion (si la medida
 * sale cero, el panel se abre con altura cero, o sea invisible). Despues paso a
 * una clase de React con transicion, y seguia sin abrirse en el navegador del
 * usuario. Ahora el estado es del navegador y de nadie mas.
 */
export const dropdownPanelClass =
  'dropdown-panel absolute right-0 top-[72px] z-30 w-56 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-950';

/** Clases de un item del panel, con el estado activo resuelto. */
export const dropdownItemClass = (isActive: boolean) =>
  `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out ${
    isActive
      ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
  }`;
