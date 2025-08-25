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

const mobileMenuMotion = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled ? "bg-darkbg-950/90 shadow-lg" : "bg-darkbg-950/70"
      } border-b border-accent-500/30`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.a 
          href={typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? '/en/' : '/'} 
          variants={itemMotion} 
          className="relative z-10 focus:outline-none">
          <Logo />
        </motion.a>

        {!isMobile && (
          <div className="flex items-center gap-8">
            <motion.div variants={itemMotion} className="flex gap-x-8 text-sm lg:text-base text-darktext-300">
              {navigationSections.map((section) => (
                <motion.a
                  key={section.key}
                  href={`${getLanguagePrefix()}/#${section.key}`}
                  className={`relative py-1 transition-colors duration-300 hover:text-white focus:outline-none ${
                    isActive(section.key) ? "text-white" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {isActive(section.key) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-accent-400 to-accent-500"
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
              className="relative z-50 flex flex-col justify-center items-center p-2 text-darktext-300 hover:text-white rounded-lg hover:bg-darkbg-900/70 focus:outline-none menu-button"
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
              className="absolute right-4 top-16 w-48 rounded-lg bg-darkbg-900 border border-accent-500/20 shadow-lg mobile-menu overflow-hidden">
              <div className="bg-gradient-to-b from-darkbg-900 to-darkbg-950 divide-y divide-accent-500/10">
                {navigationSections.map((section, index) => (
                  <motion.a
                    key={section.key}
                    href={`${getLanguagePrefix()}/#${section.key}`}
                    onClick={() => setToggled(false)}
                    className={`flex w-full items-center px-4 py-2 text-sm transition-colors duration-150 ${
                      isActive(section.key)
                        ? "text-white bg-darkbg-900/80"
                        : "text-darktext-300 hover:bg-darkbg-900/50 hover:text-white"
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
