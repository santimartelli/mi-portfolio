// Contacto: el cierre de la pagina, con la misma familia que About, Experiencia,
// Skills y Proyectos. Cabecera apilada —titular y entradilla, como las demas
// secciones— y, debajo, **dos columnas**: a la izquierda el contacto directo y a
// la derecha la disponibilidad.
//
// Cada canal es una linea con el icono del canal en el sitio del punto —es lo que
// dice de donde es cada valor, no un adorno—, el rotulo en negrita engarzado y el
// valor enlazado con el subrayado suave de un caso de estudio. **Aqui no hay
// tarjetas**: el usuario pidio que el final no lo fuera todo. El curriculum salio
// de la pagina —con la web es suficiente, dijo—: el bloque `cv` sigue en los dos
// JSON y en el tipo, pero ya no se pinta, igual que el problema o la solucion de
// un caso de estudio.
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import type { ContactTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface ContactProps {
  content: ContactTranslations;
}

/** Una pieza de la lista: el mismo renglon que las de About. */
const itemClass =
  'flex gap-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400';

/** El icono del canal: alineado con la primera linea del texto. */
const channelIconClass = 'mt-[0.2em] h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400';

/** El valor del canal: el subrayado suave de Proyectos, sin caja. */
const valueClass =
  'text-black underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:decoration-gray-500 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-400';

/** La descripcion: el paso `sm` de Skills. */
const descriptionClass = 'text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400';

const Contact = ({ content: t }: ContactProps) => {
  // Los cuatro accesos directos, en el orden en que el usuario los pidio. El
  // correo abre el cliente de correo y WhatsApp la aplicacion; LinkedIn y GitHub
  // abren en pestana nueva.
  const channels = [
    { id: 'linkedin', icon: FaLinkedin, href: SITE.linkedin, value: SITE.linkedinHandle, external: true, ...t.channels.linkedin },
    { id: 'email', icon: FaEnvelope, href: `mailto:${SITE.email}`, value: SITE.email, external: false, ...t.channels.email },
    { id: 'whatsapp', icon: FaWhatsapp, href: SITE.whatsapp, value: SITE.phone, external: true, ...t.channels.whatsapp },
    { id: 'github', icon: FaGithub, href: SITE.github, value: SITE.githubHandle, external: true, ...t.channels.github },
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

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* El contacto directo: una linea por canal. */}
          <div>
            <h3 className="text-subhead font-light text-black dark:text-white">
              {t.channelsTitle}
            </h3>
            <ul className="mt-6 list-none space-y-4">
              {channels.map((channel) => (
                <li key={channel.id} className={itemClass}>
                  <channel.icon className={channelIconClass} aria-hidden="true" />
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
          </div>

          {/* La disponibilidad, que es texto. */}
          <div>
            <h3 className="text-subhead font-light text-black dark:text-white">
              {t.availability.title}
            </h3>
            <p className="mt-6 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
              {t.availability.text}
            </p>
            <p className={`mt-3 ${descriptionClass}`}>{t.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
