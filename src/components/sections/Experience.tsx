// Sección de experiencia: una sola trayectoria con dos facetas.
import { useMemo, useRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ExperienceTrack, ExperienceTranslations } from '../../util/i18n';

type Filter = 'all' | ExperienceTrack;

/**
 * Experiencia profesional.
 *
 * Las entradas se muestran en una única línea temporal con una etiqueta que
 * indica la faceta (operaciones o tecnología). Así se lee como una sola
 * trayectoria y no como dos CV distintos.
 *
 * El filtro es estado de React con "todo" por defecto: el HTML inicial incluye
 * todas las entradas, de modo que la sección funciona sin JavaScript y es
 * rastreable por buscadores.
 */
interface ExperienceProps {
  content: ExperienceTranslations;
}

const Experience = ({ content: t }: ExperienceProps) => {
  const [filter, setFilter] = useState<Filter>('all');

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.05 });

  const filters: Array<{ id: Filter; label: string }> = useMemo(
    () => [
      { id: 'all', label: t.allLabel },
      { id: 'hospitality', label: t.trackLabels.hospitality },
      { id: 'technology', label: t.trackLabels.technology },
    ],
    [t]
  );

  const entries = useMemo(
    () => (filter === 'all' ? t.entries : t.entries.filter((entry) => entry.track === filter)),
    [filter, t.entries]
  );

  return (
    <section id="experience" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div ref={contentRef} className="w-full">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
          {/* Encabezado */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t.title}
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              {t.description}
            </p>
          </motion.header>

          {/* Filtro por faceta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
            role="group"
            aria-label={t.title}>
            {filters.map((option) => {
              const isActive = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-medium border transition-colors duration-200 ${
                    isActive
                      ? 'border-blue-400 dark:border-blue-500 text-black dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}>
                  {option.label}
                </button>
              );
            })}
          </motion.div>

          {/* Línea temporal */}
          <ol className="list-none space-y-4">
            {entries.map((entry, index) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(0.4 + index * 0.06, 1) }}
                className="border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-black dark:text-white tracking-tight">
                      {entry.company}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 font-light mt-1">
                      {entry.role}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end lg:text-right shrink-0">
                    <span className="text-sm text-gray-500 dark:text-gray-500 font-light whitespace-nowrap">
                      {entry.period}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-widest font-medium px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      {t.trackLabels[entry.track]}
                    </span>
                    {entry.location && (
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-light">
                        {entry.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-5 max-w-3xl">
                  {entry.summary}
                </p>

                <ul className="list-disc list-outside pl-5 space-y-1.5 text-sm text-gray-600 dark:text-gray-400 font-light marker:text-gray-400 dark:marker:text-gray-600">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                {entry.tools && entry.tools.length > 0 && (
                  <ul className="list-none flex flex-wrap gap-2 mt-5">
                    {entry.tools.map((tool) => (
                      <li
                        key={tool}
                        className="text-xs px-2 py-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-light">
                        {tool}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ol>

          {/* Nota de honestidad sobre áreas objetivo */}
          <p className="mt-12 max-w-3xl mx-auto text-sm text-gray-500 dark:text-gray-500 font-light leading-relaxed text-center border-t border-gray-200 dark:border-gray-700 pt-8">
            {t.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Experience);
