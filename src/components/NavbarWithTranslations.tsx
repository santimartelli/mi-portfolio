import React from 'react';
import { ThemeProvider } from "../util/ThemeContext";
import { I18nProvider, type Translations } from '../util/i18n';
import Navbar from './Navbar';

interface NavbarWithTranslationsProps {
  translations: Translations;
}

const NavbarWithTranslations: React.FC<NavbarWithTranslationsProps> = ({ translations }) => {
  return (
    <ThemeProvider>
      <I18nProvider translations={translations}>
        <Navbar />
      </I18nProvider>
    </ThemeProvider>
  );
};

export default NavbarWithTranslations;