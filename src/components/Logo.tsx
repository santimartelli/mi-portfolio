import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div className="flex items-center gap-4">
      <div className="relative w-8 h-8">
        <motion.div
          className="absolute inset-0 bg-accent-500 rounded-lg opacity-80"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-accent-400 rounded-lg opacity-80"
          initial={{ rotate: 45 }}
          animate={{ rotate: 405 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-darkbg-950 font-bold text-lg">SM</span>
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-white">Santiago Martelli</p>
        <p className="text-xs font-normal text-darktext-300">Full Stack Developer</p>
      </div>
    </motion.div>
  );
};

export default Logo;
