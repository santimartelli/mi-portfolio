// Skills: la misma familia que About y Experiencia. Cabecera con el titular y la
// entradilla a la izquierda, y debajo una rejilla de tarjetas: los cuatro grupos
// de habilidades (cada pieza como etiqueta, igual que las herramientas de
// Experiencia), los idiomas y la formacion. Sin barras ni porcentajes.
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsProps {
  content: SkillsTranslations;
}

/** La tarjeta, una sola vez: la comparten los seis bloques. */
const cardClass =
  'rounded-xl border border-gray-200 p-6 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500';

const Skills = ({ content: t }: SkillsProps) => {
  return (
    <section id="skills" className="section-rule py-20 sm:py-28">
      <div className="shell">
        <h2 className="text-headline font-light text-black dark:text-white">
          {t.title}
        </h2>
        <p className="measure mt-5 text-lead font-light leading-[1.6] text-gray-600 dark:text-gray-400">
          {t.description}
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Los cuatro grupos de habilidades: cada pieza es una etiqueta. */}
          {t.groups.map((group) => (
            <div key={group.id} className={cardClass}>
              <h3 className="text-title font-light text-black dark:text-white">
                {group.title}
              </h3>
              {group.note && (
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {group.note}
                </p>
              )}
              <ul className="mt-6 flex list-none flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="rounded border border-gray-300 px-2 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-widest text-black dark:border-gray-600 dark:text-white">
                    {item.label}
                    {item.level && (
                      <span className="text-gray-500 dark:text-gray-400"> · {item.level}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Idiomas: nombre y nivel, en filas. */}
          <div className={cardClass}>
            <h3 className="text-title font-light text-black dark:text-white">
              {t.languages.title}
            </h3>
            <ul className="mt-6 list-none space-y-2">
              {t.languages.items.map((language) => (
                <li key={language.name} className="flex items-baseline justify-between gap-4">
                  <span className="font-light text-gray-700 dark:text-gray-300">
                    {language.name}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    {language.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formacion. */}
          <div className={cardClass}>
            <h3 className="text-title font-light text-black dark:text-white">
              {t.education.title}
            </h3>
            <ul className="mt-6 list-none space-y-4">
              {t.education.items.map((item) => (
                <li key={item.title}>
                  <p className="font-light text-gray-700 dark:text-gray-300">{item.title}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
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
