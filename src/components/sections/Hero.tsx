// Hero: el titular es la frase de posicionamiento, que es el enfoque.
// Una sola columna, sin nombre propio y sin fila de datos: la accion unica es
// el contacto directo. Sin estado y sin animaciones, asi que se renderiza en el
// servidor y se lee entero sin JavaScript.
import { FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
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
      <div className="shell">
        <h1 className="text-headline font-light text-balance text-black dark:text-white">
          {t.headline}
        </h1>

        <p className="measure mt-6 text-pretty text-lead font-light text-gray-600 dark:text-gray-400">
          {t.description}
        </p>

        <p className="mt-10 flex items-center gap-3 text-small font-light text-gray-600 dark:text-gray-400">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-success)]" />
          <span>
            <span className="mr-2 text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
              {t.availability.label}
            </span>
            {t.availability.value}
          </span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
            {t.contactLabel}
          </span>
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
    </section>
  );
};

export default Hero;
