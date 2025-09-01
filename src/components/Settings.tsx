import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../util/ThemeContext";
import "flag-icons/css/flag-icons.min.css";

interface SettingsProps {
  className?: string;
}

const Settings = ({ className = "" }: SettingsProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  
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
    
    // Store current scroll position before navigation
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    
    // Store scroll position in sessionStorage to survive page refresh
    sessionStorage.setItem('scrollPosition', JSON.stringify({
      x: currentScrollX,
      y: currentScrollY
    }));
    
    // Navigate to new path
    window.location.href = newPath;
    setIsSettingsOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close settings dropdown if click is outside
      if (isSettingsOpen && settingsRef.current && !settingsRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSettingsOpen]);

  // Expose state setters to parent
  useEffect(() => {
    const element = document.querySelector("[data-settings]");
    if (element) {
      // @ts-ignore - we're adding custom properties
      element.setIsSettingsOpen = setIsSettingsOpen;
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
    <div className={`relative ${className}`} data-settings ref={settingsRef}>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 transition-colors duration-200 focus:outline-none ${
          theme === 'dark' 
            ? 'hover:bg-gray-800 text-white' 
            : 'hover:bg-gray-100 text-black'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <span className="sr-only">Settings</span>
        
        {/* Settings Icon */}
        <motion.svg 
          className="w-7 h-7 transition-colors duration-200"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={1.5}
          animate={{ rotate: isSettingsOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </motion.svg>
        
      </motion.button>

      {/* Settings Dropdown */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute right-0 top-16 w-56 overflow-hidden border ${
              theme === 'dark' 
                ? 'bg-gray-950 border-gray-700' 
                : 'bg-white border-black'
            }`}>
            
            {/* Theme Section */}
            <div className="p-3 border-b border-black dark:border-gray-700">
              <div className={`flex items-center justify-between ${
                theme === 'dark' ? 'text-darktext-200' : 'text-gray-700'
              }`}>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="text-sm font-medium">Theme</span>
                </div>
                
                {/* Theme Toggle Switch */}
                <motion.button
                  onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
                  className="relative w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400/30"
                  style={{
                    backgroundColor: theme === "light" ? "#f59e0b" : "#374151"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  
                  {/* Sliding circle */}
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                    initial={false}
                    animate={{
                      x: theme === "light" ? 0 : 24
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 30
                    }}>
                    
                    {/* Sun icon */}
                    <motion.svg
                      className="w-3 h-3 text-amber-500"
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
                      className="w-3 h-3 text-slate-600 absolute"
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
            </div>

            {/* Language Section */}
            <div className="p-3">
              <div className={`flex items-center gap-3 mb-3 ${
                theme === 'dark' ? 'text-darktext-200' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-sm font-medium">Language</span>
              </div>
              
              <div className="space-y-1">
                <motion.button
                  className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none group ${
                    currentLang === 'en' 
                      ? (theme === 'dark' 
                          ? 'text-white bg-gray-800' 
                          : 'text-black bg-gray-100'
                        )
                      : (theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                      className="ml-auto w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                    />
                  )}
                </motion.button>
                
                <motion.button
                  className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none group ${
                    currentLang === 'es' 
                      ? (theme === 'dark' 
                          ? 'text-white bg-gray-800' 
                          : 'text-black bg-gray-100'
                        )
                      : (theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                      className="ml-auto w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;