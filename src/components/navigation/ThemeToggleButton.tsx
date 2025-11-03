// Importaciones necesarias: Framer Motion para animaciones y contexto de tema
import { motion } from "framer-motion";
import { useThemeContext } from "../../util/ThemeContext";

// Colores del fondo del toggle según el tema activo
const trackColors = {
  light: "#f59e0b",
  dark: "#374151",
};

/**
 * Componente ThemeToggleButton - Botón toggle para cambiar entre tema claro y oscuro
 * Incluye un switch animado con iconos de sol y luna que cambian según el tema activo
 * Utiliza animaciones suaves de Framer Motion para las transiciones
 */
const ThemeToggleButton = () => {
  const { theme, changeTheme } = useThemeContext();
  const isLight = theme === "light";

  return (
    <motion.button
      type="button"
      onClick={() => changeTheme(isLight ? "dark" : "light")}
      className="relative w-12 h-6 rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-accent-400/30"
      style={{ backgroundColor: trackColors[theme] }}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="sr-only">
        {isLight ? "Switch to dark mode" : "Switch to light mode"}
      </span>
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        initial={false}
        animate={{ x: isLight ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        <motion.svg
          className="w-3 h-3 text-amber-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={false}
          animate={{
            opacity: isLight ? 1 : 0,
            rotate: isLight ? 0 : 90,
          }}
          transition={{ duration: 0.2 }}
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </motion.svg>
        <motion.svg
          className="w-3 h-3 text-slate-600 absolute"
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={false}
          animate={{
            opacity: isLight ? 0 : 1,
            rotate: isLight ? -90 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
};

// Exporta el componente para ser usado en el Navbar
export default ThemeToggleButton;
