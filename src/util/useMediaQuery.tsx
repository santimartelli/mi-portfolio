/**
 * Hook personalizado para detectar media queries en React
 *
 * Permite responder a cambios en media queries CSS (ej. tamaño de pantalla)
 * de manera reactiva. Compatible con renderizado del lado del servidor (SSR).
 */

import { useState } from 'react'

import { useIsomorphicLayoutEffect } from 'usehooks-ts'

/**
 * Opciones de configuración para el hook useMediaQuery
 */
type UseMediaQueryOptions = {
  defaultValue?: boolean // Valor por defecto cuando no se puede evaluar la query
  initializeWithValue?: boolean // Si debe evaluar la query en la inicialización
}

/**
 * Constante que detecta si el código se ejecuta en el servidor
 * Útil para prevenir errores al acceder a objetos del navegador durante SSR
 */
const IS_SERVER = typeof window === 'undefined'

/**
 * Hook que evalúa una media query CSS y retorna si coincide con el estado actual
 *
 * Escucha cambios en la media query y actualiza el estado reactivamente.
 * Compatible con SSR (Server-Side Rendering) en Astro.
 *
 * @param query - String de media query CSS (ej. '(min-width: 768px)')
 * @param options - Opciones de configuración
 * @param options.defaultValue - Valor por defecto (default: false)
 * @param options.initializeWithValue - Evaluar en inicialización (default: true)
 * @returns Boolean indicando si la media query coincide
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * if (isMobile) {
 *   return <MobileLayout />;
 * }
 */
export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  /**
   * Función auxiliar que evalúa si la media query coincide
   * Retorna el valor por defecto si está en el servidor
   */
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  /**
   * Estado que almacena si la media query coincide actualmente
   * Se inicializa evaluando la query si initializeWithValue es true
   */
  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  /**
   * Maneja el evento de cambio de la media query
   * Actualiza el estado cuando el resultado de la query cambia
   */
  function handleChange() {
    setMatches(getMatches(query))
  }

  /**
   * Efecto que se ejecuta en el cliente para escuchar cambios en la media query
   * Usa useIsomorphicLayoutEffect para compatibilidad con SSR
   */
  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Se ejecuta en la primera carga del cliente y cuando cambia la query
    handleChange()

    // Los navegadores modernos soportan addEventListener
    matchMedia.addEventListener('change', handleChange)

    // Función de limpieza: remueve el listener cuando el componente se desmonta
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}