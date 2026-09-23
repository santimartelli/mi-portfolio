// Sección de skills, idiomas y formación.
import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import type { SkillsTranslations } from '../../util/i18n';

/**
 * Skills.
 *
 * Agrupa las capacidades por origen (operaciones, cliente/producto, tecnología,
 * negocio) en lugar de por stack. Sin barras de progreso, porcentajes ni
 * estrellas: solo etiquetas, y un nivel únicamente donde está justificado.
 */
interface SkillsProps {
  content: SkillsTranslations;
}

const Skills = ({ content: t }: SkillsProps) => {

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.05 });

  return (
    <section id="skills" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div ref={contentRef} className="w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          {/* Encabezado */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t.title}
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              {t.description}
            </p>
          </motion.header>

          {/* Grupos de capacidades */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-20">
            {t.groups.map((group, index) => (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 p-6 sm:p-8">
                <h3 className="text-lg font-light text-black dark:text-white tracking-wide mb-4 uppercase">
                  {group.title}
                </h3>

                {group.note && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-5 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
                    {group.note}
                  </p>
                )}

                <ul className="list-none flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-light">
                      {item.label}
                      {item.level && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          {item.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          {/* Idiomas y formación */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 p-6 sm:p-8">
              <h3 className="text-lg font-light text-black dark:text-white tracking-wide mb-6 uppercase">
                {t.languages.title}
              </h3>
              <dl className="space-y-3">
                {t.languages.items.map((language) => (
                  <div
                    key={language.name}
                    className="flex items-baseline justify-between gap-4 border-b border-gray-100 dark:border-gray-700/50 pb-2 last:border-b-0">
                    <dt className="text-gray-700 dark:text-gray-300 font-light">{language.name}</dt>
                    <dd className="text-sm text-gray-500 dark:text-gray-400 font-light">
                      {language.level}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 p-6 sm:p-8">
              <h3 className="text-lg font-light text-black dark:text-white tracking-wide mb-6 uppercase">
                {t.education.title}
              </h3>
              <ul className="list-none space-y-4">
                {t.education.items.map((item) => (
                  <li key={item.title}>
                    <p className="text-gray-700 dark:text-gray-300 font-light">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">
                      {item.meta}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
