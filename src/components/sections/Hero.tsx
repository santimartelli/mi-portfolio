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
    <section id="home" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <h1 className="text-display font-light text-balance text-black dark:text-white">
            {t.headline}
          </h1>

          <p className="measure mt-6 text-pretty text-lead font-light text-gray-600 dark:text-gray-400">
            {t.description}
          </p>

          <ul className="mt-10 flex list-none items-center gap-1">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white">
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ilustracion del perfil. Se declaran sus dimensiones reales para que
            el navegador reserve el espacio y no haya salto de layout. Va en
            eager y sin lazy porque esta en el primer viewport. El texto se
            centra en vertical contra ella, porque el retrato es bastante mas
            alto que el discurso. En movil baja debajo del texto. */}
        <img
          src="/images/hero-portrait.webp"
          alt={t.imageAlt}
          width="1000"
          height="1250"
          loading="eager"
          decoding="async"
          className="h-auto w-full lg:col-span-6"
        />
      </div>
    </section>
  );
};

export default Hero;
