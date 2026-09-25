// Experiencia: una sola linea temporal con dos facetas.
// Mismo idioma que About y que el hero: titular y entradilla a la izquierda, la
// seleccion como etiquetas de fondo gris y cada puesto en una tarjeta de 1px con
// el logotipo a la izquierda del nombre de la empresa, el puesto debajo, los
// metadatos juntos y el relato como lista de puntos.
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

        {/* La seleccion son etiquetas: fondo gris, la activa un escalon mas oscura
            y el texto en tinta; las demas en gris. */}
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t.title}>
          {filters.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={isActive}
                className={`rounded px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}>
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
              {/* Cabecera: el logotipo a la izquierda del nombre de la empresa y
                  el puesto debajo. Despues los metadatos, muy juntos, y el
                  relato. Los hitos van con punto, no con guion. */}
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
                <h3 className="text-subhead font-light text-black dark:text-white">
                  {entry.company}
                </h3>
              </div>
              <p className="mt-1 text-base font-light text-gray-700 dark:text-gray-300">
                {entry.role}
              </p>

              <div className="mt-4 space-y-1">
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

              <p className="mt-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                {entry.summary}
              </p>

              <ul className="mt-6 list-none space-y-2">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-ui font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {entry.tools && entry.tools.length > 0 && (
                <ul className="mt-6 flex list-none flex-wrap gap-2">
                  {entry.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded border border-gray-300 px-2 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-widest text-black dark:border-gray-600 dark:text-white">
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
