import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineMail, HiOutlineBadgeCheck } from "react-icons/hi";
import { useMemo, memo, useRef } from "react";
import { useTranslations } from "../util/i18n";
import { useThemeContext } from "../util/ThemeContext";

interface SocialLink {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly label: string;
}

const Hero = () => {
  const { hero: t } = useTranslations();
  const { theme } = useThemeContext();
  const contentRef = useRef(null);
  
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });
  
  const socialLinks: readonly SocialLink[] = useMemo(() => [
    {
      icon: FaGithub,
      href: "https://github.com/santimartelli",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/santiagomartelli/",
      label: "LinkedIn",
    },
  ], []);

  // Helper function for current locale
  const getCurrentLocale = (): string => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/en')) return 'en';
    }
    return 'es';
  };

  const currentLocale = getCurrentLocale();

  return (
    <section 
      id="home"
      className="relative w-full bg-white dark:bg-gray-950 min-h-screen flex items-center">

      <div ref={contentRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        
        {/* Minimalist Professional Hero */}
        <div className="max-w-5xl">
          
          {/* Large Typography - Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16">
            
            <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight mb-6 sm:mb-8 ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={contentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}>
                {t.firstName}
              </motion.span>
              <motion.span 
                className={`block ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                initial={{ opacity: 0, x: 50 }}
                animate={contentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}>
                {t.lastName}
              </motion.span>
            </h1>
            
            {/* Professional Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl">
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed font-light ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}>
                {currentLocale === 'es' 
                  ? 'Desarrollador especializado en crear experiencias digitales excepcionales que combinan diseño intuitivo con arquitecturas sólidas.'
                  : 'Developer specialized in creating exceptional digital experiences that combine intuitive design with solid architectures.'
                }
              </p>
            </motion.div>
          </motion.div>

          {/* Minimal Professional Info - E-ink Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-16 mb-12 sm:mb-16">
            
            <div className="space-y-2">
              <p className={`text-sm uppercase tracking-wider font-medium ${
                theme === "light" ? "text-gray-500" : "text-gray-500"
              }`}>
                {currentLocale === 'es' ? 'Especialización' : 'Specialization'}
              </p>
              <p className={`text-base sm:text-lg ${
                theme === "light" ? "text-black" : "text-white"
              }`}>
                Full Stack Developer
              </p>
            </div>
            
            <div className="space-y-2">
              <p className={`text-sm uppercase tracking-wider font-medium ${
                theme === "light" ? "text-gray-500" : "text-gray-500"
              }`}>
                {currentLocale === 'es' ? 'Stack Principal' : 'Main Stack'}
              </p>
              <p className={`text-base sm:text-lg ${
                theme === "light" ? "text-black" : "text-white"
              }`}>
                React, TypeScript, Node.js
              </p>
            </div>
            
            <div className="space-y-2">
              <p className={`text-sm uppercase tracking-wider font-medium ${
                theme === "light" ? "text-gray-500" : "text-gray-500"
              }`}>
                {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
              </p>
              <p className={`text-base sm:text-lg flex items-center gap-2 ${
                theme === "light" ? "text-black" : "text-white"
              }`}>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {currentLocale === 'es' ? 'Disponible' : 'Available'}
              </p>
            </div>
          </motion.div>

          {/* Clean Action Links - E-ink Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12 items-start">
            
            <a
              href="#projects"
              className={`group text-base sm:text-lg transition-colors duration-300 border-b border-transparent pb-1 ${
                theme === "light" 
                  ? "text-black hover:text-gray-600 hover:border-black" 
                  : "text-white hover:text-gray-300 hover:border-white"
              }`}>
              <span className="flex items-center gap-3">
                {t.buttons.projects}
                <FaDownload className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>

            <a
              href="#contact"
              className={`group text-base sm:text-lg transition-colors duration-300 border-b border-transparent pb-1 ${
                theme === "light" 
                  ? "text-gray-600 hover:text-black hover:border-gray-600" 
                  : "text-gray-400 hover:text-white hover:border-gray-400"
              }`}>
              {t.buttons.contact}
            </a>
            
            {/* Social Links - Minimal */}
            <div className="flex gap-4 sm:gap-6 sm:ml-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    theme === "light" 
                      ? "text-gray-400 hover:text-black" 
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);