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
 * El tema inicial ya lo fijó el script inline del layout antes del primer
 * pintado (leyendo localStorage). Este hook adopta esa decisión en lugar de
 * volver a elegirla, que era lo que provocaba el destello de tema.
 *
 * @returns Objeto con el tema actual y la función para cambiarlo
 * @returns theme - Tema actual ('light' | 'dark')
 * @returns changeTheme - Función para cambiar el tema
 *
 * @example
 * const { theme, changeTheme } = useTheme();
 * changeTheme('dark'); // Cambia al tema oscuro
 */

/** Lee el tema que el script inline ya aplicó a <html>. Oscuro si no hay clase. */
const readThemeFromDom = (): Theme => {
  if (typeof document === 'undefined') return 'dark';
  const root = document.documentElement;
  if (root.classList.contains('light')) return 'light';
  if (root.classList.contains('dark')) return 'dark';
  return 'dark';
};

export function useTheme() {
  // Estado local del tema, sincronizado con la clase ya presente en <html>
  const [theme, setTheme] = useState<Theme>(readThemeFromDom);

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
   * Efecto que se ejecuta al montar el componente.
   *
   * El script inline del layout ya aplicó la clase correcta a <html> antes del
   * primer pintado. Aquí solo sincronizamos <body> y el estado de React con esa
   * decisión: no se vuelve a leer localStorage ni se elige un tema distinto.
   */
  useEffect(() => {
    // Verifica si está en el navegador (no en SSR)
    if (typeof window === 'undefined') return;

    const current = readThemeFromDom();
    setTheme(current);
    applyTheme(current);
  }, []);

  return {
    theme, // Tema actual
    changeTheme, // Función para cambiar el tema
  };
}
