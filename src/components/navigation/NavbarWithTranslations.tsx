// Isla de navegación: respeta la preferencia de movimiento reducido.
import { MotionConfig } from 'framer-motion';
import Navbar from './Navbar';
import type { Locale, NavbarTranslations } from '../../util/i18n';

interface NavbarIslandProps {
  content: NavbarTranslations;
  locale: Locale;
}

const NavbarIsland = ({ content, locale }: NavbarIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar content={content} locale={locale} />
    </MotionConfig>
  );
};

export default NavbarIsland;
