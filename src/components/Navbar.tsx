import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useActiveSection } from "../util/useActiveSection";
import { useTranslations } from "../util/i18n";
import Logo from "./Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageSelector from "./LanguageSelector";

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

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
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
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (section: string) => activeSection === section;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button") &&
        !target.closest(".language-selector")
      ) {
        setToggled(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navMotion}
      className={`fixed top-0 right-0 left-0 z-50 bg-white dark:bg-gray-950 border-b transition-colors duration-300 ${
        isScrolled ? "border-black dark:border-gray-800" : "border-transparent"
      }`}>
      <div className="w-full px-8 py-4 flex justify-between items-center">
        <motion.a 
          href={typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? '/en/' : '/'} 
          variants={itemMotion} 
          className="relative z-10 focus:outline-none">
          <Logo />
        </motion.a>

        <div className="flex items-center gap-2">
          <motion.div variants={itemMotion}>
            <ThemeToggleButton />
          </motion.div>
          <motion.div variants={itemMotion}>
            <LanguageSelector
              isOpen={isLanguageOpen}
              onToggle={() => setIsLanguageOpen((prev) => !prev)}
              onClose={() => setIsLanguageOpen(false)}
            />
          </motion.div>
          <div className="relative">
            <motion.button
              variants={itemMotion}
              onClick={() => {
                setIsLanguageOpen(false);
                setToggled((prev) => !prev);
              }}
              className="relative z-50 flex flex-col justify-center items-center w-14 h-14 text-black dark:text-white focus:outline-none menu-button">
                <motion.span
                  animate={{
                    rotate: toggled ? 45 : 0,
                    y: toggled ? 6 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="block h-0.5 w-6 bg-current"
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
                  className="block h-0.5 w-6 bg-current my-1"
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
                  className="block h-0.5 w-6 bg-current"
                />
            </motion.button>

            <AnimatePresence>
              {toggled && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-[72px] w-56 bg-white dark:bg-gray-950 border border-black dark:border-gray-800 mobile-menu overflow-hidden z-30">
                  <motion.div 
                    variants={menuItemVariants}
                    className="p-3">
                    <div className="space-y-1">
                      {navigationSections.map((section) => (
                        <motion.a
                          key={section.key}
                          href={`${getLanguagePrefix()}/#${section.key}`}
                          onClick={() => setToggled(false)}
                          className={`flex w-full items-center px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                            isActive(section.key)
                              ? "text-black dark:text-white bg-gray-100 dark:bg-gray-800"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                          }`}
                          whileTap={{ scale: 0.98 }}>
                          {section.label}
                          {isActive(section.key) && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="ml-auto w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                            />
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.nav>
  );
}
