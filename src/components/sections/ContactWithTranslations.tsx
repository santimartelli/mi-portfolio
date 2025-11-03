// Importación del componente Contact y proveedor de traducciones
import Contact from './Contact';
import { I18nProvider, type Translations } from '../util/i18n';

// Interfaz que define las props del componente wrapper
interface ContactWithTranslationsProps {
  translations: Translations;
}

/**
 * Componente ContactWithTranslations - Wrapper del componente Contact
 * Propósito: Proveer el contexto de traducciones (I18nProvider) al componente Contact
 * Este patrón permite que Contact acceda a las traducciones mediante el hook useTranslations()
 *
 * @param translations - Objeto con todas las traducciones del sitio
 */
const ContactWithTranslations = ({ translations }: ContactWithTranslationsProps) => {
  return (
    <I18nProvider translations={translations}>
      <Contact />
    </I18nProvider>
  );
};

// Exporta el componente wrapper
export default ContactWithTranslations;
