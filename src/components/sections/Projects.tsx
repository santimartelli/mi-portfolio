// Proyectos: casos de estudio, con el mismo lenguaje que About, Experiencia y
// Skills. Cabecera con el titular y la entradilla a la izquierda y, debajo, una
// tarjeta por proyecto: dentro, la prueba visual y los datos (imagen, estado,
// stack en etiquetas y enlaces) a la izquierda y, a la derecha, el relato en
// corto: que es, que se hizo y a donde llego.
//
// El detalle largo —el problema, el rol, la lista de implementacion y la tabla de
// metricas— sigue en los dos `projects.json` y en el tipo, pero no se pinta: la
// tarjeta se lee de un vistazo y el recruiter no tiene que bajar por un muro de
// texto. Si algun dia hace falta, volver a pintarlo es anadir el bloque.
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
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
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

                  <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
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

                  <ul className="mt-4 flex list-none flex-wrap gap-2">
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

                  <div className="mt-5 flex flex-wrap items-center gap-3">
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

                {/* El relato, en corto: que es, que se hizo y a donde llego. */}
                <div className="lg:col-span-7">
                  <h3
                    id={`project-${project.id}`}
                    className="text-subhead font-light text-black dark:text-white">
                    {project.title}
                  </h3>
                  <p className="measure mt-2 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.subtitle}
                  </p>

                  <p className="measure mt-5 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.solution}
                  </p>

                  <h4 className={`mt-8 ${labelClass}`}>{t.labels.result}</h4>
                  <p className="measure mt-3 border-t border-gray-300 pt-4 text-subhead font-light text-black dark:border-gray-600 dark:text-white">
                    {project.result}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
