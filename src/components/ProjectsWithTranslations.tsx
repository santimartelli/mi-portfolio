// Importaciones necesarias: componente Projects, provider de traducciones y tipos
import Projects from './Projects';
import { I18nProvider, type Translations } from '../util/i18n';

// Interfaz que define las props del componente
interface ProjectsWithTranslationsProps {
  translations: Translations;
}

/**
 * Componente ProjectsWithTranslations - Wrapper del componente Projects
 * Propósito: Proveer el contexto de traducciones (I18nProvider) al componente Projects
 * Este patrón permite que Projects acceda a las traducciones mediante useTranslations()
 */
const ProjectsWithTranslations = ({ translations }: ProjectsWithTranslationsProps) => {
  return (
    <I18nProvider translations={translations}>
      <Projects />
    </I18nProvider>
  );
};

// Exporta el componente para ser usado en las páginas de Astro
export default ProjectsWithTranslations;