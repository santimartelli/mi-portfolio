/**
 * Sistema de internacionalización (i18n) del portfolio
 *
 * Proporciona un contexto de React para manejar traducciones en español e inglés.
 * Utiliza TypeScript para garantizar la seguridad de tipos en todas las traducciones.
 */

import React, { createContext, useContext } from 'react';

// ============================================
// INTERFACES DE TRADUCCIONES POR SECCIÓN
// ============================================

/**
 * Traducciones para la sección Hero (página principal)
 * Incluye el badge, nombre, descripción y botones de acción
 */
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

/**
 * Traducciones para la barra de navegación
 * Contiene los enlaces principales del sitio
 */
export interface NavbarTranslations {
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
}

/**
 * Traducciones para la sección "Sobre Mí"
 * Incluye descripción personal, estadísticas, tecnologías y call-to-action
 */
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

/**
 * Traducciones para la sección de Proyectos
 * Contiene información de cada proyecto, estados, características y botones
 */
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

/**
 * Traducciones para la sección de Contacto
 * Incluye métodos de contacto, redes sociales y descarga de CV
 */
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

/**
 * Traducciones para el footer (pie de página)
 * Contiene marca, navegación, tecnologías y copyright
 */
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

/**
 * Interfaz principal que agrupa todas las traducciones del sitio
 * Garantiza que todas las secciones estén presentes en cada idioma
 */
export interface Translations {
  hero: HeroTranslations;
  navbar: NavbarTranslations;
  aboutme: AboutMeTranslations;
  projects: ProjectsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
}

// ============================================
// CONTEXTO Y PROVIDER
// ============================================

/**
 * Contexto de React para las traducciones
 * Permite acceder a las traducciones desde cualquier componente hijo
 */
const I18nContext = createContext<Translations | null>(null);

/**
 * Props para el componente I18nProvider
 */
interface I18nProviderProps {
  children: React.ReactNode;
  translations: Translations;
}

/**
 * Componente Provider que envuelve la aplicación y proporciona las traducciones
 *
 * @param children - Componentes hijos que tendrán acceso a las traducciones
 * @param translations - Objeto con todas las traducciones cargadas
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({ children, translations }) => {
  return (
    <I18nContext.Provider value={translations}>
      {children}
    </I18nContext.Provider>
  );
};

// ============================================
// HOOKS Y UTILIDADES
// ============================================

/**
 * Hook personalizado para acceder a las traducciones desde cualquier componente
 *
 * @returns Objeto con todas las traducciones del idioma actual
 * @throws Error si se usa fuera de un I18nProvider
 *
 * @example
 * const { hero, navbar } = useTranslations();
 * console.log(hero.title);
 */
export const useTranslations = (): Translations => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context;
};

/**
 * Función helper para cargar traducciones dinámicamente según el idioma
 *
 * @param locale - Código del idioma ('es' para español, 'en' para inglés)
 * @returns Promise con el objeto completo de traducciones
 *
 * @example
 * const translations = await loadTranslations('es');
 */
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
