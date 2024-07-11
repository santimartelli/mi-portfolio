import { delay, easeIn, easeInOut, motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "../util/useMediaQuery";

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: .15,
      delayChildren: .2,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -50,
  },
};

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <motion.nav 
    initial="hidden"
    animate="visible"
    variants={navMotion}
    className="py-2 bg-white sticky top-0 right-0 left-0 px-6 z-40 flex justify-between shadow items-center overflow-x-hidden">
      <div className="flex items-center h-full">
        <a href="/" className="flex items-center gap-x-2 text-md">
          <div className="space-y-[-8px]">
            <p className="text-md lg:text-lg font-medium">SANTIAGO MARTELLI</p>
            <p className="text-[.9rem] lg:text-[1rem] text-sky-700 font-normal">DESARROLLADOR <span className="text-orange-700">WEB</span></p>
          </div>
        </a>
      </div>
      {/* Comprueba si la pantalla no es móvil */}
      {!isMobile && (
        <motion.div className="flex gap-x-6 text-sm lg:text-base">
          <a href="/#home" className="transition-all duration-200 hover:text-orange-700">Inicio</a>
          <a href="/#about" className="transition-all duration-200 hover:text-orange-700">Sobre Mí</a>
          <a href="#projects" className="transition-all duration-200 hover:text-orange-700">Proyectos</a>
          <a href="#skills" className="transition-all duration-200 hover:text-orange-700">Habilidades</a>
          <a href="/#contact" className="transition-all duration-200 hover:text-orange-700">Contacto</a>
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
          animate={{ opacity: 1, y:0}}
          initial={{ opacity: 1, y: -1000 }}
          transition={{ duration: .7}}
          className="fixed top-0 left-0 flex w-full h-screen text-lg uppercase justify-center bg-white z-40">
          <motion.div
            variants={navMotion}
            animate="visible"
            initial="hidden"
            className="flex flex-col gap-16 items-center justify-between pt-20 pb-20 w-full">
            <motion.a variants={itemMotion} href="/#home" className="hover:text-orange-700" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Inicio
            </motion.a>
            <motion.a variants={itemMotion} href="/#about" className="hover:text-orange-700" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Sobre Mí
            </motion.a>
            <motion.a variants={itemMotion} href="#projects" className="hover:text-orange-700" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Proyectos
            </motion.a>
            <motion.a variants={itemMotion} href="#skills" className="hover:text-orange-700" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Habilidades
            </motion.a>
            <motion.a variants={itemMotion} href="/#contact" className="hover:text-orange-700" onClick={() => setToggled((prevToggle) => !prevToggle)}>
              Contacto
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
