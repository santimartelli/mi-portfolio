import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  // Función para aplicar el tema al documento
  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;
    
    // Remover clases existentes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Aplicar el tema
    root.classList.add(newTheme);
    body.classList.add(newTheme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Función para cambiar el tema
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Inicializar el tema al cargar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Obtener tema guardado o usar 'dark' por defecto
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  return {
    theme,
    changeTheme,
  };
}
