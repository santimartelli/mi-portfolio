// Isla de el pie de página.
import Footer from './Footer';
import type { FooterTranslations } from '../../util/i18n';

interface FooterIslandProps {
  content: FooterTranslations;
}

const FooterIsland = ({ content }: FooterIslandProps) => {
  return (
    <Footer content={content} />
  );
};

export default FooterIsland;
