// Isla de la sección Hero.
import { MotionConfig } from 'framer-motion';
import Hero from './Hero';
import type { HeroTranslations } from '../../util/i18n';

interface HeroIslandProps {
  content: HeroTranslations;
}

const HeroIsland = ({ content }: HeroIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Hero content={content} />
    </MotionConfig>
  );
};

export default HeroIsland;
