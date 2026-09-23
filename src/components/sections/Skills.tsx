// Skills: agrupadas por origen, en texto corrido. Sin chips, barras ni porcentajes.
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsProps {
  content: SkillsTranslations;
}

const Skills = ({ content: t }: SkillsProps) => {
  return (
    <section id="skills" className="border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="font-display text-h2 font-medium text-ink">{t.title}</h2>
        <p className="mt-6 max-w-measure text-lead text-body">{t.description}</p>

        <dl className="mt-14 border-t border-rule">
          {t.groups.map((group) => (
            <div key={group.id} className="grid gap-3 border-b border-rule py-8 sm:grid-cols-12 sm:gap-8">
              <dt className="sm:col-span-4">
                <span className="font-display text-h3 font-medium text-ink">{group.title}</span>
                {group.note && (
                  <span className="mt-3 block max-w-measure text-meta text-muted">{group.note}</span>
                )}
              </dt>
              <dd className="sm:col-span-8">
                <ul className="flex flex-wrap gap-x-2 gap-y-1">
                  {group.items.map((item) => (
                    <li key={item.label} className="text-body">
                      {item.label}
                      {item.level && <span className="text-muted"> ({item.level})</span>}
                      <span aria-hidden="true" className="px-2 text-faint">
                        ·
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-h3 font-medium text-ink">{t.languages.title}</h3>
            <dl className="mt-6 border-t border-rule">
              {t.languages.items.map((language) => (
                <div
                  key={language.name}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="text-body">{language.name}</dt>
                  <dd className="font-mono text-micro uppercase text-muted">{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="font-display text-h3 font-medium text-ink">{t.education.title}</h3>
            <ul className="mt-6 border-t border-rule">
              {t.education.items.map((item) => (
                <li key={item.title} className="border-b border-rule py-3">
                  <p className="text-body">{item.title}</p>
                  <p className="mt-1 font-mono text-micro uppercase text-muted">{item.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
