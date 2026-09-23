// Barra de navegacion. El locale llega por props desde el servidor.
import { useState, useEffect } from "react";
import { useActiveSection } from "../../util/useActiveSection";
import type { Locale, NavbarTranslations } from "../../util/i18n";
import Logo from "../common/Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageSelector from "./LanguageSelector";

interface NavbarProps {
  content: NavbarTranslations;
  locale: Locale;
}

const Navbar = ({ content: t, locale }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-menu") && !target.closest(".nav-controls")) {
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
      className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
        <a href={homeHref} className="no-underline">
          <Logo />
        </a>

        <div className="nav-controls flex items-center gap-2">
          <ThemeToggleButton labels={t.themeLabels} />
          <LanguageSelector
            locale={locale}
            label={t.languageLabel}
            isOpen={languageOpen}
            onToggle={() => {
              setMenuOpen(false);
              setLanguageOpen((prev) => !prev);
            }}
            onClose={() => setLanguageOpen(false)}
          />
          <button
            type="button"
            onClick={() => {
              setLanguageOpen(false);
              setMenuOpen((prev) => !prev);
            }}
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-rule text-ink transition-colors duration-200 ease-out hover:border-rule-strong">
            <span
              aria-hidden="true"
              className={`block h-px w-4 bg-current transition-transform duration-200 ease-out ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-px w-4 bg-current transition-transform duration-200 ease-out ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu de secciones: se monta siempre y se revela por opacidad. */}
      <div
        id="primary-menu"
        className={`nav-menu absolute inset-x-0 top-full border-b border-rule bg-paper transition-opacity duration-200 ease-out ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}>
        <ul className="mx-auto max-w-6xl list-none px-6 py-3 sm:px-8">
          {sections.map((section) => {
            const isActive = activeSection === section.key;
            return (
              <li key={section.key}>
                <a
                  href={`${prefix}/#${section.key}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-rule py-3 text-base no-underline last:border-b-0 ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}>
                  {section.label}
                  {isActive && (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
