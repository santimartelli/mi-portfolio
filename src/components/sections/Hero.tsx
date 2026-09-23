// Sección Hero: posicionamiento profesional en cinco segundos.
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useMemo, memo, useRef } from 'react';
import type { HeroTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface SocialLink {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly label: string;
}

/**
 * Hero del portfolio.
 *
 * El objetivo es que alguien que llega desde LinkedIn entienda en cinco segundos
 * que el perfil combina operaciones hoteleras y tecnología. Todo el texto sale
 * del contenido por idioma: nada está escrito aquí dentro.
 */
interface HeroProps {
  content: HeroTranslations;
}

const Hero = ({ content: t }: HeroProps) => {

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.05 });

  const socialLinks: readonly SocialLink[] = useMemo(
    () => [
      { icon: FaGithub, href: SITE.github, label: 'GitHub' },
      { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn' },
    ],
    []
  );

  return (
    <section id="home" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div ref={contentRef} className="w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 flex items-start justify-center">
          <div className="w-full text-center">
            <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12">
              {/* Posicionamiento: hospitality + technology */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-gray-500 dark:text-gray-500">
                {t.badge}
              </motion.p>

              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center space-y-2">
                <h1 className="text-black dark:text-white font-light leading-[0.85] tracking-tight">
                  <span className="block sm:hidden">
                    <span className="block text-6xl">{t.firstName}</span>
                    <span className="block text-6xl text-gray-500 dark:text-gray-500">
                      {t.lastName}
                    </span>
                  </span>
                  <span className="hidden sm:block text-7xl md:text-8xl lg:text-9xl">
                    {t.firstName}{' '}
                    <span className="text-gray-500 dark:text-gray-500">{t.lastName}</span>
                  </span>
                </h1>
              </motion.div>

              {/* Titular: la frase que debe quedar clara */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="max-w-2xl mx-auto text-xl sm:text-2xl md:text-3xl font-light text-black dark:text-white leading-snug tracking-tight">
                {t.headline}
              </motion.p>

              {/* Descripción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="max-w-2xl mx-auto">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {t.description}
                </p>
              </motion.div>

              {/* Tarjetas de contexto */}
              <motion.dl
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {t.cards.map((card) => (
                  <div
                    key={card.label}
                    className="p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 bg-gray-50/30 dark:bg-gray-800/20">
                    <dt className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-500 mb-2">
                      {card.label}
                    </dt>
                    <dd className="text-sm font-light text-gray-700 dark:text-gray-300">
                      {card.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>

              {/* Disponibilidad */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-center gap-3 text-sm font-light text-gray-600 dark:text-gray-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" aria-hidden="true" />
                <span>
                  <span className="uppercase tracking-widest text-xs text-gray-500 dark:text-gray-500 mr-2">
                    {t.availability.label}
                  </span>
                  {t.availability.value}
                </span>
              </motion.p>

              {/* Llamada a la acción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-col gap-8 items-center justify-center">
                <div className="flex flex-wrap gap-x-10 gap-y-4 items-center justify-center">
                  <a
                    href="#experience"
                    aria-label={t.ariaLabels.experienceButton}
                    className="text-base font-light text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 uppercase tracking-widest">
                    {t.buttons.experience}
                  </a>
                  <a
                    href="#contact"
                    aria-label={t.ariaLabels.contactButton}
                    className="text-base font-light text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 uppercase tracking-widest">
                    {t.buttons.contact}
                  </a>
                </div>

                <ul className="flex gap-6 sm:gap-8 list-none">
                  {socialLinks.map((social, index) => (
                    <motion.li
                      key={social.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="block p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-sm"
                        aria-label={social.label}>
                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
