// Hero: **dos columnas desde lg** —el texto a la izquierda y la ilustracion a la
// derecha— y una sola columna apilada por debajo, con la misma imagen 4:3 en los
// dos casos. Al pie, los iconos de contacto, en el sitio que ocupaba el marquee.
//
// Esta es la forma que el usuario pidio recuperar: el hero de dos columnas de
// siempre, pero con **la ilustracion de movil** en la columna de la derecha, en
// vez del recorte apaisado que ocupaba el ancho completo. Asi hay un solo archivo
// de imagen para todos los tamanos (`hero-hotel-ops.webp`, 4:3) y un solo
// `<img>`, sin `<picture>` ni `<source>`.
//
// El titular, la entradilla y los dos CTA van en la columna izquierda: centrados
// por debajo de lg —donde la columna es la pantalla entera— y alineados a la
// izquierda desde lg, que es como se lee una columna. El envoltorio de las dos
// columnas se lleva el alto que queda por encima de la fila de iconos (`flex-1`)
// y lo centra (`justify-center` en movil, `content-center` en la rejilla), asi
// que el aire de arriba y el de abajo salen iguales. El aire de abajo del hero es
// el de siempre (1,5rem en movil y 4rem desde lg, en el `lg:pb-16` del
// contenedor), que es lo que mantiene centrada la regla que separa del hero (ver
// `.section-rule-hero`); el `pt` son 4rem exactos porque la barra no tiene filete
// inferior.
//
// El orden del marcado es el del lector de pantalla —titular primero, ilustracion
// despues— y el `order-first` de la imagen la sube por encima del titular en la
// version apilada; desde lg el `lg:order-none` la devuelve a su columna, la
// derecha. La proporcion y el tope de alto de la imagen viven en `.hero-media`,
// en el layout.
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import type { HeroTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface HeroProps {
  content: HeroTranslations;
}

/** Los dos CTA: texto subrayado suavemente, **sin caja**. Es el mismo enlace que
 *  llevan los casos de estudio y la seccion de contacto. */
const ctaClass =
  'inline-flex text-label font-medium uppercase text-black underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:decoration-gray-500 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-400';

const Hero = ({ content: t }: HeroProps) => {
  // Los cuatro accesos de contacto, en el mismo orden que la seccion de contacto.
  // El correo abre el cliente de correo y WhatsApp la aplicacion; LinkedIn y GitHub
  // abren en pestana nueva. Son iconos sin texto, asi que el nombre accesible lo
  // pone el aria-label.
  const contactLinks = [
    { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn', external: true },
    { icon: FaEnvelope, href: `mailto:${SITE.email}`, label: 'Email', external: false },
    { icon: FaWhatsapp, href: SITE.whatsapp, label: 'WhatsApp', external: true },
    { icon: FaGithub, href: SITE.github, label: 'GitHub', external: true },
  ];

  // `svh` y no `dvh`: **el alto del hero no puede cambiar con el scroll**. En
  // movil, `100dvh` es el alto de la ventana *dinamico*, asi que crece cuando la
  // barra del navegador se esconde al bajar: el hero se estiraba, el reparto de
  // `justify-between` se rehacia y los espacios cambiaban a mitad de scroll. El
  // usuario lo reporto tal cual. `100svh` es el alto pequeño —el de la ventana con
  // la barra visible, que es lo que se ve al cargar— y no se mueve. En escritorio
  // `min-h-screen` (100vh) ya era estable y sigue igual, que es lo que esta
  // bloqueado.
  return (
    <section id="home" className="flex min-h-[100svh] flex-col pt-16 pb-6 lg:min-h-screen lg:pb-0">
      <div className="shell flex flex-1 flex-col lg:pb-16">
        {/* El envoltorio del hero. Por debajo de lg es una columna apilada que
            **reparte el aire entre sus tres piezas** con `justify-between`: la
            ilustracion arriba, los CTA abajo y **el titular con la entradilla como
            una sola pieza** en medio, que es lo que pidio el usuario. Y el `py-6`
            deja **1,5rem de blanco** por debajo del header y por encima de los
            iconos, para que las piezas no toquen los bordes.

            Para que el titular y la entradilla viajen juntos pero el bloque de los
            CTA siga siendo una pieza aparte del reparto, la columna del texto se
            disuelve en movil con `contents`: entonces el envoltorio ve tres items
            —la imagen, el grupo del titular y la entradilla, y los CTA—, mientras
            que desde lg la columna vuelve a ser una caja (`lg:flex lg:flex-col`)
            con las tres cosas dentro, en la primera de las dos columnas de la
            rejilla, y el reparto vuelve a ser el simetrico que esta bloqueado
            (`content-center`, con `lg:py-0` para que el `py-6` no mueva nada).

            El `gap-6` es el suelo: el reparto se lleva el sobrante, pero en una
            pantalla baja, donde no sobra nada, las tres piezas se quedan a 24px
            como minimo.

            **El blanco de abajo es mayor que el de arriba** (2,25rem frente a
            1,5rem) porque el usuario quiso **subir un poco los CTA**: el sobrante
            se reparte, asi que el aire que se le da abajo sale mitad de ese blanco
            y mitad del hueco de la ilustracion al titular, que se acorta otros 6px.
            Desde lg los dos se anulan con `lg:py-0`. */}
        <div className="flex flex-1 flex-col items-center justify-between gap-6 pt-6 pb-9 text-center lg:grid lg:grid-cols-2 lg:content-center lg:items-center lg:gap-x-16 lg:gap-y-0 lg:py-0 lg:text-left">
          {/* La columna del texto: en movil no es una caja, sino dos piezas sueltas
              del envoltorio (el grupo del titular y la entradilla, y los CTA); desde
              lg es la columna de la izquierda. */}
          <div className="contents lg:flex lg:flex-col lg:items-start lg:gap-8">
            {/* **El titular y la entradilla, una sola pieza**: es la unidad que
                reparte el espacio en movil, asi que van juntos en su propia caja y
                con su propio hueco: **16px en movil** —el usuario lo quiso un poco
                mas corto que los 24px del resto de huecos del hero— y 32 desde lg,
                que es el paso que tiene bloqueado el escritorio. */}
            <div className="flex flex-col items-center gap-4 lg:items-start lg:gap-8">
              {/* La entradilla va a `max-w-4xl` (896px) en vez del `.measure` de
                  64ch, a peticion del usuario, que la queria mas ancha; en la
                  columna, que mide la mitad, el tope no llega a entrar y manda el
                  ancho de la columna. El interlineado baja a 1,5 en movil, que es
                  el minimo comodo para texto corrido.
                  **El paso de letra cambia por breakpoint**: en la version apilada
                  va en `base` (16px), **el mismo cuerpo que el texto de las
                  tarjetas**, y desde lg en `lead` (18px). El titular sale del token
                  `--text-display` (24px en un telefono de 390), y en la media query
                  de menos de 1024px las entradillas de las secciones usan el mismo
                  cuerpo que esta, para que todo el texto corrido del sitio mida
                  igual en movil. */}
              <h1 className="text-display text-balance font-light text-black dark:text-white">
                {t.headline}
              </h1>

              <p className="max-w-4xl text-pretty text-base font-light leading-normal text-gray-600 lg:text-lead lg:leading-[1.6] dark:text-gray-400">
                {t.description}
              </p>
            </div>

            {/* Los dos CTA, debajo del texto: enlaces subrayados, no botones, y una
                pieza mas del reparto en movil.
                El `mt-6` es el truco para **acercar la ilustracion al titular**: el
                reparto de `justify-between` da lo mismo a los dos huecos, asi que
                pedir 1,5rem de aire extra sobre los CTA sale mitad del hueco de
                arriba (imagen-titular, que es el que el usuario queria mas corto) y
                mitad del de abajo. Desde lg se anula: ahi el hueco lo pone el
                `gap-8` de la columna. */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:mt-0 lg:justify-start">
              <a href="#experience" className={ctaClass}>
                {t.cta}
              </a>
              <a href="#projects" className={ctaClass}>
                {t.ctaProjects}
              </a>
            </div>
          </div>

          {/* La ilustracion: **el mismo recorte 4:3 que en movil**, en la columna
              de la derecha desde lg. El tamano lo fija `.hero-media`, en el
              layout. En el marcado va despues del texto —el titular se lee
              antes— y el `order-first` la sube en la version apilada. */}
          <picture className="order-first lg:order-none">
            <img
              src="/images/hero-hotel-ops.webp"
              alt={t.imageAlt}
              width="1200"
              height="900"
              loading="eager"
              decoding="async"
              className="hero-media"
            />
          </picture>
        </div>

        {/* Los accesos de contacto, **en el sitio que ocupaba el marquee**: los
            cuatro canales del sitio, cada uno en una caja de 48px (el objetivo
            tactil que usa todo el sitio) con el icono de 20 en la version apilada
            y de 24 desde lg, que es el mismo paso que usa el pie. El usuario
            pidio los iconos mas pequeños en movil: lo que baja es el dibujo, no la
            caja, asi que el objetivo tactil no cambia. El mismo hover que los
            enlaces de la barra, y sin texto: el nombre accesible lo pone el
            aria-label. */}
        <ul className="flex list-none items-center justify-center gap-3">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                aria-label={link.label}
                className="flex h-12 w-12 items-center justify-center text-gray-600 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white">
                <link.icon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
