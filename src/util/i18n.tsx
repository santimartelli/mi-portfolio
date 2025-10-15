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

export interface AboutMeTranslations {
  badge: string;
  title: string;
  description: {
    paragraph1: {
      intro: string;
      highlight1: string;
      middle: string;
      highlight2: string;
      continuation: string;
      highlight3: string;
      end: string;
    };
    paragraph2: {
      intro: string;
      highlight: string;
      continuation: string;
    };
  };
  stats: {
    experience: string;
    commitment: string;
    projects: string;
    learning: string;
  };
  technologies: {
    frontend: {
      name: string;
      desc: string;
    };
    backend: {
      name: string;
      desc: string;
    };
    database: {
      name: string;
      desc: string;
    };
    methodologies: {
      name: string;
      desc: string;
    };
  };
  cta: {
    question: string;
    button: string;
  };
}

export interface ProjectsTranslations {
  badge: string;
  title: string;
  description: {
    intro: string;
    highlight: string;
    continuation: string;
  };
  status: {
    production: string;
    development: string;
  };
  featuresLabel: string;
  buttons: {
    viewProject: string;
    code: string;
  };
  cta: {
    question: string;
    button: string;
  };
  projects: {
    tanyaPortfolio: {
      title: string;
      subtitle: string;
      category: string;
      body: string;
      features: string[];
    };
    acerkoFreelance: {
      title: string;
      subtitle: string;
      category: string;
      body: string;
      features: string[];
    };
  };
}

export interface ContactTranslations {
  badge: string;
  title: string;
  description: {
    line1: string;
    line2: string;
    line2_highlight: string;
  };
  contact: {
    title: string;
    subtitle: string;
    methods: {
      email: {
        label: string;
        action: string;
      };
      whatsapp: {
        label: string;
        action: string;
      };
    };
  };
  socialNetworks: {
    title: string;
    subtitle: string;
    whyFollow: {
      title: string;
      reasons: string[];
    };
  };
  cv: {
    title: string;
    subtitle: string;
    info: {
      title: string;
      highlights: string[];
    };
    spanish: {
      language: string;
      description: string;
      size: string;
      lastUpdate: string;
    };
    english: {
      language: string;
      description: string;
      size: string;
      lastUpdate: string;
    };
  };
  availability: string;
}

export interface FooterTranslations {
  brand: {
    name: string;
    description: string;
  };
  navigation: {
    title: string;
    links: {
      home: string;
      about: string;
      projects: string;
      contact: string;
    };
  };
  technologies: {
    title: string;
    moreText: string;
  };
  copyright: string;
  madeWith: {
    developedWith: string;
    and: string;
    from: string;
    location: string;
  };
  cta: {
    question: string;
    button: string;
  };
}

export interface Translations {
  hero: HeroTranslations;
  navbar: NavbarTranslations;
  aboutme: AboutMeTranslations;
  projects: ProjectsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
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
  const aboutmeTranslations = await import(`../content/${locale}/aboutme.json`);
  const projectsTranslations = await import(`../content/${locale}/projects.json`);
  const contactTranslations = await import(`../content/${locale}/contact.json`);
  const footerTranslations = await import(`../content/${locale}/footer.json`);
  
  return {
    hero: heroTranslations.default,
    navbar: navbarTranslations.default,
    aboutme: aboutmeTranslations.default,
    projects: projectsTranslations.default,
    contact: contactTranslations.default,
    footer: footerTranslations.default
  };
};
