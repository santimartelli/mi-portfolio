// Isla de la sección de experiencia profesional.
import Experience from './Experience';
import type { ExperienceTranslations } from '../../util/i18n';

interface ExperienceIslandProps {
  content: ExperienceTranslations;
}

const ExperienceIsland = ({ content }: ExperienceIslandProps) => {
  return (
    <Experience content={content} />
  );
};

export default ExperienceIsland;
