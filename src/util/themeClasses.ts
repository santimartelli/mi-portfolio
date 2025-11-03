/**
 * Conjunto de clases de tema reutilizables para mantener consistencia visual
 *
 * Proporciona clases predefinidas de Tailwind CSS para fondos, textos, bordes
 * y estados hover, adaptables a los temas claro y oscuro del portfolio.
 */
export const themeClasses = {
  // Colores de fondo jerárquicos (primario, secundario, terciario)
  bg: {
    primary: "bg-darkbg-950 dark:bg-darkbg-950 light:bg-white",
    secondary: "bg-darkbg-900 dark:bg-darkbg-900 light:bg-gray-50",
    tertiary: "bg-darkbg-800 dark:bg-darkbg-800 light:bg-gray-100",
  },

  // Colores de texto para diferentes niveles de jerarquía
  text: {
    primary: "text-darktext-300 dark:text-darktext-300 light:text-gray-900",
    secondary: "text-darktext-400 dark:text-darktext-400 light:text-gray-600",
    white: "text-white dark:text-white light:text-gray-900",
    accent: "text-accent-400 dark:text-accent-400 light:text-emerald-600",
  },

  // Colores de borde con diferentes niveles de opacidad
  border: {
    primary: "border-accent-500/30 dark:border-accent-500/30 light:border-emerald-500/30",
    secondary: "border-accent-500/20 dark:border-accent-500/20 light:border-emerald-500/20",
    tertiary: "border-accent-500/10 dark:border-accent-500/10 light:border-emerald-500/10",
  },

  // Estados hover para interacciones del usuario
  hover: {
    bg: "hover:bg-darkbg-900/70 dark:hover:bg-darkbg-900/70 light:hover:bg-gray-100/70",
    text: "hover:text-white dark:hover:text-white light:hover:text-gray-900",
    textAccent: "hover:text-accent-400 dark:hover:text-accent-400 light:hover:text-emerald-600",
  },
};

/**
 * Función utilidad para combinar múltiples clases CSS de manera segura
 *
 * Filtra valores falsy (undefined, null, false) y une las clases válidas con espacios.
 * Útil para combinar clases condicionales de Tailwind CSS.
 *
 * @param classes - Array de clases CSS que pueden incluir valores falsy
 * @returns String con las clases válidas unidas por espacios
 *
 * @example
 * cn('text-white', isActive && 'bg-blue-500', undefined, 'p-4')
 * // Resultado: "text-white bg-blue-500 p-4"
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}