// Selector de idioma. Los idiomas son enlaces reales, no navegacion por JS:
// funcionan sin JavaScript, son rastreables y respetan los hreflang.
import { useEffect, useRef } from 'react';
import type { Locale } from '../../util/i18n';
import { pathForLocale } from '../../util/site';

interface LanguageSelectorProps {
  locale: Locale;
  /** Etiqueta accesible del boton. */
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const LANGUAGE_OPTIONS: Array<{ code: Locale; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
];

const LanguageSelector = ({ locale, label, isOpen, onToggle, onClose }: LanguageSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (containerRef.current && !containerRef.current.contains(target)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Guarda la posicion de scroll para que el layout la restaure al cambiar.
  const rememberScrollPosition = () => {
    try {
      sessionStorage.setItem('scrollPosition', JSON.stringify({ x: window.scrollX, y: window.scrollY }));
    } catch {
      // sessionStorage puede no estar disponible; no es critico.
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={onToggle}
        className="flex h-9 items-center gap-2 border border-rule px-2.5 font-mono text-micro uppercase tracking-[0.16em] text-muted transition-colors duration-200 ease-out hover:border-rule-strong hover:text-ink"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={label}>
        {locale === 'en' ? 'EN' : 'ES'}
        <svg viewBox="0 0 10 6" className="h-1.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* El desplegable se monta siempre y se muestra por opacidad: sin animacion de libreria. */}
      <ul
        className={`absolute right-0 top-full z-30 mt-2 w-44 list-none border border-rule bg-paper-raised py-1 transition-opacity duration-150 ease-out ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}>
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.code === locale;
          return (
            <li key={option.code}>
              <a
                href={pathForLocale(option.code)}
                hrefLang={option.code}
                onClick={rememberScrollPosition}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-3 px-3 py-2 text-sm no-underline transition-colors duration-150 ease-out hover:bg-accent-wash ${
                  isActive ? 'text-ink' : 'text-muted'
                }`}>
                <span className="font-mono text-micro tracking-[0.16em]">{option.short}</span>
                {option.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
