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
              {/* Cabecera: el logotipo a la izquierda y, a su derecha, el nombre
                  de la empresa con el puesto debajo. Despues los metadatos, muy
                  juntos, y el relato. Los hitos van con punto, no con guion. */}
              <div className="flex items-center gap-4">
                {entry.logo && (
                  <img
                    src={entry.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto max-w-full shrink-0 rounded-lg object-contain"
                  />
                )}
                {/* Nombre y puesto un escalon mas pequenos y con 2px entre
                    ellos, para que el bloque no sobrepase el alto del logo. */}
                <div>
                  <h3 className="text-title font-light text-black dark:text-white">
                    {entry.company}
                  </h3>
                  <p className="mt-0.5 text-sm font-light text-gray-700 dark:text-gray-300">
                    {entry.role}
                  </p>
                </div>
              </div>

              {/* El cuando y el donde, en una sola linea. */}
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-mono uppercase tracking-widest tabular">{entry.period}</span>
                {entry.location && (
                  <>
                    <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">·</span>
                    <span className="font-light">{entry.location}</span>
                  </>
                )}
              </p>

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

              {/* Las etiquetas de la tarjeta: primero la faceta, que es la misma
                  taxonomia de los filtros, y despues las herramientas. */}
              <ul className="mt-6 flex list-none flex-wrap gap-2">
                <li className="rounded border border-gray-400 px-2 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-widest text-black dark:border-gray-500 dark:text-white">
                  {t.trackLabels[entry.track]}
                </li>
                {entry.tools?.map((tool) => (
                  <li
                    key={tool}
                    className="rounded border border-gray-300 px-2 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-widest text-black dark:border-gray-600 dark:text-white">
                    {tool}
                  </li>
                ))}
              </ul>
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
