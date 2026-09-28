// Isla de la sección de proyectos / casos de estudio.
import Projects from './Projects';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsIslandProps {
  content: ProjectsTranslations;
}

const ProjectsIsland = ({ content }: ProjectsIslandProps) => {
  return (
    <Projects content={content} />
  );
};

export default ProjectsIsland;
