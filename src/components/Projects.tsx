import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';

const projects = [
  {
    image: "/public/tmphoto.webp",
    title: "Tanya Martelli",
    title2: "Photography",
    body: "Aplicación web de fotografía de Tanya Martelli, cuenta con galería, panel de administración, formulario de contacto y reservas, entre otras funcionalidades.",
    href: "https://tanyamartelli.com",
    github: 'https://github.com/project1',
    technologies: ['Vue3', 'Vanilla CSS'],
  },
  {
    image: "/public/smportfolio.webp",
    title: "Portfolio",
    title2: "Santiago Martelli",
    body: "Sitio web personal de Santiago Martelli",
    href: "https://martelli.dev",
    github: 'https://github.com/project1',
    technologies: ['Vue3', 'Vanilla CSS'],
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
      {selectedProject && (
        <Modal {...selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Projects;
