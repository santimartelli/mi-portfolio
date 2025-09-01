import { motion } from "framer-motion";
import { useThemeContext } from "../util/ThemeContext";
import "../styles/logo.css";

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
        <p className={`text-base font-semibold ${
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

export default Logo;
