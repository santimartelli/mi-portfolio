// Importaciones necesarias: Framer Motion para animaciones, contexto de tema y estilos del logo
import { motion } from "framer-motion";
import { useThemeContext } from "../../util/ThemeContext";
import "../../styles/logo.css";

/**
 * Componente Logo - Muestra el logo y nombre del portfolio
 * Contiene las iniciales "SM" en un cuadro y el nombre completo con título profesional
 * Se adapta al tema actual (dark/light) y oculta el texto en dispositivos móviles
 */
const Logo = () => {
  const { theme } = useThemeContext();

  return (
    <motion.div className="flex items-center gap-4">
      <div className={`w-10 h-10 border ${
        theme === "light" ? "border-black bg-white" : "border-white bg-black"
      } flex items-center justify-center`}>
        <span className={`text-xl font-bold ${
          theme === "light" ? "text-black" : "text-white"
        }`}>
          SM
        </span>
      </div>
      <div className="hidden sm:block">
        <p className={`text-base font-semibold leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`}>
          Santiago Martelli
        </p>
        <p className={`text-sm ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        }`}>
          Full Stack Developer
        </p>
      </div>
    </motion.div>
  );
};

// Exporta el componente para ser usado en el Navbar
export default Logo;
