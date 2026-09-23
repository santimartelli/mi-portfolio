// Hero en dos columnas. A la izquierda el discurso: antetitulo, titular, los
// dos parrafos de presentacion, la experiencia practica y las dos acciones, con
// la disponibilidad y el contacto cerrando la columna. A la derecha, un panel
// con el enfoque en vertical.
// Sin estado y sin JavaScript: el unico movimiento es el latido del punto de
// estado, que es CSS y no necesita hidratacion, asi que el hero se renderiza
// entero en el servidor.
import { FaArrowRight, FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
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
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <p className="text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
            {t.kicker}
          </p>

          <h1 className="mt-4 text-display font-light text-balance text-black dark:text-white">
            {t.headline}
          </h1>

          {t.description.map((paragraph) => (
            <p
              key={paragraph}
              className="measure mt-6 text-pretty text-lead font-light text-gray-600 dark:text-gray-400">
              {paragraph}
            </p>
          ))}

          <div className="mt-10">
            <p className="text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
              {t.practice.label}
            </p>
            <p className="mt-2 text-base font-light text-gray-700 dark:text-gray-300">
              {t.practice.value}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#experience"
              className="cta-primary inline-flex items-center gap-2 px-5 py-3 text-small font-medium">
              {t.buttons.experience}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 border border-gray-500 px-5 py-3 text-small font-medium text-gray-700 transition-colors duration-200 ease-out hover:border-black hover:text-black dark:text-gray-300 dark:hover:border-white dark:hover:text-white">
              <FaLinkedin className="h-4 w-4" aria-hidden="true" />
              {t.buttons.linkedin}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="flex items-center gap-3 text-small font-light text-gray-600 dark:text-gray-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-status-pulse rounded-full bg-[var(--accent-success)]"
              />
              {t.availability}
            </p>

            <ul className="flex list-none items-center gap-1">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center text-gray-500 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white">
                    <link.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panel del enfoque: superficie con filete, sin radios, que ocupa la
            columna derecha. El punto de acento marca donde arranca la lista.
            En movil baja debajo del discurso. */}
        <div className="border border-gray-200 bg-[var(--bg-secondary)] p-8 sm:p-10 lg:col-span-5 lg:p-12 dark:border-gray-800">
          <span aria-hidden="true" className="block h-px w-16 bg-gray-300 dark:bg-gray-700" />

          <p className="mt-10 text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
            {t.focus.label}
          </p>

          <div className="relative mt-6 border-l border-gray-300 pl-6 dark:border-gray-700">
            <span
              aria-hidden="true"
              className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            />
            <ul className="list-none space-y-4">
              {t.focus.items.map((item) => (
                <li
                  key={item}
                  className="text-label font-medium uppercase text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
