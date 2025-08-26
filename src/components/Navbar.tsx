import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useMediaQuery } from "../util/useMediaQuery";
import { useActiveSection } from "../util/useActiveSection";
import { useTranslations } from "../util/i18n";
import Logo from "./Logo";
import NavControls from "./NavControls";

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hidden: {
    opacity: 0,
    y: -10,
  },
};


const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const activeSection = useActiveSection();
  const { navbar: t } = useTranslations();
  
  // Get current language prefix
  const getLanguagePrefix = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/en') ? '/en' : '';
    }
    return '';
  };

  // Navigation sections with their translated labels
  const navigationSections = [
    { key: 'home', label: t.navigation.home },
    { key: 'about', label: t.navigation.about },
    { key: 'projects', label: t.navigation.projects },
    { key: 'contact', label: t.navigation.contact }
  ];

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setToggled(false);
    // Access NavControls state through a ref
    const navControlsElement = document.querySelector("[data-nav-controls]");
    if (navControlsElement) {
      // @ts-ignore - we know these properties exist
      navControlsElement.setIsLangOpen?.(false);
      // @ts-ignore - we know these properties exist
      navControlsElement.setIsThemeOpen?.(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (section: string) => activeSection === section;

  // Close mobile menu when switching to desktop view or clicking outside
  useEffect(() => {
    if (!isMobile) {
      setToggled(false);
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setToggled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navMotion}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-gray-950/95 shadow-sm border-b border-gray-200 dark:border-gray-800" : "bg-white/90 dark:bg-gray-950/90"
      } backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <motion.a 
          href={typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? '/en/' : '/'} 
          variants={itemMotion} 
          className="relative z-10 focus:outline-none">
          <Logo />
        </motion.a>

        {!isMobile && (
          <div className="flex items-center gap-12">
            <motion.div variants={itemMotion} className="flex gap-x-12 text-base font-medium text-gray-600 dark:text-gray-400">
              {navigationSections.map((section) => (
                <motion.a
                  key={section.key}
                  href={`${getLanguagePrefix()}/#${section.key}`}
                  className={`relative py-2 transition-colors duration-300 hover:text-gray-900 dark:hover:text-white focus:outline-none ${
                    isActive(section.key) ? "text-gray-900 dark:text-white" : ""
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}>
                  {isActive(section.key) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 dark:bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {section.label}
                </motion.a>
              ))}
            </motion.div>
            <motion.div variants={itemMotion}>
              <NavControls />
            </motion.div>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center gap-4">
            <motion.div variants={itemMotion}>
              <NavControls />
            </motion.div>
            <motion.button
              onClick={() => {
                if (!toggled) {
                  closeAllDropdowns();
                }
                setToggled(!toggled);
              }}
              className="relative z-50 flex flex-col justify-center items-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/70 focus:outline-none menu-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <motion.span
                animate={{
                  rotate: toggled ? 45 : 0,
                  y: toggled ? 6 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="block h-0.5 w-5 bg-current transition-transform"
              />
              <motion.span
                animate={{
                  opacity: toggled ? 0 : 1,
                  x: toggled ? 20 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="block h-0.5 w-5 bg-current my-1"
              />
              <motion.span
                animate={{
                  rotate: toggled ? -45 : 0,
                  y: toggled ? -6 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="block h-0.5 w-5 bg-current transition-transform"
              />
            </motion.button>
          </div>
        )}

        <AnimatePresence>
          {isMobile && toggled && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-4 top-16 w-48 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl mobile-menu overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {navigationSections.map((section) => (
                  <motion.a
                    key={section.key}
                    href={`${getLanguagePrefix()}/#${section.key}`}
                    onClick={() => setToggled(false)}
                    className={`flex w-full items-center px-4 py-3 text-base transition-colors duration-150 ${
                      isActive(section.key)
                        ? "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    } focus:outline-none`}
                    whileTap={{ scale: 0.95 }}>
                    {section.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
