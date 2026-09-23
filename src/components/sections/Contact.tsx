// Contacto: el CTA, los canales y el CV. Filas editoriales con filetes, sin tarjetas.
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import type { ContactTranslations } from '../../util/i18n';
import { CV_FILES, SITE } from '../../util/site';
import { getCvMetadata, type CvLocale } from '../../util/cvMetadata';

interface ContactProps {
  content: ContactTranslations;
}

const Contact = ({ content: t }: ContactProps) => {
  const channels = [
    { id: 'email', icon: FaEnvelope, href: `mailto:${SITE.email}`, value: SITE.email, external: false, ...t.channels.email },
    { id: 'linkedin', icon: FaLinkedin, href: SITE.linkedin, value: SITE.linkedinHandle, external: true, ...t.channels.linkedin },
    { id: 'github', icon: FaGithub, href: SITE.github, value: SITE.githubHandle, external: true, ...t.channels.github },
  ];

  return (
    <section id="contact" className="border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="font-display text-h2 font-medium text-ink">{t.title}</h2>
        <p className="mt-6 max-w-measure text-lead text-body">{t.description}</p>
        <p className="mt-4 max-w-measure text-body text-muted">{t.statement}</p>

        <h3 className="mt-16 font-display text-h3 font-medium text-ink">{t.channelsTitle}</h3>
        <ul className="mt-6 border-t border-rule">
          {channels.map((channel) => (
            <li key={channel.id} className="border-b border-rule">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                className="grid gap-1 py-5 no-underline transition-colors duration-200 ease-out hover:bg-accent-wash sm:grid-cols-12 sm:items-baseline sm:gap-8">
                <span className="flex items-center gap-3 sm:col-span-3">
                  <channel.icon className="h-4 w-4 text-muted" aria-hidden="true" />
                  <span className="font-mono text-micro uppercase text-muted">{channel.label}</span>
                </span>
                <span className="text-ink sm:col-span-4">{channel.value}</span>
                <span className="text-meta text-muted sm:col-span-5">{channel.description}</span>
              </a>
            </li>
          ))}
        </ul>

        <h3 className="mt-16 font-display text-h3 font-medium text-ink">{t.cv.title}</h3>
        <p className="mt-6 max-w-measure text-body text-muted">{t.cv.summary}</p>
        <ul className="mt-6 border-t border-rule">
          {t.cv.files.map((file) => {
            const meta = getCvMetadata(file.id as CvLocale);
            return (
              <li key={file.id} className="border-b border-rule">
                <a
                  href={meta.href}
                  download={CV_FILES[file.id as CvLocale]}
                  className="grid gap-1 py-5 no-underline transition-colors duration-200 ease-out hover:bg-accent-wash sm:grid-cols-12 sm:items-baseline sm:gap-8">
                  <span className="flex items-center gap-3 sm:col-span-3">
                    <FaDownload className="h-4 w-4 text-muted" aria-hidden="true" />
                    <span className="font-mono text-micro uppercase text-muted">
                      {file.language} · {file.label}
                    </span>
                  </span>
                  <span className="text-ink sm:col-span-4">{file.description}</span>
                  <span className="font-mono text-meta text-muted sm:col-span-5">
                    PDF · {meta.size} · {meta.lastUpdate}
                  </span>
                </a>
              </li>
            );
          })}

          {/* Hueco preparado para el CV de Hotel Tech: no existe el archivo, no se inventa. */}
          <li className="grid gap-1 border-b border-rule py-5 sm:grid-cols-12 sm:items-baseline sm:gap-8">
            <span className="font-mono text-micro uppercase text-faint sm:col-span-3">
              {t.cv.hotelTech.title}
            </span>
            <span className="text-muted sm:col-span-4">{t.cv.hotelTech.description}</span>
            <span className="font-mono text-micro uppercase text-faint sm:col-span-5">
              {t.cv.hotelTech.status}
            </span>
          </li>
        </ul>

        <div className="mt-16 border-t border-rule pt-8">
          <h3 className="font-display text-h3 font-medium text-ink">{t.availability.title}</h3>
          <p className="mt-4 max-w-measure text-body">{t.availability.text}</p>
          <p className="mt-3 max-w-measure text-body text-muted">{t.closing}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
