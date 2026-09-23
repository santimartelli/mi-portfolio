// Sección de contacto: CTA para hospitality, hotel tech, customer success e
// implementation, con acceso directo a LinkedIn, GitHub, email y CV.
import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaClock } from 'react-icons/fa';
import type { ContactTranslations } from '../../util/i18n';
import { CV_FILES, SITE } from '../../util/site';
import { getCvMetadata, type CvLocale } from '../../util/cvMetadata';

/**
 * Contacto.
 *
 * Los enlaces (email, LinkedIn, GitHub, CV) son hechos, no traducciones: viven
 * en `site.ts`. El contenido solo aporta las etiquetas y descripciones.
 */
interface ContactProps {
  content: ContactTranslations;
}

const Contact = ({ content: t }: ContactProps) => {

  const channelsRef = useRef(null);
  const cvRef = useRef(null);

  const isChannelsInView = useInView(channelsRef, { once: true, amount: 0.05 });
  const isCvInView = useInView(cvRef, { once: true, amount: 0.05 });

  const channels = [
    {
      id: 'email',
      icon: FaEnvelope,
      href: `mailto:${SITE.email}`,
      value: SITE.email,
      external: false,
      ...t.channels.email,
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      href: SITE.linkedin,
      value: SITE.linkedinHandle,
      external: true,
      ...t.channels.linkedin,
    },
    {
      id: 'github',
      icon: FaGithub,
      href: SITE.github,
      value: SITE.githubHandle,
      external: true,
      ...t.channels.github,
    },
  ];

  return (
    <section id="contact" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
        {/* CTA principal */}
        <header className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
            {t.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-6">
            {t.description}
          </p>
          <p className="max-w-3xl mx-auto text-base text-gray-500 dark:text-gray-500 leading-relaxed font-light">
            {t.statement}
          </p>
        </header>

        {/* Canales */}
        <div ref={channelsRef} className="mb-20">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full" aria-hidden="true" />
            <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
              {t.channelsTitle}
            </h3>
          </div>
          <ul className="list-none grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {channels.map((channel, index) => (
              <motion.li
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isChannelsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer me' }
                    : {})}
                  className="group flex h-full flex-col items-center text-center p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-300">
                  <span className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300 mb-4">
                    <channel.icon
                      className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </span>
                  <h4 className="text-lg font-light text-black dark:text-white mb-2">
                    {channel.label}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500 font-light mb-3">
                    {channel.description}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-auto">
                    {channel.value}
                  </p>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CV */}
        <div ref={cvRef}>
          <div className="flex items-center gap-3 mb-10 justify-center">
            <span className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full" aria-hidden="true" />
            <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
              {t.cv.title}
            </h3>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isCvInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center text-base text-gray-500 dark:text-gray-500 leading-relaxed font-light mb-10">
            {t.cv.summary}
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* CV disponibles */}
            {t.cv.files.map((file, index) => {
              const meta = getCvMetadata(file.id as CvLocale);
              return (
                <motion.a
                  key={file.id}
                  href={meta.href}
                  download={CV_FILES[file.id as CvLocale]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCvInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group flex items-start gap-4 p-6 border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-300">
                  <span className="p-3 border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <FaDownload
                      className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block text-base font-light text-black dark:text-white mb-1">
                      {file.language} · {file.label}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-500 font-light mb-2">
                      {file.description}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-500 font-light">
                      PDF · {meta.size} · {meta.lastUpdate}
                    </span>
                  </span>
                </motion.a>
              );
            })}

            {/* Hueco preparado para el CV de Hotel Tech, todavía sin archivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCvInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-start gap-4 p-6 border border-dashed border-gray-300 dark:border-gray-600">
              <span className="p-3 border border-gray-200 dark:border-gray-600">
                <FaClock className="w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block text-base font-light text-gray-700 dark:text-gray-300 mb-1">
                  {t.cv.hotelTech.title}
                </span>
                <span className="block text-sm text-gray-500 dark:text-gray-500 font-light mb-2">
                  {t.cv.hotelTech.description}
                </span>
                <span className="inline-block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 border border-gray-300 dark:border-gray-600 px-2 py-1">
                  {t.cv.hotelTech.status}
                </span>
              </span>
            </motion.div>
          </div>

          {/* Disponibilidad y cierre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCvInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto text-center mt-16">
            <h3 className="text-lg font-light text-black dark:text-white tracking-wide mb-3">
              {t.availability.title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-4">
              {t.availability.text}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-500 font-light leading-relaxed">
              {t.closing}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
