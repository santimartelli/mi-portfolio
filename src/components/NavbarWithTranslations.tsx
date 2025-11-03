// Importaciones necesarias: providers de tema y traducciones, tipos y componente Navbar
import { ThemeProvider } from "../util/ThemeContext";
import { I18nProvider, type Translations } from '../util/i18n';
import Navbar from './Navbar';

// Interfaz que define las props del componente
interface NavbarWithTranslationsProps {
  translations: Translations;
}

/**
 * Componente NavbarWithTranslations - Wrapper del componente Navbar
 * Propósito: Proveer los contextos de tema (ThemeProvider) y traducciones (I18nProvider) al componente Navbar
 * Este patrón permite que Navbar acceda al tema mediante useTheme() y a las traducciones mediante useTranslations()
 */
const NavbarWithTranslations = ({ translations }: NavbarWithTranslationsProps) => {
  return (
    <ThemeProvider>
      <I18nProvider translations={translations}>
        <Navbar />
      </I18nProvider>
    </ThemeProvider>
  );
};

// Exporta el componente para ser usado en las páginas de Astro
export default NavbarWithTranslations;