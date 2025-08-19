import React, { createContext, useContext } from 'react';

// Tipos para las traducciones
export interface HeroTranslations {
  badge: string;
  firstName: string;
  lastName: string;
  description: {
    intro: string;
    highlight: string;
    continuation: string;
    technologies: string[];
  };
  buttons: {
    projects: string;
    contact: string;
  };
  scrollIndicator: string;
  ariaLabels: {
    projectsButton: string;
    contactButton: string;
  };
}

export interface NavbarTranslations {
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
}

export interface Translations {
  hero: HeroTranslations;
  navbar: NavbarTranslations;
}

// Context
const I18nContext = createContext<Translations | null>(null);

// Provider component
interface I18nProviderProps {
  children: React.ReactNode;
  translations: Translations;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, translations }) => {
  return (
    <I18nContext.Provider value={translations}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook para usar las traducciones
export const useTranslations = (): Translations => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context;
};

// Helper para cargar traducciones
export const loadTranslations = async (locale: string): Promise<Translations> => {
  const heroTranslations = await import(`../content/${locale}/hero.json`);
  const navbarTranslations = await import(`../content/${locale}/navbar.json`);
  
  return {
    hero: heroTranslations.default,
    navbar: navbarTranslations.default
  };
};