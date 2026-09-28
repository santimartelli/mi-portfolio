// Isla de la sección de skills, idiomas y formación.
import Skills from './Skills';
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsIslandProps {
  content: SkillsTranslations;
}

const SkillsIsland = ({ content }: SkillsIslandProps) => {
  return (
    <Skills content={content} />
  );
};

export default SkillsIsland;
