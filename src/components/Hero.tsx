import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useMemo, memo, useRef, useEffect } from "react";
import { useTranslations } from "../util/i18n";
import "../styles/ticker.css";

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
      className="relative w-full bg-white dark:bg-gray-950 min-h-screen">
      
      {/* Full-width e-ink inspired layout */}
      <div ref={contentRef} className="w-full h-screen flex flex-col justify-center items-center">
        
        {/* Main content area - centered */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-8 py-20 flex items-center justify-center">
          <div className="w-full text-center">
            
            {/* Hero Content - Centered */}
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
              
              {/* Name - smaller and more balanced */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center">
                
                <h1 className="text-black dark:text-white font-light leading-[0.9] tracking-tight">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                    {t.firstName}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-600 dark:text-gray-400 -mt-2">
                    {t.lastName}
                  </motion.div>
                </h1>
              </motion.div>
              
              {/* Professional description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-2xl mx-auto">
                
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                  {currentLocale === 'es' 
                    ? 'Desarrollador especializado en crear experiencias digitales excepcionales que combinan diseño intuitivo con arquitecturas sólidas.'
                    : 'Developer specialized in creating exceptional digital experiences that combine intuitive design with solid architectures.'
                  }
                </p>
              </motion.div>

              {/* Professional info cards - redesigned */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                
                {/* Specialization Card */}
                <div className="group p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-gray-500 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full mx-auto mb-3"></div>
                    <p className="text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">
                      {currentLocale === 'es' ? 'Especialización' : 'Specialization'}
                    </p>
                    <p className="text-sm font-medium text-black dark:text-white">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                
                {/* Main Stack Card */}
                <div className="group p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-gray-500 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full mx-auto mb-3"></div>
                    <p className="text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">
                      {currentLocale === 'es' ? 'Stack Principal' : 'Main Stack'}
                    </p>
                    <p className="text-sm font-medium text-black dark:text-white">
                      React, TypeScript, Node.js
                    </p>
                  </div>
                </div>
                
                {/* Availability Card */}
                <div className="group p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-gray-500 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-3"></div>
                    <p className="text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">
                      {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
                    </p>
                    <p className="text-sm font-medium text-black dark:text-white">
                      {currentLocale === 'es' ? 'Disponible' : 'Available'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col gap-8 items-center justify-center">
                
                {/* Simple text link - more prominent */}
                <motion.a
                  href="#projects"
                  whileHover={{ y: -1 }}
                  className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-200 uppercase tracking-wide">
                  {currentLocale === 'es' ? 'Ver Proyectos' : 'View Projects'}
                </motion.a>
                
                {/* Social links centered below */}
                <div className="flex gap-5">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.2 + (index * 0.1) }}
                      className="text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      aria-label={social.label}>
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scrolling text marquee - Bottom - 60% width with fade edges */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[60%] h-12 overflow-hidden z-50">
          {/* Fade gradients */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10"></div>
          
          {/* Ticker content */}
          <div className="relative h-full flex items-center">
            <motion.div
              animate={{ x: [600, -600] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex items-center whitespace-nowrap h-full">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 px-8">
                {currentLocale === 'es' 
                  ? 'FULL STACK DEVELOPER • REACT • TYPESCRIPT • NODE.JS • DISEÑO UI/UX • EXPERIENCIAS DIGITALES • ARQUITECTURAS SÓLIDAS • DESARROLLO WEB • APLICACIONES MODERNAS • CÓDIGO LIMPIO • PERFORMANCE OPTIMIZATION • FULL STACK DEVELOPER • REACT • TYPESCRIPT • NODE.JS'
                  : 'FULL STACK DEVELOPER • REACT • TYPESCRIPT • NODE.JS • UI/UX DESIGN • DIGITAL EXPERIENCES • SOLID ARCHITECTURES • WEB DEVELOPMENT • MODERN APPLICATIONS • CLEAN CODE • PERFORMANCE OPTIMIZATION • FULL STACK DEVELOPER • REACT • TYPESCRIPT • NODE.JS'
                }
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);