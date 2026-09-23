// Hero en dos columnas, segun la referencia visual aportada por el usuario: a
// la izquierda el titular, los parrafos de presentacion y el contacto directo;
// a la derecha un panel con los dibujos (dos circulos suaves que sangran por
// los bordes) y el eje con el punto de acento.
// Sin estado y sin JavaScript: el unico movimiento es el latido del punto de
// estado, que es CSS y no necesita hidratacion, asi que el hero se renderiza
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
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
        <div className="lg:col-span-7">
          <h1 className="text-display font-light text-balance text-black dark:text-white">
            {t.headline}
          </h1>

          {t.description.map((paragraph) => (
            <p
              key={paragraph}
              className="measure mt-6 text-pretty text-lead font-light text-gray-600 dark:text-gray-400">
              {paragraph}
            </p>
          ))}

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

        {/* Panel. Los dos circulos son decorativos y sangran por los bordes: de
            ahi el overflow-hidden. En movil baja debajo del discurso. */}
        <div className="relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white to-[#eef1f4] p-8 sm:p-10 lg:col-span-5 lg:h-full lg:p-12 dark:border-gray-800 dark:from-[#151821] dark:to-[#1b2029]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-16 h-[26rem] w-[26rem] rounded-full bg-black/[0.035] dark:bg-white/[0.04]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 left-0 h-[22rem] w-[22rem] rounded-full bg-black/[0.025] dark:bg-white/[0.03]"
          />

          <div className="relative flex h-full flex-col">
            <span aria-hidden="true" className="block h-px w-8 bg-gray-400/70 dark:bg-gray-600" />

            <p className="mt-14 text-label font-medium uppercase leading-relaxed text-gray-600 dark:text-gray-300">
              {t.panel.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <p className="mt-5 text-small font-light text-gray-600 dark:text-gray-400">
              {t.panel.subline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            {/* El eje: las palabras arriba, la linea con el punto de acento en
                medio y las de abajo. */}
            <div className="ml-auto mt-auto w-40 pt-16">
              <ul className="list-none space-y-2">
                {t.panel.axis.above.map((line) => (
                  <li
                    key={line}
                    className="text-micro font-medium uppercase text-gray-600 dark:text-gray-400">
                    {line}
                  </li>
                ))}
              </ul>

              <span aria-hidden="true" className="my-3 flex items-center">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
              </span>

              <ul className="list-none space-y-2">
                {t.panel.axis.below.map((line) => (
                  <li
                    key={line}
                    className="text-micro font-medium uppercase text-gray-600 dark:text-gray-400">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-20 text-micro font-medium uppercase leading-relaxed text-gray-600 dark:text-gray-400">
              {t.panel.footer.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
