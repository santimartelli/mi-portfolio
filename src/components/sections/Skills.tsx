// Skills: agrupadas por origen. Texto corrido en filas anchas, sin chips ni barras.
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsProps {
  content: SkillsTranslations;
}

const Skills = ({ content: t }: SkillsProps) => {
  return (
    <section id="skills" className="border-t border-gray-200 py-20 sm:py-28 dark:border-gray-700">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-4xl font-light leading-tight tracking-tight text-black sm:text-5xl lg:col-span-5 dark:text-white">
            {t.title}
          </h2>
          <p className="measure text-lg font-light leading-relaxed text-gray-600 lg:col-span-7 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <dl className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {t.groups.map((group) => (
            <div key={group.id} className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <dt>
                <span className="text-xl font-light tracking-wide text-black dark:text-white">
                  {group.title}
                </span>
                {group.note && (
                  <span className="measure mt-3 block text-sm font-light leading-relaxed text-gray-500 dark:text-gray-500">
                    {group.note}
                  </span>
                )}
              </dt>
              <dd className="mt-4">
                <ul className="flex list-none flex-wrap gap-x-3 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item.label} className="font-light text-gray-700 dark:text-gray-300">
                      {item.label}
                      {item.level && (
                        <span className="text-gray-500 dark:text-gray-500"> · {item.level}</span>
                      )}
                      <span aria-hidden="true" className="px-2 text-gray-300 dark:text-gray-600">
                        /
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h3 className="text-xl font-light tracking-wide text-black dark:text-white">
              {t.languages.title}
            </h3>
            <dl className="mt-6 border-t border-gray-200 dark:border-gray-700">
              {t.languages.items.map((language) => (
                <div
                  key={language.name}
                  className="flex items-baseline justify-between gap-4 border-b border-gray-200 py-3 dark:border-gray-700">
                  <dt className="font-light text-gray-700 dark:text-gray-300">{language.name}</dt>
                  <dd className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    {language.level}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6">
            <h3 className="text-xl font-light tracking-wide text-black dark:text-white">
              {t.education.title}
            </h3>
            <ul className="mt-6 list-none border-t border-gray-200 dark:border-gray-700">
              {t.education.items.map((item) => (
                <li key={item.title} className="border-b border-gray-200 py-3 dark:border-gray-700">
                  <p className="font-light text-gray-700 dark:text-gray-300">{item.title}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    {item.meta}
                  </p>
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
