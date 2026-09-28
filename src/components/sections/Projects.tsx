// Proyectos: casos de estudio, con el mismo lenguaje que About, Experiencia y
// Skills. Cabecera con el titular y la entradilla a la izquierda y, debajo, una
// rejilla de dos columnas con una tarjeta vertical por proyecto: la captura a
// sangre, y debajo el titulo, la descripcion, los datos (categoria, periodo,
// estado y stack en etiquetas) y el relato en corto: que se hizo y a donde llego.
//
// La tarjeta no lleva relleno: lo lleva el bloque de texto. Asi la captura toca
// el borde superior y los dos laterales, y el `overflow-hidden` de la tarjeta le
// recorta las esquinas con el mismo radio.
//
// El detalle largo —el problema, el rol, la lista de implementacion y la tabla de
// metricas— sigue en los dos `projects.json` y en el tipo, pero no se pinta: la
// tarjeta se lee de un vistazo y el recruiter no tiene que bajar por un muro de
// texto. Si algun dia hace falta, volver a pintarlo es anadir el bloque.
import { HiExternalLink } from 'react-icons/hi';
import { badgeClass } from '../common/badge';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsProps {
  content: ProjectsTranslations;
}

/** La tarjeta: el mismo filete, el mismo radio y el mismo hover que Experiencia
 *  y Skills, pero sin relleno. La captura va a sangre y el texto lleva su propio
 *  bloque con relleno, asi que la tarjeta solo tiene que recortar las esquinas. */
const cardClass =
  'overflow-hidden rounded-xl border border-gray-200 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500';

/** El rotulo de un bloque: la etiqueta de la casa. */
const labelClass = 'text-label font-medium uppercase text-gray-500 dark:text-gray-400';

/** Un enlace de accion: el boton secundario del hero. */
const linkClass =
  'cta-secondary flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest';

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

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {t.projects.map((project) => (
            <article
              key={project.id}
              aria-labelledby={`project-${project.id}`}
              className={cardClass}>
              {/* La captura, a sangre contra el borde superior y los laterales:
                  la tarjeta no tiene relleno, asi que ella sola los ocupa. */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
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

              {/* El texto: el relleno que la tarjeta ya no lleva. */}
              <div className="p-6 sm:p-8">
                <h3
                  id={`project-${project.id}`}
                  className="text-title font-light text-black dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {project.subtitle}
                </p>

                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
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

                <p className="mt-4 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.solution}
                </p>

                <h4 className={`mt-6 ${labelClass}`}>{t.labels.result}</h4>
                <p className="mt-2 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.result}
                </p>

                {/* El enlace, pegado al borde derecho del bloque. Si el producto
                    no es publico, no queda ni el hueco. */}
                {project.href && (
                  <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}>
                      <HiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.labels.visit}
                      <span className="sr-only"> — {project.title}</span>
                    </a>
                  </div>
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
