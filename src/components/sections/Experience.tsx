// Experiencia: una sola linea temporal con dos facetas.
// Cada puesto es una fila ancha: metadatos a la izquierda, contenido a la
// derecha y los hitos en dos columnas cuando hay sitio.
import { useMemo, useState } from 'react';
import type { ExperienceTrack, ExperienceTranslations } from '../../util/i18n';

type Filter = 'all' | ExperienceTrack;

interface ExperienceProps {
  content: ExperienceTranslations;
}

const Experience = ({ content: t }: ExperienceProps) => {
  const [filter, setFilter] = useState<Filter>('all');

  const filters = useMemo<Array<{ id: Filter; label: string }>>(
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
    <section id="experience" className="section-rule py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-headline font-light text-black dark:text-white">
              {t.title}
            </h2>
          </div>
          <p className="measure text-lead font-light text-gray-600 lg:col-span-7 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t.title}>
          {filters.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={isActive}
                className={`border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-white'
                }`}>
                {option.label}
              </button>
            );
          })}
        </div>

        <ol className="mt-14 list-none">
          {entries.map((entry) => (
            <li key={entry.id} className="border-b border-gray-200 py-10 dark:border-gray-700">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                {/* Metadatos */}
                <div className="lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-gray-500 tabular dark:text-gray-400">
                    {entry.period}
                  </p>
                  <p className="mt-3 inline-block border border-gray-300 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-gray-600 dark:border-gray-600 dark:text-gray-400">
                    {t.trackLabels[entry.track]}
                  </p>
                  {entry.location && (
                    <p className="mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
                      {entry.location}
                    </p>
                  )}
                </div>

                {/* Contenido */}
                <div className="lg:col-span-9">
                  <h3 className="text-title-lg font-light text-black dark:text-white">
                    {entry.company}
                  </h3>
                  <p className="mt-1 text-base font-light text-gray-700 dark:text-gray-300">
                    {entry.role}
                  </p>
                  <p className="measure mt-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {entry.summary}
                  </p>

                  <ul className="mt-6 grid list-none gap-x-12 gap-y-2 sm:grid-cols-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                        <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-gray-400 dark:bg-gray-600" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {entry.tools && entry.tools.length > 0 && (
                    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {entry.tools.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="measure mt-10 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
          {t.note}
        </p>
      </div>
    </section>
  );
};

export default Experience;
