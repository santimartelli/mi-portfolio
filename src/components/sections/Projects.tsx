// Proyectos: casos de estudio con problema, solucion, rol, implementacion y resultado.
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsProps {
  content: ProjectsTranslations;
}

const Projects = ({ content: t }: ProjectsProps) => {
  return (
    <section id="projects" className="border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="font-display text-h2 font-medium text-ink">{t.title}</h2>
        <p className="mt-6 max-w-measure text-lead text-body">{t.description}</p>

        <div className="mt-16 border-t border-rule">
          {t.projects.map((project) => (
            <article
              key={project.id}
              aria-labelledby={`project-${project.id}`}
              className="border-b border-rule py-14">
              <div className="relative aspect-video overflow-hidden border border-rule bg-paper-sunk">
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

              <p className="mt-8 flex flex-wrap items-center gap-x-3 font-mono text-micro uppercase text-muted">
                <span>{project.category}</span>
                <span aria-hidden="true" className="text-faint">
                  ·
                </span>
                <span>{project.period}</span>
                <span aria-hidden="true" className="text-faint">
                  ·
                </span>
                <span className="text-accent-ink">{t.status[project.status]}</span>
              </p>

              <h3 id={`project-${project.id}`} className="mt-4 font-display text-display font-medium text-ink">
                {project.title}
              </h3>
              <p className="mt-2 max-w-measure text-lead text-body">{project.subtitle}</p>

              <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
                {([['problem', project.problem], ['solution', project.solution], ['role', project.role]] as const).map(
                  ([key, value]) => (
                    <div key={key}>
                      <dt className="border-t border-rule-strong pt-4 font-mono text-micro uppercase text-muted">
                        {t.labels[key]}
                      </dt>
                      <dd className="mt-3 text-base text-body">{value}</dd>
                    </div>
                  )
                )}
              </dl>

              <div className="mt-12">
                <h4 className="font-mono text-micro uppercase text-muted">{t.labels.implementation}</h4>
                <ul className="mt-4 border-t border-rule">
                  {project.implementation.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-rule py-3 text-body">
                      <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-rule-strong" />
                      <span className="max-w-measure">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-12">
                <div className="sm:col-span-7">
                  <h4 className="font-mono text-micro uppercase text-muted">{t.labels.result}</h4>
                  <p className="mt-4 max-w-measure border-t border-rule-strong pt-4 text-lead text-ink">
                    {project.result}
                  </p>
                </div>
                <div className="sm:col-span-5">
                  <h4 className="font-mono text-micro uppercase text-muted">{t.labels.technology}</h4>
                  <p className="mt-4 border-t border-rule pt-4 text-body">
                    {project.technologies.join(' · ')}
                  </p>
                  {project.previousStack && (
                    <>
                      <h4 className="mt-8 font-mono text-micro uppercase text-muted">
                        {t.labels.previousStack}
                      </h4>
                      <p className="mt-4 border-t border-rule pt-4 text-muted">
                        {project.previousStack.join(' · ')}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {project.metrics && (
                <div className="mt-12 overflow-x-auto">
                  <h4 className="font-mono text-micro uppercase text-muted">{project.metrics.title}</h4>
                  <table className="mt-4 w-full border-collapse text-base">
                    <thead>
                      <tr>
                        {project.metrics.columns.map((column) => (
                          <th
                            key={column}
                            scope="col"
                            className="border-b border-rule-strong pb-3 pr-6 text-left font-mono text-micro uppercase text-muted">
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
                              className={`border-b border-rule py-3 pr-6 ${
                                cellIndex === 0 ? 'text-ink' : 'font-mono text-meta text-muted'
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

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] no-underline">
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
                    className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] no-underline">
                    <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.labels.code}
                    <span className="sr-only"> — {project.title}</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
