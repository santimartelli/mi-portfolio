import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import { AnimatePresence } from 'framer-motion';

const projects = [
  {
    image: "/tmphoto.webp",
    title: "Tanya Martelli",
    title2: "Photography",
    body: "Aplicación web de la fotógrafa Tanya Martelli. Cuenta con galería, panel de administración, formulario de contacto y reserva de sesiones, entre otras funcionalidades. El código fuente se encuentra disponible en GitHub. Para ver la aplicación en funcionamiento, haga clic en el botón de abajo.",
    href: "https://tanyamartelli.com",
    github: 'https://github.com/project1',
    technologies: ['Vue3', 'CSS', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    image: "/smportfolio.webp",
    title: "Web / portfolio",
    title2: "Santiago Martelli",
    body: "Sitio web personal de Santiago Martelli",
    href: "https://martelli.dev",
    github: 'https://github.com/project1',
    technologies: ['Astro', 'React.js', 'Tailwind CSS'],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<{ title: string; title2: string; body: string; technologies: string[]; href: string; github: string; image: string } | null>(null);

  return (
    <div className="flex gap-8 flex-wrap items-center justify-center">
      {projects.map((project, index) => (
        <div key={index} onClick={() => setSelectedProject(project)} className='flex items-center justify-center'>
          <Card {...project} />
        </div>
      ))}
      <AnimatePresence>
      {selectedProject && (
        <Modal {...selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
