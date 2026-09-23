// Isla del navbar: es el unico bloque que necesita tema, menu y estado.
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
      <Navbar content={content} locale={locale} />
    </ThemeProvider>
  );
};

export default NavbarIsland;
