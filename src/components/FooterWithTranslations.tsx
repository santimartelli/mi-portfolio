// Importaciones necesarias para el componente wrapper
import Footer from './Footer';
import { I18nProvider, type Translations } from '../util/i18n';

// Interfaz que define las props del componente
interface FooterWithTranslationsProps {
  translations: Translations;
}

/**
 * Componente FooterWithTranslations - Wrapper del componente Footer
 * Propósito: Proveer el contexto de traducciones (I18nProvider) al componente Footer
 * Este patrón permite que Footer acceda a las traducciones mediante useTranslations()
 */
const FooterWithTranslations = ({ translations }: FooterWithTranslationsProps) => {
  return (
    <I18nProvider translations={translations}>
      <Footer />
    </I18nProvider>
  );
};

// Exporta el componente para ser usado en las páginas de Astro
export default FooterWithTranslations;