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
      className="relative w-full bg-darkbg-950 py-24 md:py-32 min-h-screen flex items-center">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/2 to-transparent" />

      <div ref={contentRef} className="relative w-full max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3 text-center lg:text-left">
            
            {/* Professional Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-bg-secondary/20 border border-border-secondary rounded-lg text-sm font-medium text-accent-400 backdrop-blur-sm mb-8">
              <HiOutlineCode className="w-4 h-4" />
              <span>{t.badge}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12">
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-text-primary leading-tight">
                {t.firstName} <br className="lg:hidden" />
                <span className="text-accent">{t.lastName}</span>
              </h1>
              
              <div className="w-16 h-0.5 bg-accent mb-6 mx-auto lg:mx-0" />
              
              {/* Clean, focused description */}
              <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                  {t.description.intro} <span className="text-accent font-semibold">{t.description.highlight}</span>
                </motion.p>
                
                {/* Simplified tech stack display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {t.description.technologies.slice(0, 4).map((tech: string) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20">
                      {tech}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-bg-secondary/10 text-text-muted text-sm rounded-full border border-border-secondary/30">
                    +{t.description.technologies.length - 4} más
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Actions - Refined */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              
              <motion.a
                href="#projects"
                className="theme-button-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t.ariaLabels.projectsButton}>
                {t.buttons.projects}
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>

              <motion.a
                href="#contact"
                className="theme-button-secondary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t.ariaLabels.contactButton}>
                {t.buttons.contact}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="p-3 bg-bg-secondary/20 hover:bg-bg-secondary/40 border border-border-secondary hover:border-accent/30 rounded-lg transition-all duration-300 group text-text-muted hover:text-accent"
                  whileHover={{ scale: 1.05 }}>
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Clean Professional Sidebar - Right Side */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Status & Availability - Single Clean Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="p-8 bg-bg-secondary/10 border border-border-secondary/50 rounded-xl backdrop-blur-sm">
              
              {/* Status Indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/30" />
                <span className="text-sm font-medium text-accent-400">
                  {currentLocale === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
                </span>
              </div>
              
              {/* Key Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">
                    {currentLocale === 'es' ? 'Especialización' : 'Specialization'}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">
                    Full Stack Developer
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">
                    {currentLocale === 'es' ? 'Ubicación' : 'Location'}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">
                    {currentLocale === 'es' ? 'España (Remoto)' : 'Spain (Remote)'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">
                    {currentLocale === 'es' ? 'Estado' : 'Status'}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">
                    {currentLocale === 'es' ? 'Disponible' : 'Available'}
                  </span>
                </div>
              </div>
            </motion.div>


            {/* Call to Action - Clean */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center lg:text-left">
              <p className="text-sm text-text-muted mb-4">
                {currentLocale === 'es' 
                  ? '¿Necesitas un desarrollador apasionado?' 
                  : 'Need a passionate developer?'
                }
              </p>
              <motion.a
                href="mailto:santimartelli@gmail.com"
                className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium text-sm transition-colors duration-300"
                whileHover={{ scale: 1.02 }}>
                {currentLocale === 'es' ? 'Contáctame →' : "Contact me →"}
              </motion.a>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(Hero);