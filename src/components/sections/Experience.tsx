// Experiencia: una sola linea temporal con dos facetas, en formato editorial.
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
    <section id="experience" className="border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="font-display text-h2 font-medium text-ink">{t.title}</h2>
        <p className="mt-6 max-w-measure text-lead text-body">{t.description}</p>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t.title}>
          {filters.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={isActive}
                className={`border px-3.5 py-2 font-mono text-micro uppercase transition-colors duration-200 ease-out ${
                  isActive
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule text-muted hover:border-rule-strong hover:text-ink'
                }`}>
                {option.label}
              </button>
            );
          })}
        </div>

        <ol className="mt-14 border-t border-rule">
          {entries.map((entry) => (
            <li key={entry.id} className="border-b border-rule py-10">
              <div className="grid gap-3 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-4">
                  <p className="font-mono text-micro uppercase text-muted">{entry.period}</p>
                  <p className="mt-2 font-mono text-micro uppercase text-faint">
                    {t.trackLabels[entry.track]}
                  </p>
                  {entry.location && (
                    <p className="mt-2 text-meta text-faint">{entry.location}</p>
                  )}
                </div>
                <div className="sm:col-span-8">
                  <h3 className="font-display text-h3 font-medium text-ink">{entry.company}</h3>
                  <p className="mt-1 text-ink">{entry.role}</p>
                  <p className="mt-4 max-w-measure text-body">{entry.summary}</p>
                  <ul className="mt-5 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-body">
                        <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-rule-strong" />
                        <span className="max-w-measure">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  {entry.tools && entry.tools.length > 0 && (
                    <p className="mt-5 font-mono text-micro uppercase text-muted">
                      {entry.tools.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-measure text-meta text-muted">{t.note}</p>
      </div>
    </section>
  );
};

export default Experience;
