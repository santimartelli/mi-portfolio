// Hero: el titular es la frase de posicionamiento y ocupa el primer viewport,
// centrado en todos los tamanos. Debajo van los parrafos de presentacion y los
// dos datos de contexto (enfoque y experiencia practica), que resumen el perfil
// para quien lee en diagonal; despues la accion unica, que es el contacto
// directo. Sin estado y sin JavaScript: el unico movimiento es el latido del
// punto de estado, que es CSS y no necesita hidratacion, asi que el hero se
// renderiza entero en el servidor.
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
      <div className="shell text-center">
        <h1 className="text-display font-light text-balance text-black dark:text-white">
          {t.headline}
        </h1>

        {t.description.map((paragraph) => (
          <p
            key={paragraph}
            className="measure mx-auto mt-6 text-pretty text-lead font-light text-gray-600 dark:text-gray-400">
            {paragraph}
          </p>
        ))}

        {/* Los dos datos de contexto: rotulo en versalitas y valor debajo, en
            una sola columna centrada. Sin filetes y sin columnas enfrentadas,
            que es lo que hacia pesada la fila de datos anterior. */}
        <dl className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6">
          {t.facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
                {fact.label}
              </dt>
              <dd className="mt-2 text-pretty text-base font-light text-gray-700 dark:text-gray-300">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 flex list-none items-center justify-center gap-1">
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

        {/* Estado al pie del hero: punto verde y el valor, sin rotulo. El punto
            late con una opacidad de 1 a 0.45, asi que se atenua pero nunca
            llega a desaparecer. */}
        <p className="mt-10 flex items-center justify-center gap-3 text-small font-light text-gray-600 dark:text-gray-400">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-status-pulse rounded-full bg-[var(--accent-success)]"
          />
          {t.availability}
        </p>
      </div>
    </section>
  );
};

export default Hero;
