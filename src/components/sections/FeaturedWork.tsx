// Banda de trabajo destacado: cierra el primer viewport con la prueba visual.
// Anatomia fija al estilo de las bandas de tarjetas: etiqueta corta arriba,
// imagen debajo, todo el bloque enlazado al caso de estudio.
// Sin estado y sin animaciones, asi que se renderiza en el servidor.
import type { ProjectsTranslations } from '../../util/i18n';

interface FeaturedWorkProps {
  content: ProjectsTranslations;
}

const FeaturedWork = ({ content: t }: FeaturedWorkProps) => {
  const featured = t.projects.slice(0, 4);

  return (
    <section aria-label={t.title} className="pb-20 sm:pb-28">
      <div className="shell">
        <ul className="grid list-none grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((project) => (
            <li key={project.id}>
              <a href={`#project-${project.id}`} className="group block">
                <span className="mb-3 block text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                  {project.category}
                </span>
                <span className="block overflow-hidden border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 block text-sm font-medium text-black dark:text-white">
                  {project.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedWork;
