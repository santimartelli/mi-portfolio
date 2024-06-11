import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "../util/useMediaQuery";

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: -100,
  },
};

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <nav className="relative flex flex-row mx-8 mb-24 italic uppercase items-center justify-between">
      <div className="h-full py-3">
        <a href="/" className="text-xl px-4 text-white">
          martelli.dev
        </a>
      </div>
      {/* Comprueba si la pantalla no es móvil */}
      {!isMobile && (
        <div className="flex gap-x-6">
          <a href="/">_Inicio</a>
          <a href="/about">_Sobre Mí</a>
          <a href="/projects">_Proyectos</a>
          <a href="/contact">_Contacto</a>
        </div>
      )}
      {/* Comprueba si la pantalla es móvil */}
      {isMobile && (
        <div onClick={() => setToggled((prevToggle) => !prevToggle)} className="space-y-1.5 cursor-pointer z-50">
          <motion.span
            animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
            className="block h-0.5 w-8 bg-white"></motion.span>
          <motion.span animate={{ opacity: toggled ? 0 : 1 }}
          className="block h-0.5 w-8 bg-white"></motion.span>
          <motion.span
            animate={{ rotateZ: toggled ? -45 : 0, y: toggled ? -8 : 0 }}
            className="block h-0.5 w-8 bg-white"></motion.span>
        </div>
      )}
      {/* Comprueba si la pantalla es móvil y si el menú está abierto */}
      {isMobile && toggled && (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 25 }}
          className="fixed top-0 left-0 flex w-full h-screen text-sm uppercase italic justify-center z-40">
          <motion.div variants={navMotion} 
          animate="visible"
          initial="hidden"
          className="flex flex-col gap-16 items-center justify-center w-full bg-black">
            <motion.a variants={itemMotion} href="/">_Inicio</motion.a>
            <motion.a variants={itemMotion} href="/about">_Sobre Mí</motion.a>
            <motion.a variants={itemMotion} href="/projects">_Proyectos</motion.a>
            <motion.a variants={itemMotion} href="/contact">_Contacto</motion.a>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
}
