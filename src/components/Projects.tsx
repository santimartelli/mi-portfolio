import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

const projects = [
  {
    image: "/tmphoto.webp",
    title: "Tanya Martelli",
    title2: "Photography",
    body: "Portfolio profesional para la fotógrafa Tanya Martelli con diseño minimalista centrado en la experiencia visual. Incluye galería interactiva con categorías, sistema de reserva de sesiones, panel de administración para gestionar contenido y formulario de contacto personalizado. Implementado con Vue.js en el frontend y Node.js con Express en el backend, utilizando MySQL para almacenamiento de datos.",
    href: "https://tanyamartelli.com",
    github: "https://github.com/santimartelli/tanyamartelliphoto-project.git",
    technologies: ["Vue3", "CSS", "Node.js", "Express.js", "MySQL"],
  },
  {
    image: "/smportfolio.webp",
    title: "Web / portfolio",
    title2: "Santiago Martelli",
    body: "Portfolio personal diseñado con enfoque en rendimiento y experiencia visual fluida. Desarrollado con una arquitectura moderna utilizando Astro para optimización de carga, React con TypeScript para componentes tipados e interactivos, y Tailwind CSS para un diseño responsivo y elegante. La implementación con TypeScript garantiza código mantenible y robusto, mientras que Framer Motion proporciona animaciones sutiles. El proyecto sigue principios SOLID, patrones de diseño modernos y prácticas de desarrollo web performante.",
    href: "https://martelli.dev",
    github: "https://github.com/santimartelli/mi-portfolio.git",
    technologies: ["Astro", "React.js", "TypeScript", "Tailwind CSS"],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    title2: string;
    body: string;
    technologies: string[];
    href: string;
    github: string;
    image: string;
  } | null>(null);

  // Refs for section components
  const sectionRef = useRef(null);
  const projectRefs = projects.map(() => useRef(null));

  // InView hooks
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const projectsInView = projectRefs.map((ref) => useInView(ref, { once: true, amount: 0.2 }));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#0B0C10] text-white overflow-hidden py-24 md:py-32">
      {/* Background Pattern with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-transparent to-[#0B0C10] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* Title with Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1F2833] border border-[#45A29E]/20 text-sm font-medium mb-8 mx-auto w-fit">
          <span className="text-[#66FCF1]">Proyectos Destacados</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center text-white">
          Mis Proyectos
        </motion.h2>

        {/* Project Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              ref={projectRefs[index]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group relative rounded-xl bg-[#1F2833] border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300 overflow-hidden transform hover:scale-[1.02]">
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2833] via-transparent to-transparent opacity-80" />
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">
                  <span className="text-white">{project.title}</span>
                  {project.title2 && (
                    <>
                      <span className="text-[#66FCF1]"> / </span>
                      <span className="text-[#66FCF1]">{project.title2}</span>
                    </>
                  )}
                </h3>
                <p className="text-[#C5C6C7] text-base mb-6 line-clamp-3">{project.body}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-[#0B0C10]/50 text-[#C5C6C7] border border-[#45A29E]/20 group-hover:border-[#66FCF1]/30 group-hover:text-white transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#66FCF1] text-[#0B0C10] rounded-lg font-semibold hover:bg-[#45A29E] transition-all duration-300 transform hover:scale-105">
                    <span>Ver proyecto</span>
                    <HiExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-transparent border-2 border-[#66FCF1] text-[#66FCF1] rounded-lg font-semibold hover:bg-[#66FCF1]/10 transition-all duration-300 transform hover:scale-105">
                    <span>Código</span>
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
