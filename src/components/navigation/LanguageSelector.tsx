// Selector de idioma.
//
// Los idiomas son enlaces reales (`/` y `/en/`), no navegación por JavaScript:
// así funcionan sin JS, son rastreables y respetan los hreflang del documento.
// Se eliminó `flag-icons`, que aportaba ~420 KB de CSS para dos banderas. El
// icono de diccionario se retiró y volvió a petición del usuario, y acabó siendo
// lo único que queda del botón: primero se probó a subir el código del idioma de
// tamaño, después a dejarlo en su tamaño de siempre con el peso fino de la
// marca, y la petición final fue quitarlo. Sin texto visible, el nombre
// accesible lo pone el aria-label y el idioma activo se marca dentro del
// desplegable, con el punto y el fondo del item.
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineTranslate } from 'react-icons/md';
import type { Locale, NavbarTranslations } from '../../util/i18n';
import { pathForLocale } from '../../util/site';
import { dropdownVariants, dropdownItemClass, dropdownPanelClass, menuItemVariants } from './dropdownMotion';

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
      {/* Boton de solo icono. El codigo del idioma (ES / EN) se retiro a
          peticion del usuario, asi que el nombre accesible lo pone el
          aria-label y el idioma activo se ve marcado dentro del desplegable.
          La caja es cuadrada y del mismo tamano que el boton del menu, para que
          los dos controles de la barra midan lo mismo. */}
      <button
        type="button"
        onClick={onToggle}
        className="relative z-40 flex h-14 w-14 items-center justify-center text-black dark:text-white rounded-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t.languageLabel}>
        <MdOutlineTranslate className="w-5 h-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="language-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className={dropdownPanelClass}>
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
                        className={dropdownItemClass(isActive)}>
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
