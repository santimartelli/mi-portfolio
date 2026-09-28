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
// centro. El stack va entero, en las etiquetas compartidas con Experiencia; el
// resultado va pegado a ellas y se ve entero, sin recortar: el usuario no quiere
// puntos suspensivos, y si un resultado es largo la fila crece. El enlace se apoya
// en el borde inferior (`mt-auto`), asi que el hueco que deja una tarjeta mas alta
// cae entre el resultado y el enlace, no entre las etiquetas y el rotulo. El
// enlace es la etiqueta de la casa en versalitas, subrayada suavemente y sin caja:
// el subrayado ya es la senal de enlace.
//
// El detalle largo —el problema, la solucion, el rol, la lista de implementacion,
// el stack anterior y la tabla de metricas— sigue en los dos `projects.json` y en
// el tipo, pero no se pinta. Si algun dia hace falta, volver a pintarlo es anadir
// el bloque.
import { badgeClass } from '../common/badge';
import type { ProjectsTranslations } from '../../util/i18n';

interface ProjectsProps {
  content: ProjectsTranslations;
}

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

/** El enlace: la etiqueta de la casa en versalitas y en tinta, pero subrayada
 *  suavemente —filete gris claro, el de 1px y `0.22em` que ya trae el `a` global—
 *  y sin caja. El subrayado es la senal de enlace; el hover solo lo oscurece. */
const linkClass =
  'inline-flex text-label font-medium uppercase text-black underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:decoration-gray-500 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-400';

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
          {t.projects.map((project) => (
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
                {/* El titulo y el subtitulo van juntos: el subtitulo es su
                    continuacion, no un bloque aparte. */}
                <p className="mt-2 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {project.subtitle}
                </p>

                {/* El que, el cuando y el estado: los tres datos de la ficha. */}
                <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
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

                {/* El stack entero, en las etiquetas de la casa. */}
                <ul className="mt-5 flex list-none flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology} className={badgeClass}>
                      {technology}
                    </li>
                  ))}
                </ul>

                {/* El cierre: a donde llego el trabajo y, si el producto es
                    publico, el enlace. Va pegado a las etiquetas; el hueco que
                    deja una tarjeta mas alta cae entre el resultado y el enlace,
                    que es donde no se lee como un corte. */}
                <h4 className={`mt-6 ${labelClass}`}>{t.labels.result}</h4>
                <p className="mt-2.5 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.result}
                </p>

                {project.href && (
                  <div className="mt-auto flex flex-wrap items-center justify-end pt-5">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}>
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
