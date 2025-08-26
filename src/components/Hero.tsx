import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { HiOutlineCode } from "react-icons/hi";
import { useMemo, memo, useRef } from "react";
import { useTranslations } from "../util/i18n";

interface SocialLink {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly label: string;
}

const Hero = () => {
  const { hero: t } = useTranslations();
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


  // Helper function for current locale like in Contact
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

      <div ref={contentRef} className="relative w-full max-w-7xl mx-auto px-8 py-20">
        
        {/* Rothelowman-inspired Minimalist Hero */}
        <div className="max-w-5xl">
          
          {/* Large Typography - Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16">
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white leading-none tracking-tight mb-8">
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={contentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}>
                {t.firstName}
              </motion.span>
              <motion.span 
                className="block text-gray-600 dark:text-gray-400"
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
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-300 leading-relaxed font-light">
                {currentLocale === 'es' 
                  ? 'Desarrollador especializado en crear experiencias digitales excepcionales que combinan diseño intuitivo con arquitecturas sólidas.'
                  : 'Developer specialized in creating exceptional digital experiences that combine intuitive design with solid architectures.'
                }
              </p>
            </motion.div>
          </motion.div>

          {/* Minimal Professional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid md:grid-cols-3 gap-8 md:gap-16 mb-16">
            
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium">
                {currentLocale === 'es' ? 'Especialización' : 'Specialization'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                Full Stack Developer
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium">
                {currentLocale === 'es' ? 'Stack Principal' : 'Main Stack'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                React, TypeScript, Node.js
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium">
                {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {currentLocale === 'es' ? 'Disponible' : 'Available'}
              </p>
            </div>
          </motion.div>

          {/* Clean Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
            
            <a
              href="#projects"
              className="group text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1">
              <span className="flex items-center gap-3">
                {t.buttons.projects}
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>

            <a
              href="#contact"
              className="group text-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 border-b border-transparent hover:border-gray-600 dark:hover:border-gray-400 pb-1">
              {t.buttons.contact}
            </a>
            
            {/* Social Links - Minimal */}
            <div className="flex gap-6 ml-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
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