/**
 * Hook personalizado para gestionar el tema visual de la aplicación
 *
 * Maneja el cambio entre tema claro y oscuro, persiste la preferencia
 * en localStorage y aplica las clases CSS correspondientes al documento.
 */

import { useState, useEffect } from 'react';

/**
 * Tipo que representa los temas disponibles en la aplicación
 */
export type Theme = 'light' | 'dark';

/**
 * Hook que proporciona el estado del tema y la funcionalidad para cambiarlo
 *
 * Inicializa el tema desde localStorage (o usa 'light' por defecto),
 * aplica las clases CSS necesarias al documento, y persiste los cambios.
 *
 * @returns Objeto con el tema actual y la función para cambiarlo
 * @returns theme - Tema actual ('light' | 'dark')
 * @returns changeTheme - Función para cambiar el tema
 *
 * @example
 * const { theme, changeTheme } = useTheme();
 * changeTheme('dark'); // Cambia al tema oscuro
 */
export function useTheme() {
  // Estado local del tema, inicializado con 'light'
  const [theme, setTheme] = useState<Theme>('light');

  /**
   * Aplica el tema al documento HTML agregando/removiendo clases CSS
   * y guardando la preferencia en localStorage
   *
   * @param newTheme - Tema a aplicar ('light' | 'dark')
   */
  const applyTheme = (newTheme: Theme) => {
    // Verifica si está en el navegador (no en SSR)
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // Remueve las clases de tema existentes de ambos elementos
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    // Aplica la clase del nuevo tema a ambos elementos
    root.classList.add(newTheme);
    body.classList.add(newTheme);

    // Persiste el tema en localStorage para futuras sesiones
    localStorage.setItem('theme', newTheme);
  };

  /**
   * Cambia el tema de la aplicación
   * Actualiza tanto el estado de React como las clases CSS del documento
   *
   * @param newTheme - Nuevo tema a aplicar ('light' | 'dark')
   */
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  /**
   * Efecto que se ejecuta al montar el componente
   * Recupera el tema guardado en localStorage o usa 'light' por defecto
   */
  useEffect(() => {
    // Verifica si está en el navegador (no en SSR)
    if (typeof window === 'undefined') return;

    // Recupera el tema guardado o usa 'light' como valor por defecto
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';

    // Aplica el tema inicial
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  return {
    theme, // Tema actual
    changeTheme, // Función para cambiar el tema
  };
}
