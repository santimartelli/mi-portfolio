import React from 'react';
import AboutMe from './AboutMe';
import { I18nProvider, type Translations } from '../util/i18n';

interface AboutMeWithTranslationsProps {
  translations: Translations;
}

const AboutMeWithTranslations: React.FC<AboutMeWithTranslationsProps> = ({ translations }) => {
  return (
    <I18nProvider translations={translations}>
      <AboutMe />
    </I18nProvider>
  );
};

export default AboutMeWithTranslations;