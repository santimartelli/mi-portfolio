import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { useTranslations } from "../util/i18n";

const AboutMeSection = () => {
  const { aboutme: t } = useTranslations();
  const contentRef = useRef(null);
  
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

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
      id="about"
      className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">

      <div ref={contentRef} className="w-full">
        {/* Full-width container to use more screen space */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20">
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t.title}
            </h2>
            
            {/* Professional intro */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light tracking-wide">
                {currentLocale === 'es' 
                  ? 'Con más de 3 años especializándome en desarrollo full-stack, he evolucionado desde crear sitios web básicos hasta arquitecturar soluciones digitales complejas que resuelven problemas reales de negocio.'
                  : 'With over 3 years specializing in full-stack development, I have evolved from creating basic websites to architecting complex digital solutions that solve real business problems.'
                }
              </p>
            </div>
          </motion.div>

          {/* Main content grid - wider layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
            
            {/* Left column - Professional Journey */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-12">
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                  <h3 className="text-xl font-light text-black dark:text-white tracking-wide">
                    {currentLocale === 'es' ? 'Mi trayectoria' : 'My journey'}
                  </h3>
                </div>
                <div className="space-y-6 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  <p>
                    {currentLocale === 'es' 
                      ? 'Comencé mi carrera profesional desarrollando sitios web estáticos, pero rápidamente me sentí atraído por la complejidad de las aplicaciones web modernas. Esta curiosidad me llevó a profundizar en JavaScript, React y el ecosistema de Node.js.'
                      : 'I started my professional career developing static websites, but I was quickly drawn to the complexity of modern web applications. This curiosity led me to dive deep into JavaScript, React, and the Node.js ecosystem.'
                    }
                  </p>
                  <p>
                    {currentLocale === 'es'
                      ? 'Mi evolución hacia TypeScript y arquitecturas más robustas me permitió trabajar en proyectos de mayor escala, donde la mantenibilidad del código y la escalabilidad son fundamentales.'
                      : 'My evolution towards TypeScript and more robust architectures allowed me to work on larger scale projects, where code maintainability and scalability are fundamental.'
                    }
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  <h3 className="text-xl font-light text-black dark:text-white tracking-wide">
                    {currentLocale === 'es' ? 'Filosofía de desarrollo' : 'Development philosophy'}
                  </h3>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  <p>
                    {currentLocale === 'es'
                      ? 'Creo firmemente que el código debe ser legible, mantenible y escalable. Cada línea que escribo la pienso no solo para el presente, sino para el desarrollador que la leerá en el futuro - incluyéndome a mí mismo.'
                      : 'I firmly believe that code should be readable, maintainable and scalable. Every line I write I think not only for the present, but for the developer who will read it in the future - including myself.'
                    }
                  </p>
                  <p>
                    {currentLocale === 'es'
                      ? 'Mi enfoque se centra en encontrar el equilibrio entre la elegancia técnica y la practicidad empresarial, siempre priorizando la experiencia del usuario final.'
                      : 'My approach focuses on finding the balance between technical elegance and business practicality, always prioritizing the end user experience.'
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right column - Skills & Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-12">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-light text-black dark:text-white tracking-wide">
                    {currentLocale === 'es' ? 'Especialización técnica' : 'Technical specialization'}
                  </h3>
                </div>
                <div className="space-y-6">
                  {/* Frontend */}
                  <div className="p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">Frontend</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-3">
                      React, Vue.js, TypeScript, Tailwind CSS, Framer Motion
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-light">
                      {currentLocale === 'es'
                        ? 'Especializado en SPAs performantes y experiencias de usuario fluidas'
                        : 'Specialized in performant SPAs and smooth user experiences'
                      }
                    </p>
                  </div>

                  {/* Backend */}
                  <div className="p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">Backend</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-3">
                      Node.js, Express, Laravel (PHP), PostgreSQL, MySQL, RESTful APIs
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-light">
                      {currentLocale === 'es'
                        ? 'APIs escalables, bases de datos optimizadas y arquitecturas limpias'
                        : 'Scalable APIs, optimized databases and clean architectures'
                      }
                    </p>
                  </div>

                  {/* Tools & DevOps */}
                  <div className="p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">
                      {currentLocale === 'es' ? 'Herramientas & DevOps' : 'Tools & DevOps'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-3">
                      Git, Docker, Vite, Webpack, npm/yarn, Linux, Bash
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-light">
                      {currentLocale === 'es'
                        ? 'Workflows automatizados y deploys eficientes'
                        : 'Automated workflows and efficient deployments'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom section - What I bring to projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center">
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
                  {currentLocale === 'es' ? 'Lo que aporto a los proyectos' : 'What I bring to projects'}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="text-center">
                  <h4 className="text-lg font-light text-black dark:text-white mb-3">
                    {currentLocale === 'es' ? 'Visión integral' : 'Holistic vision'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {currentLocale === 'es'
                      ? 'Entiendo tanto las necesidades técnicas como los objetivos de negocio, creando soluciones que realmente aporten valor.'
                      : 'I understand both technical needs and business objectives, creating solutions that truly add value.'
                    }
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-light text-black dark:text-white mb-3">
                    {currentLocale === 'es' ? 'Código limpio' : 'Clean code'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {currentLocale === 'es'
                      ? 'Escribo código que otros desarrolladores pueden entender, mantener y escalar fácilmente con el tiempo.'
                      : 'I write code that other developers can understand, maintain and scale easily over time.'
                    }
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-light text-black dark:text-white mb-3">
                    {currentLocale === 'es' ? 'Aprendizaje continuo' : 'Continuous learning'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {currentLocale === 'es'
                      ? 'Me mantengo actualizado con las últimas tecnologías y mejores prácticas de la industria.'
                      : 'I stay current with the latest technologies and industry best practices.'
                    }
                  </p>
                </div>
              </div>

              {/* Final message - clean and well separated */}
              <div className="relative">
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto text-center">
                  {currentLocale === 'es'
                    ? 'Cada proyecto es una oportunidad para crear algo excepcional. Mi objetivo es transformar ideas en soluciones digitales que no solo funcionen perfectamente, sino que también inspiren y generen resultados tangibles.'
                    : 'Every project is an opportunity to create something exceptional. My goal is to transform ideas into digital solutions that not only work perfectly, but also inspire and generate tangible results.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutMeSection);