// Isla de la sección de experiencia profesional.
import { MotionConfig } from 'framer-motion';
import Experience from './Experience';
import type { ExperienceTranslations } from '../../util/i18n';

interface ExperienceIslandProps {
  content: ExperienceTranslations;
}

const ExperienceIsland = ({ content }: ExperienceIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Experience content={content} />
    </MotionConfig>
  );
};

export default ExperienceIsland;
