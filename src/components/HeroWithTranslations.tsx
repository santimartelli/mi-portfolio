import React from 'react';
import Hero from './Hero';
import { I18nProvider, type Translations } from '../util/i18n';

interface HeroWithTranslationsProps {
  translations: Translations;
}

const HeroWithTranslations: React.FC<HeroWithTranslationsProps> = ({ translations }) => {
  return (
    <I18nProvider translations={translations}>
      <Hero />
    </I18nProvider>
  );
};

export default HeroWithTranslations;