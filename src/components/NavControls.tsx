import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../util/ThemeContext";
import "flag-icons/css/flag-icons.min.css";

interface NavControlsProps {
  className?: string;
}

const NavControls = ({ className = "" }: NavControlsProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  
  const { theme, changeTheme } = useThemeContext();
  
  // Detect current language from URL
  const getCurrentLang = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/en') ? 'en' : 'es';
    }
    return 'es';
  };
  
  const [currentLang, setCurrentLang] = useState(getCurrentLang);

  // Update language when URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentLang(getCurrentLang());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const changeLanguage = (lang: string) => {
    const currentPath = window.location.pathname;
    let newPath = '';
    
    if (lang === 'en') {
      // Going to English
      if (currentPath === '/') {
        newPath = '/en/';
      } else if (currentPath.startsWith('/en')) {
        newPath = currentPath; // Already in English
      } else {
        newPath = `/en${currentPath}`;
      }
    } else {
      // Going to Spanish
      if (currentPath.startsWith('/en/')) {
        newPath = currentPath.replace('/en/', '/');
      } else if (currentPath === '/en') {
        newPath = '/';
      } else {
        newPath = currentPath; // Already in Spanish
      }
    }
    
    window.location.href = newPath;
    setIsLangOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close language dropdown if click is outside
      if (isLangOpen && langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  // Expose state setters to parent
  useEffect(() => {
    const element = document.querySelector("[data-nav-controls]");
    if (element) {
      // @ts-ignore - we're adding custom properties
      element.setIsLangOpen = setIsLangOpen;
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
          onClick={() => setIsLangOpen(!isLangOpen)}
          className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/30 ${
            theme === 'dark' 
              ? 'hover:bg-darkbg-900/50' 
              : 'hover:bg-gray-100/50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <span className="sr-only">Change Language</span>
          
          {/* Clean flag display */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span 
                className={`fi ${currentLang === 'es' ? 'fi-es' : 'fi-us'} rounded-sm shadow-sm`}
                style={{ width: '18px', height: '13px', display: 'inline-block' }}
              />
            </div>
            
            {/* Language code - minimal */}
            <span className={`text-xs font-medium transition-colors duration-200 uppercase tracking-wider hidden sm:inline ${
              theme === 'dark' 
                ? 'text-darktext-300 group-hover:text-white' 
                : 'text-gray-600 group-hover:text-gray-900'
            }`}>
              {currentLang}
            </span>
            
            {/* Subtle chevron */}
            <motion.svg 
              className={`w-3 h-3 transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-darktext-400 group-hover:text-darktext-200' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ rotate: isLangOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </motion.button>

        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`absolute right-0 mt-3 w-32 rounded-xl shadow-2xl backdrop-blur-lg overflow-hidden border ${
                theme === 'dark' 
                  ? 'bg-darkbg-900/95 border-accent-500/20' 
                  : 'bg-white/95 border-gray-200/50'
              }`}>
              <div className="p-1">
                <motion.button
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 focus:outline-none group ${
                    currentLang === 'en' 
                      ? (theme === 'dark' 
                          ? 'text-white bg-accent-500/15 shadow-sm' 
                          : 'text-gray-900 bg-accent-500/15 shadow-sm'
                        )
                      : (theme === 'dark'
                          ? 'text-darktext-300 hover:bg-darkbg-800/60 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                        )
                  }`}
                  onClick={() => changeLanguage('en')}
                  whileHover={{ x: currentLang !== 'en' ? 1 : 0 }}
                  whileTap={{ scale: 0.98 }}>
                  <span 
                    className="fi fi-us rounded-sm shadow-sm"
                    style={{ width: '16px', height: '11px', display: 'inline-block' }}
                  />
                  <span className="font-medium">English</span>
                  {currentLang === 'en' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ml-auto w-1.5 h-1.5 bg-accent-400 rounded-full"
                    />
                  )}
                </motion.button>
                
                <motion.button
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 focus:outline-none group ${
                    currentLang === 'es' 
                      ? (theme === 'dark' 
                          ? 'text-white bg-accent-500/15 shadow-sm' 
                          : 'text-gray-900 bg-accent-500/15 shadow-sm'
                        )
                      : (theme === 'dark'
                          ? 'text-darktext-300 hover:bg-darkbg-800/60 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                        )
                  }`}
                  onClick={() => changeLanguage('es')}
                  whileHover={{ x: currentLang !== 'es' ? 1 : 0 }}
                  whileTap={{ scale: 0.98 }}>
                  <span 
                    className="fi fi-es rounded-sm shadow-sm"
                    style={{ width: '16px', height: '11px', display: 'inline-block' }}
                  />
                  <span className="font-medium">Español</span>
                  {currentLang === 'es' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ml-auto w-1.5 h-1.5 bg-accent-400 rounded-full"
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle Switch */}
      <motion.button
        onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
        className="relative w-14 h-7 rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/30 focus:ring-offset-1"
        style={{
          backgroundColor: theme === "light" ? "#f59e0b" : "#374151"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <span className="sr-only">Toggle Theme</span>
        
        {/* Sliding circle */}
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
          initial={false}
          animate={{
            x: theme === "light" ? 0 : 28
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30
          }}>
          
          {/* Sun icon */}
          <motion.svg
            className="w-3.5 h-3.5 text-amber-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={false}
            animate={{
              opacity: theme === "light" ? 1 : 0,
              rotate: theme === "light" ? 0 : 90
            }}
            transition={{ duration: 0.2 }}>
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </motion.svg>
          
          {/* Moon icon */}
          <motion.svg
            className="w-3.5 h-3.5 text-slate-600 absolute"
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={false}
            animate={{
              opacity: theme === "dark" ? 1 : 0,
              rotate: theme === "dark" ? 0 : -90
            }}
            transition={{ duration: 0.2 }}>
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </motion.svg>
        </motion.div>
      </motion.button>
    </div>
  );
};

export default NavControls;
