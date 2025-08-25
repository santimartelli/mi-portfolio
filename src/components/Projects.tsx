import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaCode } from "react-icons/fa";
import { HiExternalLink, HiSparkles } from "react-icons/hi";
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
      className="relative w-full bg-darkbg-950 text-white py-24 md:py-32">
      
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/2 to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            <span className="text-accent">{t.title}</span>
          </motion.h2>

          <div className="w-16 h-0.5 bg-accent mb-8 mx-auto" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {t.description.intro} <span className="text-accent font-semibold">{t.description.highlight}</span> {t.description.continuation}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              className="bg-bg-secondary/10 border border-border-secondary/50 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-bg-secondary/20 hover:border-accent/20 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full" />
                    {project.status === 'production' ? t.status.production : t.status.development}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg-primary/80 hover:bg-accent/20 backdrop-blur-sm rounded-full text-text-muted hover:text-accent transition-all duration-200"
                  >
                    <HiExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg-primary/80 hover:bg-accent/20 backdrop-blur-sm rounded-full text-text-muted hover:text-accent transition-all duration-200"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-muted">{project.year}</span>
                  <span className="text-sm text-accent font-medium">{project.category}</span>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {project.title}
                </h3>
                
                <h4 className="text-base text-accent font-medium mb-3">
                  {project.subtitle}
                </h4>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {project.body}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-bg-tertiary/30 text-text-tertiary rounded-full border border-border-secondary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium flex-1 justify-center"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    {t.buttons.viewProject}
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-secondary flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <FaCode className="w-4 h-4" />
                    {t.buttons.code}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-2xl mx-auto mt-20 p-8 bg-bg-secondary/10 border border-border-secondary/50 rounded-xl backdrop-blur-sm text-center"
        >
          <p className="text-lg text-text-primary mb-6 font-medium">
            {t.cta.question}
          </p>
          <a
            href="#contact"
            className="theme-button-secondary px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            {t.cta.button}
            <HiSparkles className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
