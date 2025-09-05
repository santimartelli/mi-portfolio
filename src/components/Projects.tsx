import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { useTranslations } from "../util/i18n";

const getProjects = (t: any, currentLocale: string) => [
  {
    id: 1,
    image: "/tmphoto.webp",
    title: t.projects.tanyaPortfolio.title,
    subtitle: t.projects.tanyaPortfolio.subtitle,
    category: t.projects.tanyaPortfolio.category,
    body: t.projects.tanyaPortfolio.body,
    features: t.projects.tanyaPortfolio.features,
    href: "https://tanyamartelli.com",
    github: "https://github.com/santimartelli/tanyamartelliphoto-project.git",
    technologies: ["Vue.js", "Node.js", "Express", "MySQL", "CSS3"],
    status: "production",
    year: "2024",
    gradient: "from-purple-500 to-pink-600",
    challenges: currentLocale === 'es' 
      ? "Diseñar una experiencia visual que destacara el trabajo fotográfico sin distraer del contenido principal."
      : "Design a visual experience that highlighted the photographic work without distracting from the main content.",
    impact: currentLocale === 'es'
      ? "Incremento del 40% en consultas de clientes y mejora significativa en la percepción profesional."
      : "40% increase in client inquiries and significant improvement in professional perception.",
    learnings: currentLocale === 'es'
      ? "Profundización en optimización de imágenes y desarrollo de sistemas de gestión de contenido personalizados."
      : "Deep dive into image optimization and development of custom content management systems.",
  },
  {
    id: 2,
    image: "/smportfolio.webp",
    title: t.projects.personalPortfolio.title,
    subtitle: t.projects.personalPortfolio.subtitle,
    category: t.projects.personalPortfolio.category,
    body: t.projects.personalPortfolio.body,
    features: t.projects.personalPortfolio.features,
    href: "https://martelli.dev",
    github: "https://github.com/santimartelli/mi-portfolio.git",
    technologies: ["Astro", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "production",
    year: "2024",
    gradient: "from-blue-500 to-cyan-500",
    challenges: currentLocale === 'es'
      ? "Crear un portafolio que fuera tanto técnicamente impresionante como visualmente atractivo para recruiters."
      : "Create a portfolio that was both technically impressive and visually appealing to recruiters.",
    impact: currentLocale === 'es'
      ? "Conversión directa en oportunidades de empleo y reconocimiento por parte de la comunidad de desarrolladores."
      : "Direct conversion into job opportunities and recognition from the developer community.",
    learnings: currentLocale === 'es'
      ? "Dominio avanzado de Astro islands, optimización de performance y arquitecturas de componentes escalables."
      : "Advanced mastery of Astro islands, performance optimization and scalable component architectures.",
  },
];

const Projects = () => {
  const { projects: t } = useTranslations();

  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });

  // Helper function for current locale
  const getCurrentLocale = (): string => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/en')) return 'en';
    }
    return 'es';
  };

  const currentLocale = getCurrentLocale();
  const projects = getProjects(t, currentLocale);

  return (
    <section
      id="projects"
      className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">

      <div ref={contentRef} className="w-full">
        {/* Full-width container to match AboutMe */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header with e-ink aesthetic */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t.title}
            </motion.h2>

            {/* Professional intro matching AboutMe style */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light tracking-wide">
                {currentLocale === 'es'
                  ? 'Cada proyecto representa un desafío único donde aplico tecnologías modernas para resolver problemas reales, creando soluciones que no solo funcionan, sino que generan impacto medible.'
                  : 'Each project represents a unique challenge where I apply modern technologies to solve real problems, creating solutions that not only work, but generate measurable impact.'
                }
              </p>
            </motion.div>
          </div>

          {/* Projects - Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 6 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.4, delay: 0.5 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge - e-ink style */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {project.status === 'production' ? t.status.production : t.status.development}
                    </div>
                  </div>

                  {/* Action Links - cleaner */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                      aria-label="View project"
                    >
                      <HiExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                      aria-label="View source code"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 space-y-6">
                  
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                      <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 font-medium">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.category}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-light text-black dark:text-white mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    
                    <h4 className="text-lg text-gray-600 dark:text-gray-400 font-light mb-4">
                      {project.subtitle}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm">
                      {project.body}
                    </p>
                  </div>

                  {/* Technology Stack */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">
                      {currentLocale === 'es' ? 'Stack Técnico' : 'Tech Stack'}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Insights - Compact */}
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {/* Challenge */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                          {currentLocale === 'es' ? 'Desafío' : 'Challenge'}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                        {project.challenges}
                      </p>
                    </div>

                    {/* Impact */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 bg-green-400 dark:bg-green-500 rounded-full"></div>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                          {currentLocale === 'es' ? 'Impacto' : 'Impact'}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                        {project.impact}
                      </p>
                    </div>

                    {/* Learnings */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                          {currentLocale === 'es' ? 'Aprendizajes' : 'Learnings'}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                        {project.learnings}
                      </p>
                    </div>
                  </div>

                  {/* Action Links - e-ink style */}
                  <div className="flex gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 uppercase tracking-widest flex items-center gap-2"
                    >
                      <HiExternalLink className="w-3 h-3" />
                      {t.buttons.viewProject}
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 uppercase tracking-widest flex items-center gap-2"
                    >
                      <FaGithub className="w-3 h-3" />
                      {t.buttons.code}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA - e-ink style */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-32 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
                  {currentLocale === 'es' ? '¿Tienes un proyecto en mente?' : 'Have a project in mind?'}
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                {currentLocale === 'es'
                  ? 'Me especializo en transformar ideas complejas en soluciones digitales elegantes y funcionales. Cada proyecto es una oportunidad para crear algo excepcional juntos.'
                  : 'I specialize in transforming complex ideas into elegant and functional digital solutions. Every project is an opportunity to create something exceptional together.'
                }
              </p>

              <a
                href="#contact"
                className="text-base font-light text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 uppercase tracking-widest"
              >
                {currentLocale === 'es' ? 'Hablemos' : 'Let\'s Talk'}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
