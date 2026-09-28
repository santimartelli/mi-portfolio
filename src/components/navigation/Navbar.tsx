// Barra de navegacion con menu desplegable en todos los tamanos.
//
// La barra no se anima: es visible y usable desde el HTML del servidor, y los dos
// desplegables (el menu y el selector de idioma) se abren con una transicion de
// clases, sin medir alturas ni montar y desmontar paneles. Ver el porque en
// `dropdownStyles.ts`. El unico estado que depende del scroll es el fondo: en
// cuanto la pagina se mueve, la barra pasa de opaca a translucida con el fondo
// difuminado (backdrop-filter) para que el contenido que pasa por debajo se lea
// como tal y no desaparezca de golpe. El difuminado esta siempre declarado y lo
// que cambia es la opacidad del blanco, que es lo unico que se puede interpolar:
// asi la transicion es continua. Sin JavaScript la barra se queda opaca y los
// paneles cerrados, que es exactamente el estado de antes.
import { useState, useEffect } from "react";
import { useActiveSection } from "../../util/useActiveSection";
import type { Locale, NavbarTranslations } from "../../util/i18n";
import Logo from "../common/Logo";
import LanguageSelector from "./LanguageSelector";
import { dropdownItemClass, dropdownPanelClass, dropdownPanelClosedClass } from "./dropdownStyles";

interface NavbarProps {
  content: NavbarTranslations;
  locale: Locale;
}

const Navbar = ({ content: t, locale }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en/" : "/";

  const sections = [
    { key: "home", label: t.navigation.home },
    { key: "about", label: t.navigation.about },
    { key: "experience", label: t.navigation.experience },
    { key: "skills", label: t.navigation.skills },
    { key: "projects", label: t.navigation.projects },
    { key: "contact", label: t.navigation.contact },
  ];

  useEffect(() => {
    if (menuOpen) setLanguageOpen(false);
  }, [menuOpen]);

  // Estado del fondo segun el scroll. El listener es pasivo y lleva un umbral de
  // 8px, que absorbe el rebote elastico de iOS (scrollY puede ser negativo) y el
  // ruido de las ruedas de los trackpads. Se comprueba tambien al montar porque
  // el selector de idioma guarda y restaura la posicion del scroll al navegar.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".nav-bar")) {
        setMenuOpen(false);
        setLanguageOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      aria-label={t.menuLabel}
      className={`nav-bar fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white backdrop-blur-md transition-colors duration-200 ease-out dark:border-gray-800 dark:bg-gray-950 ${
        scrolled ? "supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-gray-950/85" : ""
      }`}>
      {/* El header no usa .shell, porque necesita el ancho completo, pero desde
          lg comparte sus escalones de margen lateral (4rem y sube con la
          pantalla) para que la marca y el contenido de las secciones empiecen en
          la misma vertical. Por debajo de lg cada uno lleva el suyo. */}
      <div className="flex h-16 w-full items-center justify-between gap-3 px-6 sm:gap-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <a href={homeHref} className="shrink-0">
          <Logo />
        </a>


        {/* Los dos controles de la derecha van juntos, sin hueco entre sus cajas:
            el aire lo pone el padding asimetrico de cada boton, que empuja su
            dibujo hacia el vecino. Ver el comentario del boton del menu. */}
        <div className="flex shrink-0 items-center">
          <LanguageSelector
            content={t}
            locale={locale}
            isOpen={languageOpen}
            onToggle={() => {
              setMenuOpen(false);
              setLanguageOpen((prev) => !prev);
            }}
            onClose={() => setLanguageOpen(false)}
          />
          {/* Menu: mismo panel y mismos items que el selector de idioma.
              La caja es de 48x56 y el dibujo se empuja 2px hacia la izquierda con
              el padding de la derecha (las barras van centradas en la caja de
              contenido, asi que recortarla por un lado las mueve). Es la mitad
              del trabajo de acercar los dos iconos: el selector de idioma hace lo
              simetrico. Sin esto, con las dos cajas centradas, quedaban 42px
              entre el simbolo y las barras y parecian dos controles sueltos. */}
          <div className="relative z-40">
          <button
            type="button"
            onClick={() => {
              setLanguageOpen(false);
              setMenuOpen((prev) => !prev);
            }}
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            data-open={menuOpen ? "true" : "false"}
            className="menu-button flex h-14 w-12 flex-col items-center justify-center pr-1 text-black dark:text-white">
            <span className="menu-bar block h-0.5 w-6 bg-current transition-transform duration-200 ease-out motion-reduce:transition-none" />
            <span className="menu-bar my-1 block h-0.5 w-6 bg-current transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none" />
            <span className="menu-bar block h-0.5 w-6 bg-current transition-transform duration-200 ease-out motion-reduce:transition-none" />
          </button>

          {/* El panel: se pinta siempre y la clase decide si esta abierto. */}
          <div
            id="primary-menu"
            className={`${dropdownPanelClass} ${menuOpen ? "" : dropdownPanelClosedClass}`}>
            <ul className="list-none space-y-1">
              {sections.map((section) => {
                const isActive = activeSection === section.key;
                return (
                  <li key={section.key}>
                    <a
                      href={`${prefix}/#${section.key}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={dropdownItemClass(isActive)}>
                      {section.label}
                      {isActive && (
                        <span
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
