// Isla de la sección de skills, idiomas y formación.
import { MotionConfig } from 'framer-motion';
import Skills from './Skills';
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsIslandProps {
  content: SkillsTranslations;
}

const SkillsIsland = ({ content }: SkillsIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Skills content={content} />
    </MotionConfig>
  );
};

export default SkillsIsland;
