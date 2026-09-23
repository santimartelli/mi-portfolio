// Hero en dos columnas: a la izquierda el titular, el parrafo de presentacion y
// el contacto directo; a la derecha la ilustracion del perfil.
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
    // El hero ocupa el alto de la ventana y centra su contenido en el hueco que
    // queda bajo el header: 4rem de barra (h-16) mas 1px de su border-b. Asi el
    // texto y la imagen reparten el aire arriba y abajo en vez de colgar de la
    // linea del header, y el conjunto no se sale por el borde inferior.
    <section id="home" className="flex min-h-screen items-center pt-[65px] pb-20 sm:pb-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="text-center lg:col-span-6 lg:text-left">
          <h1 className="text-display font-light text-balance text-black dark:text-white">
            {t.headline}
          </h1>

          <p className="measure mx-auto mt-8 text-pretty text-lead font-light text-gray-600 lg:mx-0 dark:text-gray-400">
            {t.description}
          </p>

          {/* La accion y el contacto van juntos y centrados como un solo grupo.
              Los iconos van a 24px sobre objetivos de 48px, el minimo de area
              tactil. */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <a
              href="#experience"
              className="cta-primary flex w-fit items-center px-6 py-3 text-small font-medium uppercase tracking-widest">
              {t.cta}
            </a>

            {/* gap-3 (12px) entre cajas de 48px: como el trazo ocupa 24px, la
                separacion visible entre iconos es de 36px. */}
            <ul className="flex list-none items-center gap-3">
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
        <picture className="order-first lg:order-none lg:col-span-6">
          <source media="(max-width: 1023.98px)" srcSet="/images/hero-landscape.webp" />
          <img
            src="/images/hero-portrait.webp"
            alt={t.imageAlt}
            width="1000"
            height="1250"
            loading="eager"
            decoding="async"
            className="hero-media"
          />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
