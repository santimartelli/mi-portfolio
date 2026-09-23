// Barra de navegacion con menu desplegable en todos los tamanos.
// Framer Motion se limita al desplegable; la barra en si no se anima, para que
// sea visible aunque no haya JavaScript.
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useActiveSection } from "../../util/useActiveSection";
import type { Locale, NavbarTranslations } from "../../util/i18n";
import Logo from "../common/Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageSelector from "./LanguageSelector";
import { dropdownVariants, dropdownItemClass, dropdownPanelClass, menuItemVariants } from "./dropdownMotion";

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
    <nav aria-label={t.menuLabel} className="nav-bar fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="shell flex h-16 items-center justify-between gap-3 sm:gap-6">
        <a href={homeHref} className="shrink-0">
          <Logo />
        </a>


        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggleButton labels={t.themeLabels} />
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
          {/* Menu: mismo panel y mismos items que el selector de idioma */}
          <div className="relative">
          <button
            type="button"
            onClick={() => {
              setLanguageOpen(false);
              setMenuOpen((prev) => !prev);
            }}
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            className="menu-button flex h-14 w-14 flex-col items-center justify-center text-black dark:text-white">
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="block h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 20 : 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="my-1 block h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="block h-0.5 w-6 bg-current"
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="primary-menu"
                key="primary-menu"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={dropdownPanelClass}>
                <motion.div variants={menuItemVariants} className="p-3">
                  <ul className="list-none space-y-1">
                    {sections.map((section) => {
                      const isActive = activeSection === section.key;
                      return (
                        <li key={section.key}>
                          <motion.a
                            href={`${prefix}/#${section.key}`}
                            onClick={() => setMenuOpen(false)}
                            aria-current={isActive ? "true" : undefined}
                            whileTap={{ scale: 0.98 }}
                            className={dropdownItemClass(isActive)}>
                            {section.label}
                            {isActive && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="ml-auto h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
