import { useState, useRef } from "react";
import Card from "./Card";
import Modal from "./Modal";
import { AnimatePresence, motion, useInView } from "framer-motion";

const projects = [
  {
    image: "/tmphoto.webp",
    title: "Tanya Martelli",
    title2: "Photography",
    body: "Aplicación web de la fotógrafa Tanya Martelli. Cuenta con galería, panel de administración, formulario de contacto y reserva de sesiones, entre otras funcionalidades. El código fuente se encuentra disponible en GitHub. Para ver la aplicación en funcionamiento, haga clic en el botón de abajo.",
    href: "https://tanyamartelli.com",
    github: "https://github.com/santimartelli/tanyamartelliphoto-project.git",
    technologies: ["Vue3", "CSS", "Node.js", "Express.js", "MySQL"],
  },
  {
    image: "/smportfolio.webp",
    title: "Web / portfolio",
    title2: "Santiago Martelli",
    body: "Sitio web personal de Santiago Martelli. Es un espacio construido con Astro, React, TypeScript y Tailwind CSS, en él reflejo mis habilidades técnicas y mi compromiso con las mejores prácticas de desarrollo. También muestro una selección de mis proyectos más destacados. A través de los links de abajo se puede acceder a la web en funcionamiento y al código fuente en el repositorio de GitHub ",
    href: "https://martelli.dev",
    github: "https://github.com/santimartelli/mi-portfolio.git",
    technologies: ["Astro", "React.js", "Tailwind CSS"],
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
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);


  const card1InView = useInView(cardRef1, { once:true, margin: "-10%" });
  const card2InView = useInView(cardRef2, { once:true, margin: "-10%" });

  return (
    <section id="projects" className="flex flex-col md:flex-row justify-center items-center w-full bg-slate-100 overflow-x-hidden">
      <div className="flex flex-col mx-12 gap-y-14 items-center pt-20 pb-20 md:pt-32 md:pb-40">
        <h2 className="text-3xl md:text-4xl uppercase">
          Proyectos
        </h2>
        <div className="flex flex-col md:flex-row gap-8 flex-wrap items-center justify-center">
          {projects.map((project, index) => (
            <div key={index} onClick={() => setSelectedProject(project)} className="flex items-center justify-center">
                <motion.div
                  ref={index === 0 ? cardRef1 : cardRef2}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    index === 0 ? (card1InView ? { opacity: 1, y: 0 } : {}) : card2InView ? { opacity: 1, y: 0 } : {}
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex items-center justify-center overflow-x-hidden"
                  >
                  <Card {...project} />
                </motion.div>
            </div>
          ))}
          <AnimatePresence>
            {selectedProject && <Modal {...selectedProject} onClose={() => setSelectedProject(null)} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
