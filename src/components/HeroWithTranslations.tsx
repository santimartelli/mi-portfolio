import React from 'react';
import Hero from './Hero';
import { ThemeProvider } from "../util/ThemeContext";
import { I18nProvider, type Translations } from '../util/i18n';

interface HeroWithTranslationsProps {
  translations: Translations;
}

const HeroWithTranslations: React.FC<HeroWithTranslationsProps> = ({ translations }) => {
  return (
    <ThemeProvider>
      <I18nProvider translations={translations}>
        <Hero />
      </I18nProvider>
    </ThemeProvider>
  );
};

export default HeroWithTranslations;