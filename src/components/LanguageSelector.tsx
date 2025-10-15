import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineTranslate } from "react-icons/md";
import { useThemeContext } from "../util/ThemeContext";
import type { CvLocale } from "../util/cvMetadata";
import "flag-icons/css/flag-icons.min.css";

interface LanguageSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const LANGUAGE_OPTIONS: Array<{ code: CvLocale; label: string; flag: string }> = [
  { code: "en", label: "English", flag: "fi fi-us" },
  { code: "es", label: "Español", flag: "fi fi-es" },
];

const dropdownVariants = {
  hidden: {
    height: 0,
    opacity: 1,
    transformOrigin: "top",
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeOut",
      },
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    height: 0,
    opacity: 1,
    transition: {
      height: {
        duration: 0.2,
        ease: "easeIn",
      },
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const getCurrentLocaleFromPath = (): CvLocale => {
  if (typeof window !== "undefined") {
    return window.location.pathname.startsWith("/en") ? "en" : "es";
  }
  return "es";
};

const LanguageSelector = ({ isOpen, onToggle, onClose }: LanguageSelectorProps) => {
  const { theme } = useThemeContext();
  const [currentLocale, setCurrentLocale] = useState<CvLocale>(getCurrentLocaleFromPath);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentLocale(getCurrentLocaleFromPath());
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const buttonClass = useMemo(
    () =>
      [
        "relative z-40 flex items-center justify-center gap-2 h-14 px-3 text-sm font-medium focus:outline-none",
        theme === "dark" ? "text-white" : "text-black",
      ].join(" "),
    [theme]
  );

  const changeLanguage = (locale: CvLocale) => {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    let newPath = "";

    if (locale === "en") {
      if (currentPath === "/") {
        newPath = "/en/";
      } else if (currentPath.startsWith("/en")) {
        newPath = currentPath;
      } else {
        newPath = `/en${currentPath}`;
      }
    } else {
      if (currentPath.startsWith("/en/")) {
        newPath = currentPath.replace("/en/", "/");
      } else if (currentPath === "/en") {
        newPath = "/";
      } else {
        newPath = currentPath;
      }
    }

    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;

    sessionStorage.setItem(
      "scrollPosition",
      JSON.stringify({ x: currentScrollX, y: currentScrollY })
    );

    if (newPath) {
      window.location.href = newPath;
    }
    onClose();
  };

  return (
    <div className="relative language-selector" ref={containerRef}>
      <motion.button
        type="button"
        onClick={onToggle}
        className={buttonClass}
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-label="Select language"
    >
      <MdOutlineTranslate className="w-5 h-5" />
      <span className="text-sm font-semibold uppercase tracking-wide">
        {currentLocale === "en" ? "EN" : "ES"}
      </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="language-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute right-0 top-[72px] w-56 bg-white dark:bg-gray-950 border border-black dark:border-gray-800 mobile-menu overflow-hidden z-30"
          >
            <motion.div variants={menuItemVariants} className="p-3">
              <div className="space-y-1">
                {LANGUAGE_OPTIONS.map((option) => {
                  const isActive = option.code === currentLocale;
                  return (
                    <motion.button
                      key={option.code}
                      type="button"
                      className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                        isActive
                          ? "text-black dark:text-white bg-gray-100 dark:bg-gray-800"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                      }`}
                      onClick={() => changeLanguage(option.code)}
                      whileTap={{ scale: 0.98 }}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <span className={`${option.flag} rounded-sm shadow-sm`} style={{ width: "16px", height: "11px", display: "inline-block" }} />
                      <span className="font-medium">{option.label}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
