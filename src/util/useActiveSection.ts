/**
 * Hook que devuelve la seccion activa mientras se hace scroll.
 *
 * **Decide por posicion en la pantalla, no por proporciones de la seccion.** La
 * version anterior tenia dos mecanismos y los dos filtraban por porcentaje:
 * exigia que mas del 20% de la seccion estuviera visible en el listener de scroll
 * y, ademas, un IntersectionObserver sobre una banda del 20%-30% de la pantalla
 * con `threshold: 0.1` (el 10% de la seccion dentro de esa banda). Con eso, una
 * seccion mas alta que cinco veces la pantalla **no podia quedar activa nunca**:
 * en movil Experiencia mide 5284px con una pantalla de 844, su maximo visible es
 * el 14% —no llega al 20% del respaldo— y en la banda del observer solo caben
 * 84px, el 1,6%, que tampoco llega al 10%. El usuario lo reporto («al pulsar
 * Experiencia el item no se queda seleccionado») y se reprodujo: al hacer clic el
 * `hash` cambiaba a `#experience` y la pagina se desplazaba bien, pero el
 * resaltado se quedaba en el item anterior. Skills estaba en el 26%, a un paso de
 * fallar lo mismo en un telefono mas bajo.
 *
 * Ahora la regla es la de cualquier indice: **activa la ultima seccion cuyo borde
 * superior ya ha pasado una linea fija**, el 25% del alto de la ventana. No
 * depende de lo larga que sea la seccion, asi que el fallo no puede repetirse.
 *
 * El calculo va dentro de un `requestAnimationFrame` para no trabajar en cada
 * evento de scroll, y se rehace al cambiar el tamano de la ventana, al cambiar el
 * hash (los enlaces del menu y los del pie) y cuando cambia el alto del documento:
 * los filtros de Experiencia, una imagen que carga o una fuente que entra mueven
 * las secciones sin que haya scroll, y con solo escuchar el scroll el resaltado se
 * quedaria desfasado.
 */

import { useEffect, useState } from "react";

/** Las secciones que se resaltan, en el orden en que aparecen en la pagina. */
const SECCIONES = ["home", "about", "experience", "skills", "projects", "contact"] as const;

/** La linea de activacion: 25% del alto de la ventana, medida desde arriba. */
const LINEA = 0.25;

/**
 * Devuelve el id de la seccion activa ('home' | 'about' | 'experience' |
 * 'skills' | 'projects' | 'contact').
 *
 * @example
 * const activeSection = useActiveSection();
 * console.log(activeSection); // 'about'
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(SECCIONES[0]);

  useEffect(() => {
    let frame = 0;

    const medir = () => {
      frame = 0;
      const linea = window.innerHeight * LINEA;
      let activa: string = SECCIONES[0];

      // Se recorren en orden de pagina, asi que gana la ultima cuyo borde superior
      // ya ha cruzado la linea.
      for (const id of SECCIONES) {
        const seccion = document.getElementById(id);
        if (seccion && seccion.getBoundingClientRect().top <= linea) activa = id;
      }

      // Solo cambia el estado cuando cambia de verdad: evita renders por frame.
      setActiveSection((anterior) => (anterior === activa ? anterior : activa));
    };

    const pedirMedida = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", pedirMedida, { passive: true });
    window.addEventListener("resize", pedirMedida);
    window.addEventListener("hashchange", pedirMedida);

    // El alto del documento tambien cambia sin scroll: filtros, imagenes, fuentes.
    const observador = new ResizeObserver(pedirMedida);
    observador.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", pedirMedida);
      window.removeEventListener("resize", pedirMedida);
      window.removeEventListener("hashchange", pedirMedida);
      observador.disconnect();
    };
  }, []);

  return activeSection;
}
