// Isla de la sección "Sobre mí".
import About from './About';
import type { AboutTranslations } from '../../util/i18n';

interface AboutIslandProps {
  content: AboutTranslations;
}

const AboutIsland = ({ content }: AboutIslandProps) => {
  return (
    <About content={content} />
  );
};

export default AboutIsland;
