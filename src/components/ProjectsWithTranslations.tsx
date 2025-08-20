import React from 'react';
import Projects from './Projects';
import { I18nProvider, type Translations } from '../util/i18n';

interface ProjectsWithTranslationsProps {
  translations: Translations;
}

const ProjectsWithTranslations: React.FC<ProjectsWithTranslationsProps> = ({ translations }) => {
  return (
    <I18nProvider translations={translations}>
      <Projects />
    </I18nProvider>
  );
};

export default ProjectsWithTranslations;