/**
 * La etiqueta de dato: las herramientas de un puesto y el stack de un proyecto.
 *
 * Vive aqui, y no repetida en cada componente, para que Experiencia y Proyectos
 * usen exactamente el mismo tamano. Es la pieza mas pequena de la pagina, y una
 * diferencia de un pixel entre dos secciones se nota.
 */
export const badgeClass =
  'rounded border border-gray-300 px-1.5 py-0.5 font-mono text-[0.6rem] font-normal uppercase tracking-widest text-black dark:border-gray-600 dark:text-white';

/** La misma etiqueta con el filete un escalon mas oscuro: la faceta del puesto. */
export const badgeStrongClass =
  'rounded border border-gray-400 px-1.5 py-0.5 font-mono text-[0.6rem] font-normal uppercase tracking-widest text-black dark:border-gray-500 dark:text-white';
