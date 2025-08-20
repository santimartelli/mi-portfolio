import React from 'react';
import Contact from './Contact';
import { I18nProvider, type Translations } from '../util/i18n';

interface ContactWithTranslationsProps {
  translations: Translations;
}

const ContactWithTranslations: React.FC<ContactWithTranslationsProps> = ({ translations }) => {
  return (
    <I18nProvider translations={translations}>
      <Contact />
    </I18nProvider>
  );
};

export default ContactWithTranslations;