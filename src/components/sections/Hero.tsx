// Hero: el posicionamiento a ancho completo. Sin animaciones de entrada: el
// contenido esta visible en el HTML y no depende de JavaScript.
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
        <h1 className="text-display text-black dark:text-white font-light">
          <span className="block sm:hidden">
            {t.firstName}
            <span className="block text-gray-500 dark:text-gray-500">{t.lastName}</span>
          </span>
          <span className="hidden sm:block">
            {t.firstName}{' '}
            <span className="text-gray-500 dark:text-gray-500">{t.lastName}</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Que hago y como contactarme */}
          <div className="lg:col-span-5">
            <p className="text-subhead font-normal text-black dark:text-white">
              {t.headline}
            </p>
            <p className="measure mt-5 text-lead font-light text-gray-600 dark:text-gray-400">
              {t.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#experience"
                aria-label={t.ariaLabels.experienceButton}
                className="text-sm font-light uppercase tracking-widest text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                {t.buttons.experience}
              </a>
              <a
                href="#contact"
                aria-label={t.ariaLabels.contactButton}
                className="border border-accent-500/30 px-5 py-3 text-sm font-light uppercase tracking-widest text-black transition-colors duration-300 hover:border-accent-500 dark:text-white">
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

            <p className="mt-10 flex items-center gap-3 text-sm font-light text-gray-600 dark:text-gray-400">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>
                <span className="mr-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
                  {t.availability.label}
                </span>
                {t.availability.value}
              </span>
            </p>
          </div>

          {/* Datos de contexto: ocupan el resto del ancho en filas, no en tarjetas */}
          <dl className="lg:col-span-7">
            {t.cards.map((card) => (
              <div
                key={card.label}
                className="grid gap-2 border-t border-gray-200 py-6 last:border-b sm:grid-cols-12 sm:items-baseline sm:gap-8 dark:border-gray-700">
                <dt className="text-xs font-medium uppercase tracking-widest text-gray-500 sm:col-span-4 dark:text-gray-500">
                  {card.label}
                </dt>
                <dd className="text-base font-light text-gray-700 sm:col-span-8 sm:text-lg dark:text-gray-300">
                  {card.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
