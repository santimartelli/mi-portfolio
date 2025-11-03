/**
 * Hook personalizado para detectar la sección activa durante el scroll
 *
 * Utiliza IntersectionObserver y un listener de scroll para determinar
 * qué sección del portfolio está visible en el viewport. Esto permite
 * resaltar el enlace correspondiente en la barra de navegación.
 */

import { useState, useEffect } from "react";

/**
 * Hook que detecta y retorna la sección activa basándose en el scroll del usuario
 *
 * Combina dos estrategias para mayor precisión:
 * 1. IntersectionObserver: Detecta cuando una sección entra en el viewport
 * 2. Scroll Listener: Calcula qué sección es más visible como respaldo
 *
 * @returns ID de la sección actualmente visible ('home' | 'about' | 'projects' | 'skills' | 'contact')
 *
 * @example
 * const activeSection = useActiveSection();
 * console.log(activeSection); // 'about'
 */
export function useActiveSection() {
  // Estado para almacenar la sección activa (por defecto 'home')
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    // Lista de IDs de todas las secciones a observar
    const sections = ["home", "about", "projects", "skills", "contact"];

    // Configuración del IntersectionObserver
    const observerOptions = {
      root: null, // Usa el viewport como referencia
      rootMargin: "-20% 0px -70% 0px", // Ajusta el área de detección: sección activa cuando está en el 20-30% superior
      threshold: 0.1, // Se activa cuando al menos el 10% de la sección es visible
    };

    /**
     * Callback ejecutado cuando una sección entra o sale del área de observación
     * Actualiza la sección activa cuando una sección se vuelve visible
     */
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Crea el observador con las opciones configuradas
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Registra todas las secciones para que sean observadas
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    /**
     * Listener de scroll como sistema de respaldo
     * Calcula manualmente qué sección tiene mayor visibilidad en el viewport
     */
    const onScroll = () => {
      // Variables para rastrear la sección más visible
      let maxVisibleSection = "";
      let maxVisiblePercentage = 0;

      // Itera sobre cada sección para calcular su visibilidad
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calcula cuánto de la sección está visible en el viewport
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / rect.height;

        // Actualiza la sección más visible si este porcentaje es mayor
        if (visiblePercentage > maxVisiblePercentage) {
          maxVisiblePercentage = visiblePercentage;
          maxVisibleSection = section;
        }
      });

      // Actualiza la sección activa solo si está visible más del 20%
      if (maxVisibleSection && maxVisiblePercentage > 0.2) {
        setActiveSection(maxVisibleSection);
      }
    };

    // Registra el listener de scroll con la opción passive para mejor rendimiento
    window.addEventListener("scroll", onScroll, { passive: true });

    // Función de limpieza: se ejecuta cuando el componente se desmonta
    return () => {
      // Desregistra todas las secciones del observador
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
      // Remueve el listener de scroll
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return activeSection;
}
