// Proyectos: casos de estudio, con el mismo lenguaje que About, Experiencia y
// Skills. Cabecera con el titular y la entradilla a la izquierda y, debajo, una
// tarjeta por proyecto: dentro, la prueba visual y los datos (imagen, estado,
// stack y enlaces) a la izquierda y el relato (problema, solucion, rol,
// implementacion y resultado) a la derecha. La tabla de metricas cruza toda la
// anchura de la tarjeta porque es una comparacion.
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsProps {
  content: ProjectsTranslations;
}

/** La tarjeta, la misma que usan Experiencia y Skills. */
const cardClass =
  'rounded-xl border border-gray-200 p-6 transition-colors duration-200 ease-out hover:border-gray-400 sm:p-8 dark:border-gray-700 dark:hover:border-gray-500';

/** Una tecnologia del stack: la misma etiqueta que las herramientas de Experiencia. */
const badgeClass =
  'rounded border border-gray-300 px-2 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-widest text-black dark:border-gray-600 dark:text-white';

/** El rotulo de un bloque: la etiqueta de la casa. */
const labelClass = 'text-label font-medium uppercase text-gray-500 dark:text-gray-400';

/** Un enlace de accion: el boton secundario del hero. */
const linkClass =
  'cta-secondary flex items-center gap-2 px-4 py-2 text-small font-semibold uppercase tracking-widest';

const Projects = ({ content: t }: ProjectsProps) => {
  return (
    <section id="projects" className="section-rule py-20 sm:py-28">
      <div className="shell">
        <h2 className="text-headline font-light text-black dark:text-white">
          {t.title}
        </h2>
        <p className="measure mt-5 text-lead font-light leading-[1.6] text-gray-600 dark:text-gray-400">
          {t.description}
        </p>

        <div className="mt-16 grid gap-6">
          {t.projects.map((project) => (
            <article
              key={project.id}
              aria-labelledby={`project-${project.id}`}
              className={cardClass}>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Prueba y datos */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className={labelClass}>{project.category}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 tabular dark:text-gray-400">
                      {project.period}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-light text-gray-600 dark:text-gray-400">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          project.status === 'production'
                            ? 'bg-accent-400'
                            : 'bg-gray-400 dark:bg-gray-600'
                        }`}
                      />
                      {t.status[project.status]}
                    </span>
                  </p>

                  <ul className="mt-6 flex list-none flex-wrap gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                    {project.technologies.map((technology) => (
                      <li key={technology} className={badgeClass}>
                        {technology}
                      </li>
                    ))}
                  </ul>
                  {project.previousStack && (
                    <p className="mt-4 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                      <span className="text-gray-400 dark:text-gray-600">
                        {t.labels.previousStack}:{' '}
                      </span>
                      {project.previousStack.join(' · ')}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {project.href && (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <HiExternalLink className="h-4 w-4" aria-hidden="true" />
                        {t.labels.visit}
                        <span className="sr-only"> — {project.title}</span>
                      </a>
                    )}
                    {project.code && (
                      <a href={project.code} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <FaGithub className="h-4 w-4" aria-hidden="true" />
                        {t.labels.code}
                        <span className="sr-only"> — {project.title}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* El relato */}
                <div className="lg:col-span-7">
                  <h3
                    id={`project-${project.id}`}
                    className="text-subhead font-light text-black dark:text-white">
                    {project.title}
                  </h3>
                  <p className="measure mt-2 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.subtitle}
                  </p>

                  <dl className="mt-8">
                    {(
                      [
                        ['problem', project.problem],
                        ['solution', project.solution],
                        ['role', project.role],
                      ] as const
                    ).map(([key, value]) => (
                      <div
                        key={key}
                        className="grid gap-2 border-t border-gray-200 py-5 sm:grid-cols-12 sm:gap-8 dark:border-gray-700">
                        <dt className={`${labelClass} sm:col-span-3`}>{t.labels[key]}</dt>
                        <dd className="measure font-light leading-relaxed text-gray-600 sm:col-span-9 dark:text-gray-400">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <h4 className={`mt-8 ${labelClass}`}>{t.labels.implementation}</h4>
                  <ul className="mt-4 list-none space-y-2">
                    {project.implementation.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                        <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className={`mt-8 ${labelClass}`}>{t.labels.result}</h4>
                  <p className="measure mt-3 border-t border-gray-300 pt-4 text-subhead font-light text-black dark:border-gray-600 dark:text-white">
                    {project.result}
                  </p>
                </div>
              </div>

              {/* Metricas medidas: cruzan toda la anchura de la tarjeta. */}
              {project.metrics && (
                <div className="mt-12">
                  <h4 className={labelClass}>{project.metrics.title}</h4>
                  <table className="mt-5 w-full border-collapse">
                    <thead>
                      <tr>
                        {project.metrics.columns.map((column) => (
                          <th
                            key={column}
                            scope="col"
                            className={`border-b border-gray-300 pb-3 pr-6 text-left dark:border-gray-600 ${labelClass}`}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {project.metrics.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={`${row[0]}-${cellIndex}`}
                              className={`border-b border-gray-200 py-3 pr-6 dark:border-gray-700 ${
                                cellIndex === 0
                                  ? 'font-light text-gray-700 dark:text-gray-300'
                                  : 'font-mono text-sm tabular text-gray-500 dark:text-gray-400'
                              }`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
