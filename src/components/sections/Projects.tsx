// Proyectos: casos de estudio.
// Cada caso es una unidad ancha de dos columnas: a la izquierda la prueba
// visual y los datos (imagen, canal, stack, enlaces), a la derecha el relato
// (problema, solucion, rol, implementacion, resultado). La tabla de metricas
// cruza toda la anchura porque es una comparacion.
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsProps {
  content: ProjectsTranslations;
}

const Projects = ({ content: t }: ProjectsProps) => {
  return (
    <section id="projects" className="border-t border-gray-200 py-20 sm:py-28 dark:border-gray-700">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-4xl font-light leading-tight tracking-tight text-black sm:text-5xl lg:col-span-5 dark:text-white">
            {t.title}
          </h2>
          <p className="measure text-lg font-light leading-relaxed text-gray-600 lg:col-span-7 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="mt-16 border-t border-gray-200 dark:border-gray-700">
          {t.projects.map((project, index) => (
            <article
              key={project.id}
              aria-labelledby={`project-${project.id}`}
              className="border-b border-gray-200 py-14 dark:border-gray-700">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Prueba y datos */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="lg:sticky lg:top-24">
                    <div className="relative aspect-video overflow-hidden border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
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

                    <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</span>
                      <span className="tabular">{project.period}</span>
                      <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</span>
                      <span className="flex items-center gap-2">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {t.status[project.status]}
                      </span>
                    </p>

                    <p className="mt-6 border-t border-gray-200 pt-4 text-sm font-light leading-relaxed text-gray-600 dark:border-gray-700 dark:text-gray-400">
                      {project.technologies.join(' · ')}
                    </p>
                    {project.previousStack && (
                      <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-500">
                        <span className="text-gray-400 dark:text-gray-600">
                          {t.labels.previousStack}:{' '}
                        </span>
                        {project.previousStack.join(' · ')}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-light uppercase tracking-widest text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                          <HiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.labels.visit}
                          <span className="sr-only"> — {project.title}</span>
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-light uppercase tracking-widest text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                          <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.labels.code}
                          <span className="sr-only"> — {project.title}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* El relato */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3
                    id={`project-${project.id}`}
                    className="text-3xl font-light tracking-tight text-black sm:text-4xl dark:text-white">
                    {project.title}
                  </h3>
                  <p className="measure mt-3 text-lg font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.subtitle}
                  </p>

                  <dl className="mt-10 border-t border-gray-200 dark:border-gray-700">
                    {(
                      [
                        ['problem', project.problem],
                        ['solution', project.solution],
                        ['role', project.role],
                      ] as const
                    ).map(([key, value]) => (
                      <div
                        key={key}
                        className="grid gap-2 border-b border-gray-200 py-6 sm:grid-cols-12 sm:gap-8 dark:border-gray-700">
                        <dt className="text-xs font-medium uppercase tracking-widest text-gray-500 sm:col-span-3 dark:text-gray-500">
                          {t.labels[key]}
                        </dt>
                        <dd className="measure font-light leading-relaxed text-gray-600 sm:col-span-9 dark:text-gray-400">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <h4 className="mt-10 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    {t.labels.implementation}
                  </h4>
                  <ul className="mt-5 list-none">
                    {project.implementation.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 border-b border-gray-100 py-3 font-light leading-relaxed text-gray-600 last:border-b-0 dark:border-gray-800 dark:text-gray-400">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gray-400 dark:bg-gray-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-10 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    {t.labels.result}
                  </h4>
                  <p className="measure mt-5 border-t border-gray-300 pt-5 text-lg font-light leading-relaxed text-black dark:border-gray-600 dark:text-white">
                    {project.result}
                  </p>
                </div>
              </div>

              {/* Metricas medidas: cruzan toda la anchura */}
              {project.metrics && (
                <div className="mt-14">
                  <h4 className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    {project.metrics.title}
                  </h4>
                  <table className="mt-5 w-full border-collapse">
                    <thead>
                      <tr>
                        {project.metrics.columns.map((column) => (
                          <th
                            key={column}
                            scope="col"
                            className="border-b border-gray-300 pb-3 pr-6 text-left text-xs font-medium uppercase tracking-widest text-gray-500 dark:border-gray-600 dark:text-gray-500">
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
                                  : 'font-mono text-sm tabular text-gray-500 dark:text-gray-500'
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
