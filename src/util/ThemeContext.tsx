/**
 * Contexto de React para el manejo global del tema (claro/oscuro)
 *
 * Proporciona un contexto compartido que permite a cualquier componente
 * acceder y modificar el tema actual de la aplicación.
 */

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useTheme } from './useTheme';
import type { Theme } from './useTheme';

/**
 * Tipo de dato para el contexto del tema
 * Define la estructura del valor compartido en el contexto
 */
interface ThemeContextType {
  theme: Theme; // Tema actual ('light' o 'dark')
  changeTheme: (theme: Theme) => void; // Función para cambiar el tema
}

/**
 * Contexto de React para compartir el estado del tema
 * Inicializado como undefined para detectar uso fuera del Provider
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Componente Provider que envuelve la aplicación y proporciona el tema global
 *
 * Utiliza el hook useTheme para manejar la lógica del tema (localStorage, cambios, etc.)
 * y expone el tema actual y la función de cambio a todos los componentes hijos.
 *
 * @param children - Componentes hijos que tendrán acceso al contexto del tema
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeData = useTheme();

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook personalizado para acceder al contexto del tema
 *
 * Proporciona acceso al tema actual y a la función para cambiarlo.
 * Debe ser usado dentro de un componente hijo de ThemeProvider.
 *
 * @returns Objeto con el tema actual y la función changeTheme
 * @throws Error si se usa fuera de un ThemeProvider
 *
 * @example
 * const { theme, changeTheme } = useThemeContext();
 * console.log(theme); // 'light' o 'dark'
 * changeTheme('dark'); // Cambia al tema oscuro
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}