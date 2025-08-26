import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { useTranslations } from "../util/i18n";



const AboutMeSection = () => {
  const { aboutme: t } = useTranslations();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

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
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">

      <div ref={contentRef} className="relative w-full max-w-7xl mx-auto px-8">
        
        {/* Rothelowman-inspired Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-16">
            {t.title}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-light">
              {t.description.paragraph1.intro} <span className="text-gray-900 dark:text-white font-normal">{t.description.paragraph1.highlight1}</span> {t.description.paragraph1.middle}
            </p>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              <span className="text-gray-800 dark:text-gray-200">{t.description.paragraph1.highlight2}</span> {t.description.paragraph1.continuation} <span className="text-gray-800 dark:text-gray-200">{t.description.paragraph1.highlight3}</span>{t.description.paragraph1.end}
            </p>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light mt-8">
              {t.description.paragraph2.intro} <span className="text-gray-800 dark:text-gray-200">
                {t.description.paragraph2.highlight}
              </span>, {t.description.paragraph2.continuation}
            </p>
          </motion.div>
        </motion.div>

        {/* Minimal Professional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium mb-3">
                {currentLocale === 'es' ? 'Enfoque' : 'Focus'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                {currentLocale === 'es' 
                  ? 'Desarrollo full-stack con énfasis en experiencia de usuario, rendimiento y código mantenible que escale con el crecimiento del negocio.'
                  : 'Full-stack development with emphasis on user experience, performance and maintainable code that scales with business growth.'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium mb-3">
                {currentLocale === 'es' ? 'Stack Principal' : 'Main Stack'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                React • TypeScript • Node.js • PostgreSQL • Docker
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium mb-3">
                {currentLocale === 'es' ? 'Metodologías' : 'Methodologies'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                {currentLocale === 'es'
                  ? 'Principios SOLID, desarrollo dirigido por pruebas, arquitecturas limpias y patrones de diseño modernos.'
                  : 'SOLID principles, test-driven development, clean architectures and modern design patterns.'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium mb-3">
                {currentLocale === 'es' ? 'Colaboración' : 'Collaboration'}
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {currentLocale === 'es'
                  ? 'Trabajo en equipo • Metodologías ágiles • Comunicación efectiva'
                  : 'Teamwork • Agile methodologies • Effective communication'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutMeSection);