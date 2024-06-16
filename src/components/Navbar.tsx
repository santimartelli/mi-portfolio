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
    <nav className="py-2 bg-white sticky top-0 right-0 left-0 px-6 z-40 flex justify-between shadow items-center">
      <div className="flex items-center h-full">
        <a href="/" className="flex items-center gap-x-2 text-md">
          <div className="space-y-[-6px] font-medium">
            <p className="text-md">SANTIAGO MARTELLI</p>
            <p className="text-xs text-sky-700">Desarrollador Web</p>
          </div>
        </a>
      </div>
      {/* Comprueba si la pantalla no es móvil */}
      {!isMobile && (
        <motion.div className="flex gap-x-6 text-sm">
          <a href="/#home">Inicio</a>
          <a href="/#about">Sobre Mí</a>
          <a href="#projects">Proyectos</a>
          <a href="/#contact">Contacto</a>
        </motion.div>
      )}
      {/* Comprueba si la pantalla es móvil */}
      {isMobile && (
        <div onClick={() => setToggled((prevToggle) => !prevToggle)} className="space-y-1.5 cursor-pointer z-50">
          <motion.span
            animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
            className="block h-0.5 w-8 bg-black"></motion.span>
          <motion.span animate={{ opacity: toggled ? 0 : 1 }} className="block h-0.5 w-8 bg-black"></motion.span>
          <motion.span
            animate={{ rotateZ: toggled ? -45 : 0, y: toggled ? -8 : 0 }}
            className="block h-0.5 w-8 bg-black"></motion.span>
        </div>
      )}
      {/* Comprueba si la pantalla es móvil y si el menú está abierto */}
      {isMobile && toggled && (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 25 }}
          className="fixed top-0 left-0 flex w-full h-screen text-sm uppercase italic justify-center bg-white z-40">
          <motion.div
            variants={navMotion}
            animate="visible"
            initial="hidden"
            className="flex flex-col gap-16 items-center justify-center w-full font-semibold">
            <motion.a variants={itemMotion} href="/#home" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Inicio
            </motion.a>
            <motion.a variants={itemMotion} href="/#about" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Sobre Mí
            </motion.a>
            <motion.a variants={itemMotion} href="#projects" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Proyectos
            </motion.a>
            <motion.a variants={itemMotion} href="/#contact" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Contacto
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
}
