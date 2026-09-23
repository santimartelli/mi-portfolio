// Isla de la sección de proyectos / casos de estudio.
import { MotionConfig } from 'framer-motion';
import Projects from './Projects';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsIslandProps {
  content: ProjectsTranslations;
}

const ProjectsIsland = ({ content }: ProjectsIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Projects content={content} />
    </MotionConfig>
  );
};

export default ProjectsIsland;
