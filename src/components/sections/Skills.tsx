// Skills: la misma familia que About y Experiencia. Cabecera con el titular y la
// entradilla a la izquierda y, debajo, tarjetas verticales en una rejilla de tres
// columnas. Dentro de cada tarjeta, en este orden: titulo, descripcion breve y la
// lista de piezas con punto, el mismo marcador que usa el resto del sitio. Sin
// barras ni porcentajes.
import type { SkillsTranslations } from '../../util/i18n';

interface SkillsProps {
  content: SkillsTranslations;
}

/** La tarjeta, una sola vez: la comparten los seis bloques. */
const cardClass =
  'rounded-xl border border-gray-200 p-6 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500';

/** Un item de las listas: punto y texto, como en About y Experiencia. */
const itemClass =
  'flex break-inside-avoid gap-3 text-ui font-light leading-relaxed text-gray-600 dark:text-gray-400';
const dotClass =
  'mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600';

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
          {/* Los cuatro grupos de habilidades. */}
          {t.groups.map((group) => (
            <div key={group.id} className={cardClass}>
              <h3 className="text-title font-light text-black dark:text-white">
                {group.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                {group.description}
              </p>
              <ul className="mt-6 list-none columns-1 gap-x-6 space-y-2 sm:columns-2">
                {group.items.map((item) => (
                  <li key={item.label} className={itemClass}>
                    <span aria-hidden="true" className={dotClass} />
                    <span>
                      {item.label}
                      {item.level && <span className="text-gray-500 dark:text-gray-400"> · {item.level}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Idiomas: el nombre a la izquierda y el nivel a la derecha. */}
          <div className={cardClass}>
            <h3 className="text-title font-light text-black dark:text-white">
              {t.languages.title}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.languages.description}
            </p>
            <ul className="mt-6 list-none columns-1 gap-x-6 space-y-2 sm:columns-2">
              {t.languages.items.map((language) => (
                <li key={language.name} className={itemClass}>
                  <span aria-hidden="true" className={dotClass} />
                  <span>
                    {language.name}: {language.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formacion: la titulacion y, debajo, su meta en mono. */}
          <div className={cardClass}>
            <h3 className="text-title font-light text-black dark:text-white">
              {t.education.title}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.education.description}
            </p>
            <ul className="mt-6 list-none space-y-2">
              {t.education.items.map((item) => (
                <li key={item.title} className={itemClass}>
                  <span aria-hidden="true" className={dotClass} />
                  <span>
                    {item.title}
                    <span className="mt-1 block text-sm font-light text-gray-500 dark:text-gray-400">{item.meta}</span>
                  </span>
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
