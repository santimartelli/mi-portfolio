// Importación de bibliotecas de animación y componentes
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useMemo, memo, useRef, useEffect } from 'react';
import { useTranslations } from '../util/i18n';
import '../styles/ticker.css';

// Interfaz que define la estructura de un enlace social
interface SocialLink {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly label: string;
}

/**
 * Componente Hero - Sección principal de presentación del portfolio
 * Muestra el nombre, descripción profesional, información clave y enlaces sociales
 * con animaciones sutiles y diseño responsivo inspirado en e-ink
 */
const Hero = () => {
  // Obtiene las traducciones del contexto de internacionalización
  const { hero: t } = useTranslations();

  // Referencia para detectar cuando el contenido entra en el viewport
  const contentRef = useRef(null);

  // Hook que detecta si el contenido está visible (para activar animaciones)
  // once: true = solo detecta la primera vez, amount: 0.05 = se activa con 5% visible
  const contentInView = useInView(contentRef, { once: true, amount: 0.05 });

  // Array memoizado de enlaces sociales (no cambia entre renders)
  const socialLinks: readonly SocialLink[] = useMemo(
    () => [
      {
        icon: FaGithub,
        href: 'https://github.com/santimartelli',
        label: 'GitHub',
      },
      {
        icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/santiagomartelli/',
        label: 'LinkedIn',
      },
    ],
    []
  );

  /**
   * Función auxiliar que determina el idioma actual basado en la URL
   * @returns 'en' si la ruta comienza con /en, caso contrario 'es' (español por defecto)
   */
  const getCurrentLocale = (): string => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/en')) return 'en';
    }
    return 'es';
  };

  const currentLocale = getCurrentLocale();

  return (
    // Sección principal
    <section
      id="home"
      className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      {/* Contenedor principal */}
      <div
        ref={contentRef}
        className="w-full flex flex-col justify-center items-center">
        {/* Área de contenido */}
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 flex items-start justify-center">
          <div className="w-full text-center">
            {/* Contenedor de elementos */}
            <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12">
              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center space-y-2">
                <h1 className="text-black dark:text-white font-light leading-[0.85] tracking-tight">
                  {/* Versión móvil */}
                  <div className="block sm:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-6xl">
                      {t.firstName}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-6xl text-gray-500 dark:text-gray-500">
                      {t.lastName}
                    </motion.div>
                  </div>
                  {/* Versión escritorio */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hidden sm:block text-7xl md:text-8xl lg:text-9xl xl:text-9xl">
                    {t.firstName} <span className="text-gray-500 dark:text-gray-500">{t.lastName}</span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Descripción profesional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="max-w-lg sm:max-w-xl mx-auto">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light tracking-wide">
                  {currentLocale === 'es'
                    ? 'Desarrollador especializado en crear experiencias digitales que combinan diseño intuitivo con arquitecturas sólidas.'
                    : 'Developer specialized in creating digital experiences that combine intuitive design with solid architectures.'}
                </p>
              </motion.div>

              {/* Tarjetas de información */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="w-full max-w-2xl sm:max-w-3xl">
                {/* Primera fila */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-3 sm:mb-0">
                  {/* Tarjeta Especialización */}
                  <div className="group p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 bg-gray-50/30 dark:bg-gray-800/20">
                    <div className="text-center space-y-2">
                      <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto"></div>
                      <p className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-500">
                        {currentLocale === 'es' ? 'Especialización' : 'Specialization'}
                      </p>
                      <p className="text-sm font-light text-gray-700 dark:text-gray-300">Full Stack Developer</p>
                    </div>
                  </div>
                  {/* Tarjeta Stack Principal */}
                  <div className="group p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 bg-gray-50/30 dark:bg-gray-800/20">
                    <div className="text-center space-y-2">
                      <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto"></div>
                      <p className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-500">
                        {currentLocale === 'es' ? 'Stack Principal' : 'Main Stack'}
                      </p>
                      <p className="text-sm font-light text-gray-700 dark:text-gray-300">React, TypeScript, Node.js</p>
                    </div>
                  </div>
                  {/* Tarjeta Disponibilidad - solo visible en escritorio */}
                  <div className="hidden sm:block group p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 bg-gray-50/30 dark:bg-gray-800/20">
                    <div className="text-center space-y-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mx-auto"></div>
                      <p className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-500">
                        {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
                      </p>
                      <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                        {currentLocale === 'es' ? 'Disponible' : 'Available'}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Segunda fila - solo móvil */}
                <div className="grid grid-cols-1 sm:hidden gap-3">
                  {/* Tarjeta Disponibilidad - solo móvil */}
                  <div className="group p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 bg-gray-50/30 dark:bg-gray-800/20">
                    <div className="text-center space-y-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mx-auto"></div>
                      <p className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-500">
                        {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
                      </p>
                      <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                        {currentLocale === 'es' ? 'Disponible' : 'Available'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Llamado a la acción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex flex-col gap-6 sm:gap-8 items-center justify-center">
                {/* Enlace a proyectos */}
                <motion.a
                  href="#projects"
                  whileHover={{ y: -1 }}
                  className="text-base sm:text-lg font-light text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 uppercase tracking-widest">
                  {currentLocale === 'es' ? 'Ver Proyectos' : 'View Projects'}
                </motion.a>
                {/* Enlaces sociales */}
                <div className="flex gap-6 sm:gap-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-sm"
                      aria-label={social.label}>
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Ticker de texto - oculto */}
        <div className="hidden absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-[80%] sm:w-[70%] h-8 sm:h-10 overflow-hidden z-50">
          {/* Gradientes de desvanecimiento */}
          <div className="absolute left-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10"></div>
          {/* Contenido del ticker */}
          <div className="relative h-full flex items-center">
            <motion.div
              animate={{ x: [400, -400] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex items-center whitespace-nowrap h-full">
              <span className="text-xs sm:text-sm font-light text-gray-400 dark:text-gray-500 px-6 sm:px-8 tracking-widest">
                {currentLocale === 'es'
                  ? 'FULL STACK DEVELOPER × REACT × TYPESCRIPT × NODE.JS × UI/UX DESIGN × DIGITAL EXPERIENCES × CLEAN CODE × FULL STACK DEVELOPER × REACT × TYPESCRIPT'
                  : 'FULL STACK DEVELOPER × REACT × TYPESCRIPT × NODE.JS × UI/UX DESIGN × DIGITAL EXPERIENCES × CLEAN CODE × FULL STACK DEVELOPER × REACT × TYPESCRIPT'}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporta el componente memorizado para optimizar renders
// memo() previene re-renders innecesarios cuando las props no cambian
export default memo(Hero);
