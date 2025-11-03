// Importación del componente AboutMe y proveedor de traducciones
import AboutMe from './AboutMe';
import { I18nProvider, type Translations } from '../../util/i18n';

// Interfaz que define las props del componente wrapper
interface AboutMeWithTranslationsProps {
  translations: Translations;
}

/**
 * Componente AboutMeWithTranslations - Wrapper del componente AboutMe
 * Propósito: Proveer el contexto de traducciones (I18nProvider) al componente AboutMe
 * Este patrón permite que AboutMe acceda a las traducciones mediante el hook useTranslations()
 *
 * @param translations - Objeto con todas las traducciones del sitio
 */
const AboutMeWithTranslations = ({ translations }: AboutMeWithTranslationsProps) => {
  return (
    // Proveedor de contexto de traducciones
    <I18nProvider translations={translations}>
      {/* Componente AboutMe que consume las traducciones del contexto */}
      <AboutMe />
    </I18nProvider>
  );
};

// Exporta el componente wrapper
export default AboutMeWithTranslations;
