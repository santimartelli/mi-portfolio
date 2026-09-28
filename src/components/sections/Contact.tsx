// Contacto: el cierre de la pagina, con la misma familia que About, Experiencia,
// Skills y Proyectos. Cabecera apilada —titular y entradilla, como las demas
// secciones— y, debajo, dos bandas con su titulo en `subhead`: donde encontrarme,
// como **lista de piezas con punto** (el mismo marcador de About y Skills, con el
// rotulo en negrita engarzado con la linea) y la disponibilidad, que es texto.
//
// **Aqui no hay tarjetas.** El usuario pidio que el final no lo fuera todo, asi
// que cada canal es una linea con su valor enlazado en vez de una tarjeta, y el
// curriculum salio de la pagina —con la web es suficiente, dijo—: el bloque `cv`
// sigue en los dos JSON y en el tipo, pero ya no se pinta, igual que el problema o
// la solucion de un caso de estudio.
import type { ContactTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface ContactProps {
  content: ContactTranslations;
}

/** Una pieza de la lista: el mismo renglon que las de About. */
const itemClass =
  'flex gap-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400';

/** El marcador: un punto de 4px, el unico del sitio. */
const dotClass = 'mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600';

/** El valor del canal: el subrayado suave de Proyectos, sin caja. */
const valueClass =
  'text-black underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:decoration-gray-500 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-400';

/** La descripcion: el paso `sm` de Skills. */
const descriptionClass = 'text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400';

const Contact = ({ content: t }: ContactProps) => {
  const channels = [
    { id: 'email', href: `mailto:${SITE.email}`, value: SITE.email, external: false, ...t.channels.email },
    { id: 'linkedin', href: SITE.linkedin, value: SITE.linkedinHandle, external: true, ...t.channels.linkedin },
    { id: 'github', href: SITE.github, value: SITE.githubHandle, external: true, ...t.channels.github },
  ];

  return (
    <section id="contact" className="section-rule py-20 sm:py-28">
      <div className="shell">
        <h2 className="text-headline font-light text-black dark:text-white">
          {t.title}
        </h2>
        <p className="measure mt-5 text-lead font-light leading-[1.6] text-gray-600 dark:text-gray-400">
          {t.description}
        </p>
        <p className={`measure mt-4 ${descriptionClass}`}>{t.statement}</p>

        {/* Donde encontrarme: tres piezas, una por canal. El rotulo dice que es
            cada linea y el valor es lo que se pulsa. */}
        <h3 className="mt-16 text-subhead font-light text-black dark:text-white">
          {t.channelsTitle}
        </h3>
        <ul className="mt-8 list-none space-y-4">
          {channels.map((channel) => (
            <li key={channel.id} className={itemClass}>
              <span aria-hidden="true" className={dotClass} />
              <span>
                <strong className="font-semibold text-black dark:text-white">
                  {channel.label}:
                </strong>{' '}
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                  className={valueClass}>
                  {channel.value}
                </a>
                <span className="text-gray-500 dark:text-gray-400"> — {channel.description}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Disponibilidad: la banda que cierra la pagina. */}
        <h3 className="mt-16 text-subhead font-light text-black dark:text-white">
          {t.availability.title}
        </h3>
        <p className="measure mt-4 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
          {t.availability.text}
        </p>
        <p className={`measure mt-3 ${descriptionClass}`}>{t.closing}</p>
      </div>
    </section>
  );
};

export default Contact;
