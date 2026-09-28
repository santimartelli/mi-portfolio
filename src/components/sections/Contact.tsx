// Contacto: el cierre de la pagina, con la misma familia que About, Experiencia,
// Skills y Proyectos. Cabecera apilada —titular y entradilla, como las demas
// secciones— y, debajo, tres bandas con su titulo en `subhead`: donde
// encontrarme (una tarjeta por canal), el curriculum (una por idioma mas el hueco
// del CV de hotel tech, que no se inventa) y la disponibilidad.
//
// Las tarjetas repiten la anatomia de Skills y Proyectos: filete de 1px, radio de
// 12px, relleno de 24px y el mismo hover de borde, con el titulo en `title`
// (17px), la descripcion en `sm` (14px) y las lineas de dato en `ui` (13px) y en
// mono. Antes eran filas anchas de 12 columnas con el fondo aclarado en hover: la
// unica forma del sitio que no era ni banda ni tarjeta, y el usuario pidio que el
// final hablara el mismo idioma que el resto.
import type { ContactTranslations } from '../../util/i18n';
import { CV_FILES, SITE } from '../../util/site';
import { getCvMetadata, type CvLocale } from '../../util/cvMetadata';

interface ContactProps {
  content: ContactTranslations;
}

/** La tarjeta: la misma que Skills y Proyectos. */
const cardClass =
  'rounded-xl border border-gray-200 p-6 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500';

/** La tarjeta que ademas es un enlace: el hover del borde lo comparte el valor,
 *  que lleva el subrayado suave de Proyectos y se oscurece con el `group`. */
const cardLinkClass = `group block ${cardClass}`;

/** El rotulo de un bloque: la etiqueta de la casa. */
const labelClass = 'text-label font-medium uppercase text-gray-500 dark:text-gray-400';

/** El valor de un canal dentro de la tarjeta enlazada. */
const channelValueClass =
  'underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out group-hover:decoration-gray-500 dark:decoration-gray-600 dark:group-hover:decoration-gray-400';

/** Un enlace de accion: texto subrayado suavemente, como el de Proyectos. */
const linkClass =
  'inline-flex text-label font-medium uppercase text-black underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:decoration-gray-500 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-400';

/** La linea de dato en mono: el periodo de una tarjeta de Proyectos. */
const metaClass =
  'font-mono text-xs uppercase tracking-widest text-gray-500 tabular dark:text-gray-400';

/** La descripcion de una tarjeta: el paso `sm` de Skills. */
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

        {/* Donde encontrarme: una tarjeta por canal, y la tarjeta entera es el
            enlace, asi que el blanco de pulsacion es el bloque completo. */}
        <h3 className="mt-16 text-subhead font-light text-black dark:text-white">
          {t.channelsTitle}
        </h3>
        <ul className="mt-8 grid list-none gap-6 lg:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                className={cardLinkClass}>
                <p className={labelClass}>{channel.label}</p>
                <p className={`mt-2 text-title font-light text-black dark:text-white ${channelValueClass}`}>
                  {channel.value}
                </p>
                <p className={`mt-3 ${descriptionClass}`}>{channel.description}</p>
              </a>
            </li>
          ))}
        </ul>

        {/* Curriculum: una tarjeta por idioma con su descarga, y el hueco del CV
            de hotel tech, que sigue sin publicarse y por eso no lleva enlace. */}
        <h3 className="mt-16 text-subhead font-light text-black dark:text-white">
          {t.cv.title}
        </h3>
        <p className={`measure mt-4 ${descriptionClass}`}>{t.cv.summary}</p>
        <ul className="mt-8 grid list-none gap-6 lg:grid-cols-3">
          {t.cv.files.map((file) => {
            const meta = getCvMetadata(file.id as CvLocale);
            return (
              <li key={file.id} className={`flex flex-col ${cardClass}`}>
                <p className={labelClass}>{file.language}</p>
                <h4 className="mt-2 text-title font-light text-black dark:text-white">
                  {file.label}
                </h4>
                <p className={`mt-3 ${descriptionClass}`}>{file.description}</p>
                <p className={`mt-auto pt-6 ${metaClass}`}>
                  PDF · {meta.size} · {meta.lastUpdate}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-end">
                  <a
                    href={meta.href}
                    download={CV_FILES[file.id as CvLocale]}
                    className={linkClass}>
                    {t.cv.download}
                  </a>
                </div>
              </li>
            );
          })}

          <li className={`flex flex-col ${cardClass}`}>
            <p className={labelClass}>{t.cv.hotelTech.status}</p>
            <h4 className="mt-2 text-title font-light text-black dark:text-white">
              {t.cv.hotelTech.title}
            </h4>
            <p className={`mt-3 ${descriptionClass}`}>{t.cv.hotelTech.description}</p>
          </li>
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
