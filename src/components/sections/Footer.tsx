// Importación de bibliotecas de animación, hooks e iconos
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiHeart } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "../util/i18n";

/**
 * Componente Footer - Pie de página del portfolio
 * Muestra información de marca, navegación, contacto, ubicación, tecnologías y copyright
 * con animaciones sutiles al hacer scroll
 */
const Footer = () => {
  // Obtiene las traducciones de la sección "footer"
  const { footer: t } = useTranslations();

  // Año actual para el copyright
  const currentYear = new Date().getFullYear();

  // Referencias para detectar cuando cada sección entra en el viewport
  const footerRef = useRef(null);
  const headerRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);

  // Hooks para detectar visibilidad de cada sección (activa animaciones)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.05 });
  const isLinksInView = useInView(linksRef, { once: true, amount: 0.05 });
  const isBottomInView = useInView(bottomRef, { once: true, amount: 0.05 });

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

  // Array de enlaces de navegación
  const navItems = [
    { name: t.navigation.links.home, href: "#home" },
    { name: t.navigation.links.about, href: "#about" },
    { name: t.navigation.links.projects, href: "#projects" },
    { name: t.navigation.links.contact, href: "#contact" },
  ];

  // Array de enlaces de contacto
  const contactLinks = [
    {
      icon: FaEnvelope,
      href: "mailto:santimartelli@gmail.com",
      label: "Email",
      value: "santimartelli@gmail.com"
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/34628434434",
      label: "WhatsApp",
      value: "+34 628 434 434"
    },
  ];

  // Array de enlaces a redes sociales
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/santimartelli",
      label: "GitHub"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/santiagomartelli/",
      label: "LinkedIn"
    },
  ];

  // Array de tecnologías principales
  const technologies = [
    "React", "Vue", "TypeScript", "Node.js", "Laravel", "Astro"
  ];

  return (
    <footer ref={footerRef} className="relative w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-12">
        <div ref={headerRef} className="max-w-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-8">
          <div className="col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-xl font-light text-black dark:text-white tracking-tight">
                  {t.brand.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm max-w-md">
                  {t.brand.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4">
              <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase">
                {t.navigation.title}
              </h4>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}>
                    <a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 font-light text-sm">
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4">
              <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase">
                {currentLocale === 'es' ? 'Contacto' : 'Contact'}
              </h4>
              <div className="space-y-2">
                {contactLinks.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}>
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 font-light text-sm">
                      <contact.icon className="w-3 h-3" />
                      <span>{contact.value}</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="space-y-4">
              <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase">
                {currentLocale === 'es' ? 'Ubicación' : 'Location'}
              </h4>
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-light text-sm">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  <span>{currentLocale === 'es' ? 'España' : 'Spain'}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="text-gray-600 dark:text-gray-400 font-light text-sm">
                  {currentLocale === 'es' ? 'Barcelona • Girona • Remoto' : 'Barcelona • Girona • Remote'}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="text-green-600 dark:text-green-400 font-light text-sm">
                  {currentLocale === 'es' ? 'Disponible' : 'Available'}
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-4">
              <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase">
                {t.technologies.title}
              </h4>
              <div className="space-y-1">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.05 }}
                    className="text-gray-600 dark:text-gray-400 font-light text-sm">
                    {tech}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="text-gray-500 dark:text-gray-500 font-light text-xs">
                +8 {t.technologies.moreText}
              </motion.p>
            </motion.div>
          </div>
        </div>
        <div ref={bottomRef} className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isBottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <p className="text-gray-500 dark:text-gray-500 font-light text-xs">
                &copy; {currentYear} {t.brand.name}. {t.copyright}
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 font-light text-xs">
              <span>{t.madeWith.developedWith}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <HiHeart className="w-3 h-3 text-red-500" />
              </motion.div>
              <span>{t.madeWith.and}</span>
              <span className="text-gray-600 dark:text-gray-400">⚡</span>
              <span>{t.madeWith.from} {t.madeWith.location}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

// Exporta el componente Footer
export default Footer;
