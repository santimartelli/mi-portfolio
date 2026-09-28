// Skills: la misma familia que About y Experiencia. Cabecera con el titular y la
// entradilla a la izquierda y, debajo, tarjetas horizontales apiladas: en cada
// una, el titulo del bloque y su descripcion breve a la izquierda y el contenido
// a la derecha. Las habilidades son etiquetas, igual que las herramientas de
// Experiencia. Sin barras ni porcentajes.
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsProps {
  content: SkillsTranslations;
}

/** La tarjeta, una sola vez: la comparten los seis bloques. */
const cardClass =
  'rounded-xl border border-gray-200 p-6 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500';

/** La rejilla de dentro: titulo y descripcion a la izquierda, contenido a la derecha. */
const innerGrid = 'grid gap-6 lg:grid-cols-12 lg:gap-12';
const headCell = 'lg:col-span-4';
const bodyCell = 'lg:col-span-8';

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

        <div className="mt-16 grid gap-6">
          {/* Los cuatro grupos de habilidades: cada pieza es una etiqueta. */}
          {t.groups.map((group) => (
            <div key={group.id} className={cardClass}>
              <div className={innerGrid}>
                <div className={headCell}>
                  <h3 className="text-title font-light text-black dark:text-white">
                    {group.title}
                  </h3>
                  <p className="measure mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                    {group.description}
                  </p>
                </div>
                <ul className={`flex list-none flex-wrap content-start gap-2 ${bodyCell}`}>
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
            </div>
          ))}

          {/* Idiomas: nombre y nivel, en dos columnas de filas. */}
          <div className={cardClass}>
            <div className={innerGrid}>
              <div className={headCell}>
                <h3 className="text-title font-light text-black dark:text-white">
                  {t.languages.title}
                </h3>
                <p className="measure mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {t.languages.description}
                </p>
              </div>
              <ul className={`grid list-none content-start gap-x-12 gap-y-2 sm:grid-cols-2 ${bodyCell}`}>
                {t.languages.items.map((language) => (
                  <li
                    key={language.name}
                    className="flex items-baseline justify-between gap-4">
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
          </div>

          {/* Formacion. */}
          <div className={cardClass}>
            <div className={innerGrid}>
              <div className={headCell}>
                <h3 className="text-title font-light text-black dark:text-white">
                  {t.education.title}
                </h3>
                <p className="measure mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {t.education.description}
                </p>
              </div>
              <ul className={`grid list-none content-start gap-y-4 ${bodyCell}`}>
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
      </div>
    </section>
  );
};

export default Skills;
