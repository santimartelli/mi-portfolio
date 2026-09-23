// Isla de navegación: provee el tema y respeta la preferencia de movimiento reducido.
import { MotionConfig } from 'framer-motion';
import Navbar from './Navbar';
import { ThemeProvider } from '../../util/ThemeContext';
import type { Locale, NavbarTranslations } from '../../util/i18n';

interface NavbarIslandProps {
  content: NavbarTranslations;
  locale: Locale;
}

const NavbarIsland = ({ content, locale }: NavbarIslandProps) => {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Navbar content={content} locale={locale} />
      </MotionConfig>
    </ThemeProvider>
  );
};

export default NavbarIsland;
