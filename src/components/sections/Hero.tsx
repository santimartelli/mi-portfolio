// Hero en una columna centrada: el titular, la entradilla, las dos acciones, el
// contacto y la ilustracion, todos en el mismo eje y con el texto centrado. La
// idea es la de las paginas de una sola declaracion —tipo pavlosanchez.com—:
// mucho aire, la frase grande en el centro y nada compitiendo con ella; el
// contenido y los materiales son los de siempre.
//
// El bloque se centra en el alto que queda bajo el header (`flex-1` +
// `justify-center`), y el marquee sigue siendo la franja del pie. La seccion
// reserva abajo lo mismo que antes (1,5rem en movil y 4rem desde lg, en el
// `pb` de la seccion y el `lg:pb-16` del contenedor), asi que la regla que la
// separa de About sigue centrada sin tocar `.section-rule-hero`.
//
// Sin estado, sin JavaScript y sin ninguna animacion: el hero se renderiza
// entero en el servidor. El aire de arriba son 4rem exactos: la barra ya no
// lleva filete inferior, asi que su alto es el del header y no el header mas 1px.
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
    <section id="home" className="flex min-h-[100dvh] flex-col pt-16 pb-6 lg:min-h-screen lg:pb-0">
      <div className="shell flex flex-1 flex-col lg:pb-16">
        {/* El contenido, en una columna y centrado. `flex-1` reparte el alto que
            queda bajo el header y `justify-center` lo pone en el medio, que es lo
            que deja los margenes de arriba y abajo iguales. */}
        <div className="flex flex-1 flex-col items-center justify-center gap-7 py-8 text-center lg:gap-8 lg:py-10">
          <h1 className="text-display max-w-[22ch] text-balance font-light text-black dark:text-white">
            {t.headline}
          </h1>

          {/* En movil la entradilla va a 1,5 de interlineado, que es el minimo
              comodo para texto corrido, en vez del 1,65 de la escala. */}
          <p className="measure text-pretty text-base font-light leading-normal text-gray-600 lg:text-lead lg:leading-[1.6] dark:text-gray-400">
            {t.description}
          </p>

          {/* Las acciones y el contacto, en un solo grupo: son la misma cosa —lo
              que se puede pulsar— y van juntas, separadas del texto por el aire
              grande de la columna. */}
          <div className="flex flex-col items-center gap-5">
            {/* Las dos acciones comparten bloque, una con relleno y otra solo con
                el filete de 1px, que es la forma de declarar profundidad de este
                mundo. Aqui caben las dos en todos los tamanos. */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
              <a
                href="#experience"
                className="cta-primary flex min-w-[10rem] items-center justify-center px-4 py-2 text-small font-semibold uppercase tracking-widest">
                {t.cta}
              </a>

              <a
                href="#projects"
                className="cta-secondary flex min-w-[10rem] items-center justify-center px-4 py-2 text-small font-semibold uppercase tracking-widest">
                {t.ctaProjects}
              </a>
            </div>

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

          {/* La ilustracion, centrada y sola, con el recorte apaisado en todos los
              tamanos: en una composicion centrada una banda ancha lee mejor que un
              retrato suelto. El tamano lo fija `.hero-media` en el layout, que es
              donde el tope de alto y la proporcion por breakpoint conviven en el
              orden correcto. */}
          <img
            src="/images/hero-landscape.webp"
            alt={t.imageAlt}
            width="1400"
            height="611"
            loading="eager"
            decoding="async"
            className="hero-media"
          />
        </div>

        {/* Marquee de caracteristicas, al pie del hero. Son dos copias identicas
            de la lista dentro de una pista que se desplaza la mitad de su ancho,
            asi que el bucle no tiene costura; la segunda copia va con aria-hidden
            para que quien use lector de pantalla no oiga la lista dos veces, y los
            puntos que separan las piezas son decorativos por el mismo motivo. */}
        <div className="marquee">
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
