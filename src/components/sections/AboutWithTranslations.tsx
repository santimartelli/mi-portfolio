// Isla de la sección "Sobre mí".
import { MotionConfig } from 'framer-motion';
import About from './About';
import type { AboutTranslations } from '../../util/i18n';

interface AboutIslandProps {
  content: AboutTranslations;
}

const AboutIsland = ({ content }: AboutIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <About content={content} />
    </MotionConfig>
  );
};

export default AboutIsland;
