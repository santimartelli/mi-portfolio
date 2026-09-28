// Isla de navegación: el respeto por el movimiento reducido vive en el CSS
// de los propios desplegables y de las barras del menu (`motion-reduce` de Tailwind).
import Navbar from './Navbar';
import type { Locale, NavbarTranslations } from '../../util/i18n';

interface NavbarIslandProps {
  content: NavbarTranslations;
  locale: Locale;
}

const NavbarIsland = ({ content, locale }: NavbarIslandProps) => {
  return (
    <Navbar content={content} locale={locale} />
  );
};

export default NavbarIsland;
