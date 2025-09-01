import { motion } from "framer-motion";
import { useThemeContext } from "../util/ThemeContext";
import "../styles/logo.css";

const Logo = () => {
  const { theme } = useThemeContext();

  return (
    <motion.div className="flex items-center gap-4">
      <div className={`w-10 h-10 border ${
        theme === "light" ? "border-black bg-gray-50" : "border-black bg-gray-900"
      } flex items-center justify-center`}>
        <span className="logo-text-eink text-xl font-bold">
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
