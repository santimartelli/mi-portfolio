import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../util/ThemeContext";

interface NavControlsProps {
  className?: string;
}

const NavControls = ({ className = "" }: NavControlsProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  
  const { theme, changeTheme } = useThemeContext();
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
          {theme === "light" ? (
            <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
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
                  className={`flex w-full items-center px-4 py-2 text-sm hover:bg-darkbg-900/70 focus:outline-none transition-colors duration-150 ${
                    theme === "light" ? "text-accent-400 hover:text-accent-400" : "text-darktext-300 hover:text-white"
                  }`}
                  onClick={() => {
                    changeTheme("light");
                    setIsThemeOpen(false);
                  }}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                  Light
                </button>
                <button
                  className={`flex w-full items-center px-4 py-2 text-sm hover:bg-darkbg-900/70 focus:outline-none transition-colors duration-150 ${
                    theme === "dark" ? "text-accent-400 hover:text-accent-400" : "text-darktext-300 hover:text-white"
                  }`}
                  onClick={() => {
                    changeTheme("dark");
                    setIsThemeOpen(false);
                  }}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                  Dark
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
