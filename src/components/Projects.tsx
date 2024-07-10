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
    github: "https://github.com/project1",
    technologies: ["Vue3", "CSS", "Node.js", "Express.js", "MySQL"],
  },
  {
    image: "/smportfolio.webp",
    title: "Web / portfolio",
    title2: "Santiago Martelli",
    body: "Sitio web personal de Santiago Martelli",
    href: "https://martelli.dev",
    github: "https://github.com/project1",
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
    <section className="flex flex-col md:flex-row justify-center items-center w-full bg-slate-100 overflow-x-hidden">
      <div className="flex flex-col max-md:mx-4 gap-y-14 items-center pt-20 pb-20 md:pt-10">
        <h2 className="text-3xl md:text-5xl uppercase">
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
