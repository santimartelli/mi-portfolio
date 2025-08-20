import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { HiChevronDown, HiOutlineCode } from "react-icons/hi";
import { useMemo, memo, useRef } from "react";
import { useTranslations } from "../util/i18n";

interface SocialLink {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly label: string;
}

const Hero = () => {
  const { hero: t } = useTranslations();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      ref={sectionRef}
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
              
              {/* Clean, well-aligned description */}
              <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                  {t.description.intro} <span className="text-accent font-semibold">{t.description.highlight}</span>
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base md:text-lg text-text-muted leading-relaxed">
                  {t.description.continuation} <span className="text-accent font-medium">
                    {t.description.technologies.join(", ")}
                  </span>
                </motion.p>
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-all duration-300 group shadow-lg hover:shadow-accent-500/25"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t.ariaLabels.projectsButton}>
                {t.buttons.projects}
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-bg-secondary/20 hover:bg-bg-secondary/40 text-text-primary hover:text-accent font-semibold rounded-lg border border-border-secondary hover:border-accent/30 transition-all duration-300"
                whileHover={{ y: -2 }}
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
                  whileHover={{ y: -2 }}>
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Professional Info Cards - Right Side */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="p-6 bg-bg-secondary/20 border border-border-secondary rounded-lg">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <HiOutlineCode className="w-4 h-4 text-accent" />
                {currentLocale === 'es' ? 'Especialización' : 'Specialization'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-text-secondary">{currentLocale === 'es' ? 'Desarrollo Full Stack' : 'Full Stack Development'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-text-secondary">{currentLocale === 'es' ? 'Aplicaciones Web Modernas' : 'Modern Web Applications'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-text-secondary">{currentLocale === 'es' ? 'Arquitectura Escalable' : 'Scalable Architecture'}</span>
                </div>
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 bg-bg-secondary/20 border border-border-secondary rounded-lg">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />
                {currentLocale === 'es' ? 'Disponibilidad' : 'Availability'}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {currentLocale === 'es' ? 'Buscando nuevas oportunidades' : 'Seeking new opportunities'}
              </p>
              <p className="text-xs text-text-muted">
                {currentLocale === 'es' ? 'Remoto • España • Internacional' : 'Remote • Spain • International'}
              </p>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="p-6 bg-bg-secondary/20 border border-border-secondary rounded-lg">
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                {currentLocale === 'es' ? 'Enfoque Profesional' : 'Professional Focus'}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentLocale === 'es' 
                  ? 'Creando soluciones web innovadoras con un enfoque en la experiencia del usuario y la eficiencia técnica.'
                  : 'Creating innovative web solutions with a focus on user experience and technical efficiency.'
                }
              </p>
            </motion.div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center gap-3 mt-16">
          <span className="text-xs text-text-muted font-medium tracking-wider uppercase">
            {t.scrollIndicator}
          </span>
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 text-accent-400/60 hover:text-accent-400 transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}>
            <HiChevronDown className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);