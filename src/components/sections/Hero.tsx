// Hero en dos columnas: a la izquierda el titular, el parrafo de presentacion y
// el contacto directo; a la derecha la ilustracion del perfil.
// En movil la columna se apila y el hero se reparte el alto de la ventana entre
// sus cinco bloques (imagen, titular, texto, accion e iconos) con el mismo hueco,
// de forma que todo entra en la pantalla sin scroll.
// Sin estado, sin JavaScript y sin ninguna animacion: el hero se renderiza
// entero en el servidor.
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import type { HeroTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface HeroProps {
  content: HeroTranslations;
}

const Hero = ({ content: t }: HeroProps) => {
  // Los tres accesos de contacto directo. WhatsApp abre la aplicacion y el
  // correo el cliente de correo; LinkedIn abre en pestana nueva.
  const contactLinks = [
    { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn', external: true },
    { icon: FaWhatsapp, href: SITE.whatsapp, label: 'WhatsApp', external: true },
    { icon: FaEnvelope, href: `mailto:${SITE.email}`, label: 'Email', external: false },
  ];

  return (
    // En movil: columna que ocupa el alto de la ventana (100dvh, el alto visible
    // real, no el de la ventana grande) y reparte sus cinco bloques. El padding
    // de arriba es el header (4rem mas 1px de su border-b); el aire entre el
    // header y la imagen lo pone el margen del propio <picture>, para que se lea
    // donde esta. El padding de abajo es el margen bajo los iconos.
    // Desde lg el contenedor se queda con todo el alto que queda bajo el header:
    // la seccion deja de centrarlo y de tener padding abajo, asi que la caja del
    // contenedor va del borde inferior del header al borde inferior de la
    // pantalla. Dentro, la rejilla reparte ese alto en dos filas: la de las dos
    // columnas se lleva el espacio libre (1fr) y el marquee queda como franja al
    // pie (auto). El centrado vertical de la rejilla coloca entonces el bloque
    // de texto y el de la imagen en el medio de la primera fila, y el aire de
    // abajo lo pone el propio contenedor, no la seccion.
    // Ese aire de abajo es de 4rem y no es un numero al azar: es el que deja el
    // marquee centrado en la franja blanca que queda entre el borde inferior de
    // la ilustracion y el borde inferior de la pantalla. Con el tope de alto de
    // la ilustracion puesto (el caso normal en un portatil), el aire que sobra
    // por debajo de la imagen dentro de su fila es (145 - pb) / 2, asi que
    // igualarlo a este padding da 4rem. Para que la regla que separa del hero
    // quede tambien centrada, se mete hacia dentro de About la mitad de la
    // diferencia entre este aire y el que About reserva arriba: eso vive en
    // .section-rule-hero, en el layout. Si se cambia este padding, hay que
    // rehacer las dos cuentas.
    <section
      id="home"
      className="flex min-h-[100dvh] flex-col pt-[65px] pb-6 lg:min-h-screen lg:flex-row lg:pb-0">
      <div className="shell flex flex-1 flex-col justify-between gap-1 lg:grid lg:flex-none lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:items-center lg:gap-x-12 lg:gap-y-6 lg:pb-16">
        {/*
          En movil esta caja no genera caja propia (display: contents), asi que el
          titular, el parrafo, la accion y los iconos pasan a ser hijos directos
          del contenedor de arriba y entran en el reparto. Es la unica forma de
          que los cinco bloques reciban el mismo hueco sin duplicar el marcado.
          Los margenes verticales de cada bloque se anulan en movil por el mismo
          motivo: si sumaran, los huecos dejarian de ser iguales. Desde lg vuelve
          a ser una columna normal y recupera sus margenes.
        */}
        <div className="contents text-center lg:col-span-6 lg:block lg:text-left">
          <h1 className="text-display font-light text-balance text-black dark:text-white">
            {t.headline}
          </h1>

          {/* En movil la entradilla va a 1,5 de interlineado, que es el minimo
              comodo para texto corrido, en vez del 1,65 de la escala: con las
              nueve lineas que ocupa el parrafo son mas de 20px de alto. */}
          <p className="measure mx-auto text-pretty text-base font-light leading-normal text-gray-600 lg:mt-8 lg:text-lead lg:leading-[1.6] lg:mx-0 dark:text-gray-400">
            {t.description}
          </p>

          {/* Misma idea: en movil la accion y los iconos son dos bloques sueltos,
              y desde lg vuelven a ser una fila centrada. */}
          <div className="contents lg:mt-10 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-8">
            {/* El CTA conserva del boton portado solo el ancho minimo y el radio
                de 8px; el efecto es el de los iconos de contacto, un cambio de
                color con transicion. El tamaño grande del original dejaba el
                boton en 80px y se comia el reparto de los cinco bloques. */}
            <a
              href="#experience"
              className="cta-primary mx-auto flex w-fit min-w-[10rem] items-center justify-center px-4 py-2 text-small font-semibold uppercase tracking-widest lg:mx-0">
              {t.cta}
            </a>

            {/* gap-3 (12px) entre cajas de 48px: como el trazo ocupa 24px, la
                separacion visible entre iconos es de 36px. */}
            <ul className="flex list-none items-center justify-center gap-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                    aria-label={link.label}
                    className="flex h-12 w-12 items-center justify-center text-gray-600 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white">
                    <link.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ilustracion del perfil. Hay dos recortes de la misma escena y el
            navegador elige uno: el apaisado en pantallas estrechas y el vertical
            desde lg, donde tiene columna propia. Va en un <picture> para que
            solo se descargue el que se usa, no los dos.
            El tamaño de cada recorte lo fija la clase .hero-media del layout, no
            utilidades de Tailwind: ahi el tope de alto y la proporcion por
            breakpoint conviven en el orden correcto, que con utilidades no
            ocurria. En movil ocupa el ancho completo, y al ser apaisada eso la
            deja ancha y baja a la vez, que es lo que permite ver el titular y el
            texto en el mismo viewport.
            En movil va primero, antes del titular: la columna se apila y el
            order del <picture> la sube. En el marcado sigue despues del texto a
            proposito, para que quien use lector de pantalla reciba el titular
            antes que la ilustracion; desde lg el order se resetea. */}
        <picture className="order-first mt-6 lg:order-none lg:col-span-6 lg:mt-0">
          <source media="(max-width: 1023.98px)" srcSet="/images/hero-landscape.webp" />
          <img
            src="/images/hero-portrait.webp"
            alt={t.imageAlt}
            width="1000"
            height="1102"
            loading="eager"
            decoding="async"
            className="hero-media"
          />
        </picture>

        {/* Marquee de caracteristicas, al pie del hero. Son dos copias identicas
            de la lista dentro de una pista que se desplaza la mitad de su ancho,
            asi que el bucle no tiene costura; la segunda copia va con aria-hidden
            para que quien use lector de pantalla no oiga la lista dos veces, y los
            puntos que separan las piezas son decorativos por el mismo motivo.
            En movil es el ultimo bloque del reparto; desde lg ocupa una fila
            propia a lo ancho, pegada al pie del contenedor, debajo de las dos
            columnas. */}
        <div className="marquee lg:col-span-12">
          <div className="marquee-track">
            {[false, true].map((duplicada) => (
              <ul
                key={String(duplicada)}
                className="flex list-none items-center"
                {...(duplicada ? { 'aria-hidden': true } : {})}>
                {t.marquee.map((item) => (
                  <li
                    key={item}
                    className="flex shrink-0 items-center whitespace-nowrap text-small font-light text-gray-600 dark:text-gray-400">
                    {item}
                    <span aria-hidden="true" className="px-4 text-gray-300 dark:text-gray-600">
                      ·
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
