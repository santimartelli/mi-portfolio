import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { useTranslations } from "../util/i18n";

const getProjects = (t: any) => [
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
  },
];

const Projects = () => {
  const { projects: t } = useTranslations();

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectsRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.1 });
  
  const projects = getProjects(t);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">

      <div className="relative w-full max-w-7xl mx-auto px-8">
        {/* Rothelowman-inspired Minimal Header */}
        <div ref={headerRef} className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-16">
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl font-light">
            {t.description.intro} <span className="text-gray-900 dark:text-white font-normal">{t.description.highlight}</span> {t.description.continuation}
          </motion.p>
        </div>

        {/* Minimal Projects Grid */}
        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className="space-y-6"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Minimal Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {project.status === 'production' ? t.status.production : t.status.development}
                  </div>
                </div>

                {/* Clean Action Icons */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <HiExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Clean Project Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium">{project.year}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{project.category}</span>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <h4 className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-4">
                    {project.subtitle}
                  </h4>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.body}
                  </p>
                </div>

                {/* Simple Technology List */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Minimal Action Links */}
                <div className="flex gap-6 pt-2">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1 flex items-center gap-2"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    {t.buttons.viewProject}
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 border-b border-transparent hover:border-gray-600 dark:hover:border-gray-400 pb-1 flex items-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    {t.buttons.code}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Minimal Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-32 text-center"
        >
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-light max-w-2xl mx-auto">
            {t.cta.question}
          </p>
          <a
            href="#contact"
            className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1"
          >
            {t.cta.button}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
