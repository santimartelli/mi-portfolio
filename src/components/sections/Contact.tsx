// Contacto: CTA, canales y CV. Filas anchas con filete, sin tarjetas.
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaClock } from 'react-icons/fa';
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
    <section id="contact" className="section-rule py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-headline font-light text-black dark:text-white">
              {t.title}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="measure text-lead font-light text-gray-600 dark:text-gray-400">
              {t.description}
            </p>
            <p className="measure mt-5 font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.statement}
            </p>
          </div>
        </div>

        {/* Canales */}
        <h3 className="mt-16 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {t.channelsTitle}
        </h3>
        <ul className="mt-6 list-none">
          {channels.map((channel) => (
            <li key={channel.id} className="border-b border-gray-200 dark:border-gray-700">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                className="grid items-baseline gap-2 py-5 transition-colors duration-200 hover:bg-gray-50 lg:grid-cols-12 lg:gap-12 dark:hover:bg-gray-900/40">
                <span className="flex items-center gap-3 lg:col-span-3">
                  <channel.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    {channel.label}
                  </span>
                </span>
                <span className="font-light text-gray-900 lg:col-span-4 dark:text-gray-100">
                  {channel.value}
                </span>
                <span className="text-sm font-light text-gray-500 lg:col-span-5 dark:text-gray-400">
                  {channel.description}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* CV */}
        <h3 className="mt-16 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {t.cv.title}
        </h3>
        <p className="measure mt-4 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
          {t.cv.summary}
        </p>
        <ul className="mt-6 list-none border-t border-gray-200 dark:border-gray-700">
          {t.cv.files.map((file) => {
            const meta = getCvMetadata(file.id as CvLocale);
            return (
              <li key={file.id} className="border-b border-gray-200 dark:border-gray-700">
                <a
                  href={meta.href}
                  download={CV_FILES[file.id as CvLocale]}
                  className="grid items-baseline gap-2 py-5 transition-colors duration-200 hover:bg-gray-50 lg:grid-cols-12 lg:gap-12 dark:hover:bg-gray-900/40">
                  <span className="flex items-center gap-3 lg:col-span-3">
                    <FaDownload className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                    <span className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {file.language} · {file.label}
                    </span>
                  </span>
                  <span className="font-light text-gray-900 lg:col-span-4 dark:text-gray-100">
                    {file.description}
                  </span>
                  <span className="font-mono text-xs text-gray-500 tabular lg:col-span-5 dark:text-gray-400">
                    PDF · {meta.size} · {meta.lastUpdate}
                  </span>
                </a>
              </li>
            );
          })}

          {/* Hueco preparado para el CV de Hotel Tech: el archivo no existe y no se inventa. */}
          <li className="grid items-baseline gap-2 border-b border-gray-200 py-5 lg:grid-cols-12 lg:gap-12 dark:border-gray-700">
            <span className="flex items-center gap-3 lg:col-span-3">
              <FaClock className="h-4 w-4 text-gray-400 dark:text-gray-600" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {t.cv.hotelTech.title}
              </span>
            </span>
            <span className="font-light text-gray-500 lg:col-span-4 dark:text-gray-400">
              {t.cv.hotelTech.description}
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-400 lg:col-span-5 dark:text-gray-600">
              {t.cv.hotelTech.status}
            </span>
          </li>
        </ul>

        {/* Disponibilidad */}
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h3 className="text-subhead font-light text-black dark:text-white">
            {t.availability.title}
          </h3>
          <p className="measure mt-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
            {t.availability.text}
          </p>
          <p className="measure mt-3 font-light leading-relaxed text-gray-500 dark:text-gray-400">
            {t.closing}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
