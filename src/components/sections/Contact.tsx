// Importación de bibliotecas de animación, hooks y componentes
import { motion } from "framer-motion";
import { useRef, memo } from "react";
import { useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "../../util/i18n";
import { getCvMetadata, type CvLocale } from "../../util/cvMetadata";

/**
 * Función auxiliar que determina el idioma actual basado en la URL
 * @returns 'en' si la ruta comienza con /en, caso contrario 'es' (español por defecto)
 */
const getCurrentLocale = (): CvLocale => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/en')) return 'en';
  }
  return 'es';
};

/**
 * Componente Contact - Sección de contacto del portfolio
 * Muestra métodos de contacto (email, WhatsApp), redes sociales (GitHub, LinkedIn),
 * información de disponibilidad y enlace de descarga del CV
 */
const Contact = () => {
  // Obtiene las traducciones de la sección "contact"
  const { contact: t } = useTranslations();

  // Referencias para detectar cuando cada sección entra en el viewport
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const contactMethodsRef = useRef(null);
  const additionalInfoRef = useRef(null);

  // Hooks para detectar visibilidad de cada sección (activa animaciones)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.05 });
  const isContactMethodsInView = useInView(contactMethodsRef, { once: true, amount: 0.05 });
  const isAdditionalInfoInView = useInView(additionalInfoRef, { once: true, amount: 0.05 });

  // Obtiene el idioma actual
  const currentLocale = getCurrentLocale();

  // Array de métodos de contacto directo
  const contactMethods = [
    {
      icon: FaEnvelope,
      label: t.contact.methods.email.label,
      value: "santimartelli@gmail.com",
      href: "mailto:santimartelli@gmail.com",
      description: currentLocale === 'es' ? 'Respuesta en 24 horas' : 'Response within 24 hours',
    },
    {
      icon: FaWhatsapp,
      label: t.contact.methods.whatsapp.label,
      value: "+34 628 434 434",
      href: "https://wa.me/34628434434",
      description: currentLocale === 'es' ? 'Respuesta inmediata' : 'Immediate response',
    },
  ];

  // Array de enlaces a redes sociales
  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/santimartelli",
      username: "@santimartelli",
      description: currentLocale === 'es' ? 'Código abierto y proyectos' : 'Open source and projects',
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/santiagomartelli/",
      username: "@santiagomartelli",
      description: currentLocale === 'es' ? 'Experiencia profesional' : 'Professional experience',
    },
  ];

  /**
   * Determina qué CV mostrar según el idioma actual
   * @returns Objeto con información del CV (href, nombre, tamaño, etc.)
   */
  const getCurrentCV = () => {
    const meta = getCvMetadata(currentLocale);
    if (currentLocale === 'en') {
      return {
        language: t.cv.english.language,
        description: t.cv.english.description,
        href: meta.href,
        downloadName: meta.downloadName,
        size: meta.size,
        lastUpdate: meta.lastUpdate,
        available: true
      };
    } else {
      return {
        language: t.cv.spanish.language,
        description: t.cv.spanish.description,
        href: meta.href,
        downloadName: meta.downloadName,
        size: meta.size,
        lastUpdate: meta.lastUpdate,
        available: true
      };
    }
  };

  const currentCV = getCurrentCV();

  return (
    <section id="contact" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div ref={contentRef} className="w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          <div ref={headerRef} className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, transform: "translateY(30px)" }}
              animate={isHeaderInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {currentLocale === 'es' ? 'Hablemos' : 'Let\'s Connect'}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, transform: "translateY(30px)" }}
              animate={isHeaderInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light tracking-wide">
                {currentLocale === 'es'
                  ? 'Siempre abierto a nuevas oportunidades, colaboraciones interesantes y proyectos que desafíen mis habilidades técnicas. ¿Tienes algo en mente?'
                  : 'Always open to new opportunities, interesting collaborations and projects that challenge my technical skills. Have something in mind?'
                }
              </p>
            </motion.div>
          </div>
          <div ref={contactMethodsRef} className="mb-20">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
              <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
                {currentLocale === 'es' ? 'Formas de contacto' : 'Get in touch'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <motion.a
                href="mailto:santimartelli@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={isContactMethodsInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="text-center p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <FaEnvelope className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                
                <h4 className="text-lg font-light text-black dark:text-white mb-2">Email</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-light mb-3">
                  {currentLocale === 'es' ? 'Respuesta en 24h' : 'Reply within 24h'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">santimartelli@gmail.com</p>
              </motion.a>
              <motion.a
                href="https://wa.me/34628434434"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={isContactMethodsInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="text-center p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group">
                
                <div className="flex justify-center mb-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <FaWhatsapp className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                
                <h4 className="text-lg font-light text-black dark:text-white mb-2">WhatsApp</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-light mb-3">
                  {currentLocale === 'es' ? 'Respuesta inmediata' : 'Instant reply'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">+34 628 434 434</p>
              </motion.a>
              <motion.a
                href="https://github.com/santimartelli"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={isContactMethodsInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="text-center p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group">
                
                <div className="flex justify-center mb-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <FaGithub className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                
                <h4 className="text-lg font-light text-black dark:text-white mb-2">GitHub</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-light mb-3">
                  {currentLocale === 'es' ? 'Código y proyectos' : 'Code & projects'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">@santimartelli</p>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/santiagomartelli/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={isContactMethodsInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="text-center p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group">
                
                <div className="flex justify-center mb-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <FaLinkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                
                <h4 className="text-lg font-light text-black dark:text-white mb-2">LinkedIn</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-light mb-3">
                  {currentLocale === 'es' ? 'Experiencia profesional' : 'Professional profile'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">@santiagomartelli</p>
              </motion.a>
            </div>
          </div>
          <div ref={additionalInfoRef} className="mt-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={isAdditionalInfoInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="mb-12">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
                    {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
                  </h3>
                </div>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {currentLocale === 'es'
                      ? 'Actualmente disponible para nuevos proyectos y colaboraciones. Trabajo desde Barcelona, Girona o completamente remoto, adaptándome a las necesidades específicas de cada proyecto.'
                      : 'Currently available for new projects and collaborations. I work from Barcelona, Girona or completely remote, adapting to the specific needs of each project.'
                    }
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-500 font-light">
                    {currentLocale === 'es'
                      ? 'Para conocer mi experiencia completa, proyectos destacados y stack técnico detallado, puedes descargar mi curriculum vitae actualizado.'
                      : 'To learn about my complete experience, featured projects and detailed tech stack, you can download my updated resume.'
                    }
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, transform: "translateY(30px)" }}
                animate={isAdditionalInfoInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="inline-block">
                <a
                  href={currentCV.href}
                  download={currentCV.downloadName}
                  className="group inline-flex items-center gap-4 p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
                  <div className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <FaDownload className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-light text-black dark:text-white mb-1 group-hover:text-black dark:group-hover:text-white">
                      {currentLocale === 'es' ? 'Curriculum Vitae' : 'Resume'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 font-light">
                      {currentCV.language} • {currentCV.size} • {currentCV.lastUpdate}
                    </div>
                  </div>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest font-light">
                      {currentLocale === 'es' ? 'Descargar' : 'Download'}
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporta el componente memorizado para optimizar renders
// memo() previene re-renders innecesarios cuando las props no cambian
export default memo(Contact);
