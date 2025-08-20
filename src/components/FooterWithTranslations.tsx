import React from 'react';
import Footer from './Footer';
import { I18nProvider, type Translations } from '../util/i18n';

interface FooterWithTranslationsProps {
  translations: Translations;
}

const FooterWithTranslations: React.FC<FooterWithTranslationsProps> = ({ translations }) => {
  return (
    <I18nProvider translations={translations}>
      <Footer />
    </I18nProvider>
  );
};

export default FooterWithTranslations;