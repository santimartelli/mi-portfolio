// Experiencia: una sola linea temporal con dos facetas.
// Mismo idioma que About y que el hero: titular y entradilla a la izquierda, los
// filtros con los botones del hero (el activo solido en tinta, los demas con
// filete) y cada puesto en una tarjeta de 1px, con los metadatos a la izquierda,
// el relato a la derecha y los hitos como lista de guiones.
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
        <h2 className="text-headline font-light text-black dark:text-white">
          {t.title}
        </h2>
        <p className="measure mt-5 text-lead font-light leading-[1.6] text-gray-600 dark:text-gray-400">
          {t.description}
        </p>

        {/* Los filtros usan los dos botones del hero: el activo solido en tinta y
            los demas con filete. */}
        <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label={t.title}>
          {filters.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={isActive}
                className={`${isActive ? 'cta-primary' : 'cta-secondary'} flex items-center justify-center px-4 py-2 text-small font-semibold uppercase tracking-widest`}>
                {option.label}
              </button>
            );
          })}
        </div>

        <ol className="mt-14 grid list-none gap-6 lg:grid-cols-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="border border-gray-200 p-6 dark:border-gray-700">
              {/* La tarjeta va en vertical: el logotipo y los metadatos arriba,
                  y debajo el relato. En una columna tan estrecha los hitos van a
                  una sola columna, no a dos. */}
              <div className="flex items-center gap-4">
                {entry.logo && (
                  <img
                    src={entry.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-auto max-w-full shrink-0 rounded-lg object-contain"
                  />
                )}
                <div className="space-y-1">
                  <p className="font-mono text-xs uppercase tracking-widest text-gray-500 tabular dark:text-gray-400">
                    {entry.period}
                  </p>
                  <p className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
                    {t.trackLabels[entry.track]}
                  </p>
                  {entry.location && (
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      {entry.location}
                    </p>
                  )}
                </div>
              </div>

              <h3 className="mt-6 text-subhead font-light text-black dark:text-white">
                {entry.company}
              </h3>
              <p className="mt-1 text-base font-light text-gray-700 dark:text-gray-300">
                {entry.role}
              </p>
              <p className="mt-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                {entry.summary}
              </p>

              <ul className="mt-6 list-none space-y-2">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-ui font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-2 shrink-0 bg-gray-300 dark:bg-gray-700" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {entry.tools && entry.tools.length > 0 && (
                <ul className="mt-6 flex list-none flex-wrap gap-2">
                  {entry.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded bg-gray-100 px-2 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-widest text-black dark:bg-gray-800 dark:text-white">
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
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
