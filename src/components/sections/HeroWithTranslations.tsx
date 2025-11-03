// Importación del componente Hero y proveedores de contexto
import Hero from './Hero';
import { ThemeProvider } from "../util/ThemeContext";
import { I18nProvider, type Translations } from '../util/i18n';

// Interfaz que define las props del componente wrapper
interface HeroWithTranslationsProps {
  translations: Translations;
}

/**
 * Componente HeroWithTranslations - Wrapper del componente Hero
 * Propósito: Proveer los contextos de tema (ThemeProvider) y traducciones (I18nProvider) al componente Hero
 * Este patrón permite que Hero acceda al tema mediante useTheme() y a las traducciones mediante useTranslations()
 *
 * @param translations - Objeto con todas las traducciones del sitio
 */
const HeroWithTranslations = ({ translations }: HeroWithTranslationsProps) => {
  return (
    // Proveedor de contexto de tema (dark/light mode)
    <ThemeProvider>
      {/* Proveedor de contexto de traducciones */}
      <I18nProvider translations={translations}>
        {/* Componente Hero que consume ambos contextos */}
        <Hero />
      </I18nProvider>
    </ThemeProvider>
  );
};

// Exporta el componente wrapper
export default HeroWithTranslations;
