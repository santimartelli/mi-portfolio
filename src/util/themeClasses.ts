export const themeClasses = {
  // Backgrounds
  bg: {
    primary: "bg-darkbg-950 dark:bg-darkbg-950 light:bg-white",
    secondary: "bg-darkbg-900 dark:bg-darkbg-900 light:bg-gray-50",
    tertiary: "bg-darkbg-800 dark:bg-darkbg-800 light:bg-gray-100",
  },
  
  // Text colors
  text: {
    primary: "text-darktext-300 dark:text-darktext-300 light:text-gray-900",
    secondary: "text-darktext-400 dark:text-darktext-400 light:text-gray-600",
    white: "text-white dark:text-white light:text-gray-900",
    accent: "text-accent-400 dark:text-accent-400 light:text-emerald-600",
  },
  
  // Borders
  border: {
    primary: "border-accent-500/30 dark:border-accent-500/30 light:border-emerald-500/30",
    secondary: "border-accent-500/20 dark:border-accent-500/20 light:border-emerald-500/20",
    tertiary: "border-accent-500/10 dark:border-accent-500/10 light:border-emerald-500/10",
  },
  
  // Hover states
  hover: {
    bg: "hover:bg-darkbg-900/70 dark:hover:bg-darkbg-900/70 light:hover:bg-gray-100/70",
    text: "hover:text-white dark:hover:text-white light:hover:text-gray-900",
    textAccent: "hover:text-accent-400 dark:hover:text-accent-400 light:hover:text-emerald-600",
  },
};

// Helper function to combine theme classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}