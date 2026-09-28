// Proyectos: casos de estudio, con la misma familia que About, Experiencia y
// Skills, y la misma cabecera y la misma rejilla de tres columnas que Skills. La
// tarjeta es vertical: la captura a sangre y, debajo, el bloque de texto con el
// relleno de Skills (24px).
//
// La tarjeta es un indice, no un caso de estudio: se barre de un vistazo. Los
// pasos de letra son los de Skills —el titulo en `title` (17px), el subtitulo y el
// resultado en `sm` (14px), el paso que Skills usa para la descripcion, y los
// datos en `label` (12px) y `ui` (13px)— y la captura va recortada a una banda 5:2
// anclada arriba, que es lo que la mantiene corta sin quedarse con un recorte del
// centro. El stack se resume a cuatro etiquetas y el resto se cuenta en un `+N`
// con los nombres completos para lectores de pantalla. El cierre se apoya en el
// borde inferior (`mt-auto`), asi que todas las tarjetas de una fila acaban a la
// misma altura, y el resultado se corta a tres lineas (`line-clamp-3`) para que el
// texto largo no estire la rejilla.
//
// El detalle largo —el problema, la solucion, el rol, la lista de implementacion
// y la tabla de metricas— sigue en los dos `projects.json` y en el tipo, pero no
// se pinta: la tarjeta se lee de un vistazo y un recruiter no tiene que bajar por
// un muro de texto. Si algun dia hace falta, volver a pintarlo es anadir el bloque.
import { HiExternalLink } from 'react-icons/hi';
import { badgeClass } from '../common/badge';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsProps {
  content: ProjectsTranslations;
}

/** Cuantas etiquetas de stack caben en una linea antes de resumir el resto. */
const MAX_TECHNOLOGIES = 4;

/** La tarjeta: el mismo filete, el mismo radio y el mismo hover que Skills, pero
 *  sin relleno —lo lleva el bloque de texto— y en columna, para que el cierre
 *  pueda apoyarse en el borde inferior. */
const cardClass =
  'flex flex-col overflow-hidden rounded-xl border border-gray-200 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500';

/** La captura, a sangre: una banda 5:2 anclada arriba, para que la tarjeta se
 *  quede corta y se vea la cabecera del producto en vez de un recorte del centro. */
const captureClass =
  'relative aspect-[5/2] w-full shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800';

/** El bloque de texto: el relleno de Skills, que es el que la tarjeta no lleva. */
const bodyClass = 'flex flex-1 flex-col p-6';

/** El rotulo de un bloque: la etiqueta de la casa. */
const labelClass = 'text-label font-medium uppercase text-gray-500 dark:text-gray-400';

/** Una linea de dato: el paso `ui` de las listas de Skills. */
const dataClass = 'text-ui font-light leading-relaxed text-gray-600 dark:text-gray-400';

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

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.projects.map((project) => {
            const visibleTechnologies = project.technologies.slice(0, MAX_TECHNOLOGIES);
            const remainingTechnologies = project.technologies.slice(MAX_TECHNOLOGIES);

            return (
              <article
                key={project.id}
                aria-labelledby={`project-${project.id}`}
                className={cardClass}>
                {/* La captura, a sangre contra el borde superior y los laterales:
                    la tarjeta no tiene relleno, asi que ella sola los ocupa. */}
                <div className={captureClass}>
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className={bodyClass}>
                  <h3
                    id={`project-${project.id}`}
                    className="text-title font-light text-black dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                    {project.subtitle}
                  </p>

                  {/* El que, el cuando y el estado: los tres datos de la ficha. */}
                  <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className={labelClass}>{project.category}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 tabular dark:text-gray-400">
                      {project.period}
                    </span>
                    <span className={`flex items-center gap-2 ${dataClass}`}>
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

                  {/* El stack, resumido: cuatro etiquetas y el resto contado, con
                      los nombres completos en texto solo para lectores de
                      pantalla. Doce etiquetas son tres renglones y el doble de
                      tarjeta; cuatro identifican el producto igual de bien. */}
                  <ul className="mt-4 flex list-none flex-wrap gap-2">
                    {visibleTechnologies.map((technology) => (
                      <li key={technology} className={badgeClass}>
                        {technology}
                      </li>
                    ))}
                    {remainingTechnologies.length > 0 && (
                      <li className={badgeClass} title={remainingTechnologies.join(' · ')}>
                        +{remainingTechnologies.length}
                        <span className="sr-only">: {remainingTechnologies.join(', ')}</span>
                      </li>
                    )}
                  </ul>
                  {project.previousStack && (
                    <p className="mt-3 text-ui font-light leading-relaxed text-gray-500 dark:text-gray-400">
                      <span className="text-gray-400 dark:text-gray-600">
                        {t.labels.previousStack}:{' '}
                      </span>
                      {project.previousStack.join(' · ')}
                    </p>
                  )}

                  {/* El cierre, apoyado en el borde inferior: a donde llego el
                      trabajo y, si el producto es publico, el enlace. */}
                  <div className="mt-auto pt-6">
                    <h4 className={labelClass}>{t.labels.result}</h4>
                    <p className="mt-2 line-clamp-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                      {project.result}
                    </p>

                    {project.href && (
                      <div className="mt-4 flex flex-wrap items-center justify-end">
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
