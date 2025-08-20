import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaEye, FaCode, FaRocket } from "react-icons/fa";
import { HiExternalLink, HiSparkles, HiLightBulb } from "react-icons/hi";
import { BiTargetLock } from "react-icons/bi";
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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
      className="relative w-full bg-darkbg-950 text-white overflow-hidden py-24 md:py-32">
      
      {/* Background Avanzado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Elementos flotantes decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-30, 30, -30], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-20 w-4 h-4 bg-accent rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [20, -40, 20], x: [-10, 10, -10] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-16 w-2 h-2 bg-accent-secondary rounded-full opacity-30"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="theme-card flex items-center justify-center gap-3 px-6 py-3 rounded-full text-sm font-semibold mb-8 mx-auto w-fit backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <BiTargetLock className="text-accent text-lg" />
            </motion.div>
            <span className="theme-text-gradient">{t.badge}</span>
            <HiSparkles className="text-accent-secondary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="theme-text-gradient">{t.title}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-tertiary leading-relaxed max-w-3xl mx-auto">
            {t.description.intro} <span className="text-accent font-semibold">{t.description.highlight}</span> {t.description.continuation}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative theme-card rounded-3xl overflow-hidden p-0 hover:scale-[1.02] transition-all duration-500"
              whileHover={{ y: -8 }}
            >
              {/* Project Image with Overlay */}
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary via-bg-tertiary/20 to-transparent opacity-90" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isProjectsInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    className="px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-bold text-white flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {project.status === 'production' ? t.status.production : t.status.development}
                  </motion.div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isProjectsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.2 }}
                    className="px-3 py-1.5 bg-bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-text-muted border border-border-secondary"
                  >
                    {project.category}
                  </motion.div>
                </div>

                {/* Hover Overlay with Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center gap-4"
                >
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-primary p-4 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEye className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-secondary p-4 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="w-6 h-6" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <HiLightBulb className="text-accent" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={isProjectsInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.2, delay: 1.4 + index * 0.2 + i * 0.05 }}
                        className="w-2 h-2 bg-accent rounded-full"
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="text-text-primary">{project.title}</span>
                </h3>
                
                <h4 className="text-lg text-accent font-semibold mb-4">
                  {project.subtitle}
                </h4>

                <p className="text-text-tertiary leading-relaxed mb-6">
                  {project.body}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
                    <FaRocket className="text-accent text-xs" />
                    {t.featuresLabel}
                  </h5>
                  <div className="space-y-2">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isProjectsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 1.6 + index * 0.2 + idx * 0.1 }}
                        className="text-sm text-text-muted flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isProjectsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.8 + index * 0.2 + techIndex * 0.05 }}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-bg-secondary/50 text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300 border border-border-secondary hover:border-accent/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-primary flex items-center gap-3 px-6 py-3 rounded-xl font-semibold flex-1 justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiExternalLink className="w-5 h-5" />
                    {t.buttons.viewProject}
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-secondary flex items-center gap-3 px-6 py-3 rounded-xl font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaCode className="w-5 h-5" />
                    {t.buttons.code}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-20"
        >
          <p className="text-text-tertiary mb-8 text-lg">
            {t.cta.question}
          </p>
          <motion.a
            href="#contact"
            className="theme-button-primary px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiSparkles />
            {t.cta.button}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
