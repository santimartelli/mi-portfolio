/**
 * Clases compartidas de los desplegables de la barra de navegacion.
 *
 * El menu y el selector de idioma tienen que verse y comportarse igual, asi que
 * la caja vive en un solo sitio: si se cambia aqui, cambian los dos.
 *
 * El panel se pinta siempre y lo que cambia es la clase: abierto esta visible y
 * en su sitio, y cerrado se esconde con `visibility` —que ademas lo saca del
 * arbol de accesibilidad y del orden de tabulacion— y se desplaza 4px hacia
 * arriba. La transicion es de estado, no de entrada, y `motion-reduce` la apaga.
 *
 * Antes el panel se montaba y desmontaba con AnimatePresence y se desplegaba
 * animando `height: 0 -> auto` con Framer Motion. Eso obliga a medir el alto en
 * tiempo de ejecucion: si la medida sale cero el panel se abre, si, pero con
 * altura cero, o sea invisible. Se cambio a una transicion de clases, que no
 * mide nada, y de paso la barra dejo de cargar Framer Motion entero.
 */
export const dropdownPanelClass =
  'absolute right-0 top-[72px] z-30 w-56 origin-top rounded-xl border border-black bg-white p-3 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none mobile-menu dark:border-gray-800 dark:bg-gray-950';

/** El panel cerrado: invisible, sin foco y sin raton, pero presente para poder
 *  transicionar. `invisible` es `visibility: hidden`, que lo esconde tambien de
 *  los lectores de pantalla. */
export const dropdownPanelClosedClass = 'pointer-events-none invisible -translate-y-1 opacity-0';

/** Clases de un item del panel, con el estado activo resuelto. */
export const dropdownItemClass = (isActive: boolean) =>
  `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out ${
    isActive
      ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
  }`;
