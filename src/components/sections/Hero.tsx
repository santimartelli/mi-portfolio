// Hero: el posicionamiento en el primer viewport. Sin kicker sobre el titular.
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
    <section id="home" className="pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* El unico momento de motion del sitio: el nombre se descubre con un barrido. */}
        <h1 className="name-reveal font-display text-h1 font-medium text-ink">
          {t.firstName} {t.lastName}
        </h1>

        <p className="mt-8 max-w-[22ch] font-display text-display font-medium text-ink sm:max-w-[24ch]">
          {t.headline}
        </p>

        <p className="mt-8 max-w-measure text-lead text-body">{t.description}</p>

        {/* Contexto operativo en una fila editorial, no en tarjetas. */}
        <dl className="mt-14 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3 sm:gap-12">
          {t.cards.map((card) => (
            <div key={card.label}>
              <dt className="font-mono text-micro uppercase text-muted">{card.label}</dt>
              <dd className="mt-3 text-ink">{card.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href="#experience"
            aria-label={t.ariaLabels.experienceButton}
            className="bg-ink px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-paper no-underline transition-colors duration-200 ease-out hover:bg-accent-ink">
            {t.buttons.experience}
          </a>
          <a
            href="#contact"
            aria-label={t.ariaLabels.contactButton}
            className="text-sm font-medium uppercase tracking-[0.14em]">
            {t.buttons.contact}
          </a>
          <ul className="ml-auto flex list-none items-center gap-5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={social.label}
                  className="block text-muted no-underline transition-colors duration-200 ease-out hover:text-ink">
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 flex items-center gap-3 font-mono text-micro uppercase text-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t.availability.label} — {t.availability.value}
        </p>
      </div>
    </section>
  );
};

export default Hero;
