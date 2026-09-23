// Selector de idioma.
//
// Los idiomas son enlaces reales (`/` y `/en/`), no navegación por JavaScript:
// así funcionan sin JS, son rastreables y respetan los hreflang del documento.
// Se eliminó `flag-icons`, que aportaba ~420 KB de CSS para dos banderas.
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineTranslate } from 'react-icons/md';
import type { Locale, NavbarTranslations } from '../../util/i18n';
import { pathForLocale } from '../../util/site';

interface LanguageSelectorProps {
  content: NavbarTranslations;
  locale: Locale;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const LANGUAGE_OPTIONS: Array<{ code: Locale; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
];

const dropdownVariants = {
  hidden: { height: 0, opacity: 1, transformOrigin: 'top' },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { height: { duration: 0.3, ease: 'easeOut' }, staggerChildren: 0.1, delayChildren: 0.1 },
  },
  exit: {
    height: 0,
    opacity: 1,
    transition: { height: { duration: 0.2, ease: 'easeIn' }, staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: 'easeIn' } },
};

const LanguageSelector = ({ content, locale, isOpen, onToggle, onClose }: LanguageSelectorProps) => {
  const t = content;
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  /**
   * Guarda la posición de scroll antes de navegar para que el layout la
   * restaure al cargar el otro idioma.
   */
  const rememberScrollPosition = () => {
    try {
      sessionStorage.setItem(
        'scrollPosition',
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );
    } catch {
      // sessionStorage puede no estar disponible; no es crítico.
    }
  };

  return (
    <div className="relative language-selector" ref={containerRef}>
      <button
        type="button"
        onClick={onToggle}
        className="relative z-40 flex items-center justify-center gap-2 h-14 px-3 text-sm font-medium text-black dark:text-white rounded-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t.languageLabel}>
        <MdOutlineTranslate className="w-5 h-5" aria-hidden="true" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          {locale === 'en' ? 'EN' : 'ES'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="language-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute right-0 top-[72px] w-56 bg-white dark:bg-gray-950 border border-black dark:border-gray-800 mobile-menu overflow-hidden z-30">
            <motion.div variants={menuItemVariants} className="p-3">
              <ul className="list-none space-y-1">
                {LANGUAGE_OPTIONS.map((option) => {
                  const isActive = option.code === locale;
                  return (
                    <li key={option.code}>
                      <motion.a
                        href={pathForLocale(option.code)}
                        hrefLang={option.code}
                        onClick={() => {
                          rememberScrollPosition();
                          onClose();
                        }}
                        whileTap={{ scale: 0.98 }}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-sm ${
                          isActive
                            ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                        }`}>
                        <span
                          aria-hidden="true"
                          className="inline-flex items-center justify-center w-6 h-4 border border-gray-300 dark:border-gray-600 text-[0.6rem] font-semibold tracking-wider">
                          {option.short}
                        </span>
                        <span className="font-medium">{option.label}</span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                            aria-hidden="true"
                          />
                        )}
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
