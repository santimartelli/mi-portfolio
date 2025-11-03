/**
 * Componente Divider - Separador visual entre secciones
 *
 * Proporciona un separador horizontal decorativo con gradiente que se adapta
 * al tema claro/oscuro. Usado para dividir secciones del portfolio visualmente.
 */

export default function Divider() {
  return (
    // Contenedor principal con el mismo fondo que las secciones para consistencia visual
    <div className="w-full flex justify-center py-8 bg-white dark:bg-gray-950">
      {/* Contenedor con ancho máximo y padding lateral */}
      <div className="w-full max-w-6xl px-4">
        {/* Línea divisora con gradiente más visible que se desvanece en los extremos */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-60"></div>
      </div>
    </div>
  );
}
