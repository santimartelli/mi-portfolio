// Isla de la sección Hero.
import Hero from './Hero';
import type { HeroTranslations } from '../../util/i18n';

interface HeroIslandProps {
  content: HeroTranslations;
}

const HeroIsland = ({ content }: HeroIslandProps) => {
  return (
    <Hero content={content} />
  );
};

export default HeroIsland;
