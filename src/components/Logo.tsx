import { motion } from "framer-motion";
import { useThemeContext } from "../util/ThemeContext";

const Logo = () => {
  const { theme } = useThemeContext();

  return (
    <motion.div className="flex items-center gap-4">
      <div className="relative w-8 h-8">
        <motion.div
          className={`absolute inset-0 rounded-lg opacity-80 ${
            theme === "light" ? "bg-amber-500" : "bg-accent-500"
          }`}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className={`absolute inset-0 rounded-lg opacity-80 ${
            theme === "light" ? "bg-amber-400" : "bg-accent-400"
          }`}
          initial={{ rotate: 45 }}
          animate={{ rotate: 405 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <span className={`absolute inset-0 flex items-center justify-center font-bold text-lg ${
          theme === "light" ? "text-amber-100" : "text-darkbg-950"
        }`}>
          SM
        </span>
      </div>
      <div className="hidden sm:block">
        <p className={`text-sm font-medium ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}>
          Santiago Martelli
        </p>
        <p className={`text-xs font-normal ${
          theme === "light" ? "text-gray-600" : "text-darktext-300"
        }`}>
          Full Stack Developer
        </p>
      </div>
    </motion.div>
  );
};

export default Logo;
