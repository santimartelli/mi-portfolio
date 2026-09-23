// Isla de el pie de página.
import { MotionConfig } from 'framer-motion';
import Footer from './Footer';
import type { FooterTranslations } from '../../util/i18n';

interface FooterIslandProps {
  content: FooterTranslations;
}

const FooterIsland = ({ content }: FooterIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Footer content={content} />
    </MotionConfig>
  );
};

export default FooterIsland;
