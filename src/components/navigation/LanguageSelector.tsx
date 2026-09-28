// Selector de idioma.
//
// Los idiomas son enlaces reales (`/` y `/en/`), no navegación por JavaScript:
// así funcionan sin JS, son rastreables y respetan los hreflang del documento.
// El desplegable es un `<details>` nativo, como el del menú: lo abre y lo cierra
// el navegador, y el estado vive en `[open]` (ver `Layout.astro` y
// `dropdownStyles.ts`). JavaScript solo añade cerrar al pulsar fuera o con
// Escape.
//
// Se eliminó `flag-icons`, que aportaba ~420 KB de CSS para dos banderas. El
// icono de diccionario se retiró y volvió a petición del usuario, y acabó siendo
// lo único que queda del botón: primero se probó a subir el código del idioma de
// tamaño, después a dejarlo en su tamaño de siempre con el peso fino de la
// marca, y la petición final fue quitarlo. Sin texto visible, el nombre
// accesible lo pone el aria-label y el idioma activo se marca dentro del
// desplegable, con el punto y el fondo del item.
import { MdOutlineTranslate } from 'react-icons/md';
import type { Locale, NavbarTranslations } from '../../util/i18n';
import { pathForLocale } from '../../util/site';
import { dropdownItemClass, dropdownPanelClass } from './dropdownStyles';

interface LanguageSelectorProps {
  content: NavbarTranslations;
  locale: Locale;
}

const LANGUAGE_OPTIONS: Array<{ code: Locale; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
];

const LanguageSelector = ({ content, locale }: LanguageSelectorProps) => {
  const t = content;

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
    <details name="barra" className="dropdown relative">
      {/* El boton, que es el `summary`: de solo icono. El codigo del idioma
          (ES / EN) se retiro a peticion del usuario, asi que el nombre accesible
          lo pone el aria-label y el idioma activo se ve marcado dentro del
          desplegable. La caja es de 48x56, como la del boton del menu, y el
          padding de la izquierda empuja el simbolo 2px hacia la derecha: es la
          mitad del trabajo de acercar los dos iconos de la barra (el boton del
          menu hace lo simetrico), sin mover las cajas ni solapar sus areas de
          toque. */}
      <summary
        aria-label={t.languageLabel}
        className="relative z-40 flex h-14 w-12 items-center justify-center pl-1 text-black dark:text-white">
        <MdOutlineTranslate className="w-5 h-5" aria-hidden="true" />
      </summary>

      <div id="language-menu" className={dropdownPanelClass}>
        <ul className="list-none space-y-1">
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = option.code === locale;
            return (
              <li key={option.code}>
                <a
                  href={pathForLocale(option.code)}
                  hrefLang={option.code}
                  onClick={rememberScrollPosition}
                  aria-current={isActive ? 'true' : undefined}
                  className={dropdownItemClass(isActive)}>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center w-6 h-4 border border-gray-300 dark:border-gray-600 text-[0.6rem] font-semibold tracking-wider">
                    {option.short}
                  </span>
                  <span className="font-medium">{option.label}</span>
                  {isActive && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
};

export default LanguageSelector;
