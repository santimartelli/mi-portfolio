/**
 * Variantes compartidas de los desplegables de la barra de navegacion.
 *
 * El menu y el selector de idioma tienen que verse y comportarse igual, asi que
 * las variantes viven en un solo sitio: si se cambian aqui, cambian los dos.
 */
export const dropdownVariants = {
  hidden: { height: 0, opacity: 1, transformOrigin: 'top' },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeOut' },
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    height: 0,
    opacity: 1,
    transition: {
      height: { duration: 0.2, ease: 'easeIn' },
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: 'easeIn' } },
};

/** Clases del panel desplegable. Una sola definicion para los dos menus. */
export const dropdownPanelClass =
  'absolute right-0 top-[72px] w-56 bg-white dark:bg-gray-950 border border-black dark:border-gray-800 rounded-xl mobile-menu overflow-hidden z-30';

/** Clases de un item del panel, con el estado activo resuelto. */
export const dropdownItemClass = (isActive: boolean) =>
  `flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
    isActive
      ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
  }`;
