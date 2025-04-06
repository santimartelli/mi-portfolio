import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavControlsProps {
  className?: string;
}

const NavControls = ({ className = "" }: NavControlsProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  // These will be implemented later with context/state management
  const currentTheme = "dark";
  const currentLang = "es";

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close language dropdown if click is outside
      if (isLangOpen && langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
      }

      // Close theme dropdown if click is outside
      if (isThemeOpen && themeRef.current && !themeRef.current.contains(target)) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen, isThemeOpen]);

  // Expose state setters to parent
  useEffect(() => {
    const element = document.querySelector("[data-nav-controls]");
    if (element) {
      // @ts-ignore - we're adding custom properties
      element.setIsLangOpen = setIsLangOpen;
      // @ts-ignore - we're adding custom properties
      element.setIsThemeOpen = setIsThemeOpen;
    }
  }, []);

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

  return (
    <div className={`flex items-center gap-4 ${className}`} data-nav-controls>
      {/* Language Toggle */}
      <div className="relative" ref={langRef}>
        <motion.button
          onClick={() => {
            setIsLangOpen(!isLangOpen);
            setIsThemeOpen(false);
          }}
          className="p-2 text-darktext-300 hover:text-white rounded-lg hover:bg-darkbg-900/50 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <span className="sr-only">Change Language</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.button>

        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-2 w-32 rounded-lg bg-darkbg-900 border border-accent-500/20 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-b from-darkbg-900 to-darkbg-950 divide-y divide-accent-500/10">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-darktext-300 hover:bg-darkbg-900/70 hover:text-white focus:outline-none transition-colors duration-150"
                  onClick={() => setIsLangOpen(false)}>
                  English
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-darktext-300 hover:bg-darkbg-900/70 hover:text-white focus:outline-none transition-colors duration-150"
                  onClick={() => setIsLangOpen(false)}>
                  Español
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle */}
      <div className="relative" ref={themeRef}>
        <motion.button
          onClick={() => {
            setIsThemeOpen(!isThemeOpen);
            setIsLangOpen(false);
          }}
          className="p-2 text-darktext-300 hover:text-white rounded-lg hover:bg-darkbg-900/50 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <span className="sr-only">Change Theme</span>
          {currentTheme === "dark" ? (
            <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
          )}
        </motion.button>

        <AnimatePresence>
          {isThemeOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-2 w-32 rounded-lg bg-darkbg-900 border border-accent-500/20 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-b from-darkbg-900 to-darkbg-950 divide-y divide-accent-500/10">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-darktext-300 hover:bg-darkbg-900/70 hover:text-white focus:outline-none transition-colors duration-150"
                  onClick={() => setIsThemeOpen(false)}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    />
                  </svg>
                  Light
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-accent-400 hover:bg-darkbg-900/70 hover:text-accent-400 focus:outline-none transition-colors duration-150"
                  onClick={() => setIsThemeOpen(false)}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  Dark
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-darktext-300 hover:bg-darkbg-900/70 hover:text-white focus:outline-none transition-colors duration-150"
                  onClick={() => setIsThemeOpen(false)}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h12a2 2 0 012 2v1H4V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 13a2 2 0 012-2h12a2 2 0 012 2v1H4v-1z"
                    />
                  </svg>
                  System
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavControls;
