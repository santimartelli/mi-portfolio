// Hero: una sola columna, sin nombre y sin filetes.
// El titular es la frase de posicionamiento, que es lo que debe quedar claro en
// el primer viewport. Los datos de contexto van en una fila suelta, sin lineas
// que los separen: la jerarquia la hace el tamano, no los bordes.
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { HeroTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface HeroProps {
  content: HeroTranslations;
}

const socialLinks = [
  { icon: FaGithub, href: SITE.github, label: 'GitHub' },
  { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn' },
];

const Hero = ({ content: t }: HeroProps) => {
  return (
    <section id="home" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="shell">
        <h1 className="text-headline font-light text-balance text-black dark:text-white">{t.headline}</h1>

        <p className="measure mt-6 text-pretty text-lead font-light text-gray-600 dark:text-gray-400">
          {t.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#experience"
            aria-label={t.ariaLabels.experienceButton}
            className="text-small font-medium uppercase tracking-widest text-gray-600 underline transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            {t.buttons.experience}
          </a>
          <a
            href="#contact"
            aria-label={t.ariaLabels.contactButton}
            className="cta-primary px-5 py-3 text-small font-medium uppercase tracking-widest">
            {t.buttons.contact}
          </a>
          <ul className="flex list-none items-center gap-5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={social.label}
                  className="block p-2 text-gray-500 transition-colors duration-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* La disponibilidad va antes que los datos: es la senal que mas pesa
            para quien busca cubrir un puesto, y en movil quedaba bajo el pliegue. */}
        <p className="mt-10 flex items-center gap-3 text-small font-light text-gray-600 dark:text-gray-400">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-success)]" />
          <span>
            <span className="mr-2 text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
              {t.availability.label}
            </span>
            {t.availability.value}
          </span>
        </p>

        {/* Contexto en una fila, sin filetes ni columnas */}
        <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          {t.facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-micro font-medium uppercase text-gray-500 dark:text-gray-400">
                {fact.label}
              </dt>
              <dd className="mt-1.5 break-words text-base font-light text-gray-700 dark:text-gray-300">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
