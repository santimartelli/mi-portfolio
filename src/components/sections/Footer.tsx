// Pie: marca, navegacion y contacto, en tres columnas y sin tarjetas —el pie no
// es una seccion—. El usuario pidio quitarle el bloque del stack («Stack /
// Astro · React · TypeScript · Tailwind CSS») y el de «Construido con», asi que
// se queda en lo que sirve de verdad: quien es, adonde ir y como escribirle. Los
// dos campos siguen en los dos `footer.json` y en el tipo, sin pintarse.
//
// Alto: el pie se queda en tres bloques en vez de cuatro, los seis enlaces de
// navegacion van en **dos columnas** —la mitad de renglones—, el aire de dentro
// baja un escalon, y **la ubicacion y los dos iconos se mudan a la linea de
// cierre**, junto al aviso legal, que es una linea que ya existia: asi no suman
// un renglon mas arriba y el pie baja de cuatro renglones de contenido a tres. El
// padding de arriba no se toca: tiene que seguir siendo el mismo que Contact deja
// abajo (5rem y 7rem) para que la regla que separa las dos piezas quede centrada
// entre las dos. El de abajo baja de 4rem a 2,5rem.
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import type { FooterTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface FooterProps {
  content: FooterTranslations;
}

/** El rotulo de una columna: la etiqueta de la casa. */
const labelClass = 'text-label font-medium uppercase text-gray-500 dark:text-gray-400';

/** Un enlace del pie: el paso `sm` del cuerpo y el hover de siempre. */
const linkClass =
  'text-sm font-light text-gray-600 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white';

/** La linea de cierre: el paso `ui`, un escalon por debajo del cuerpo. */
const closingClass = 'text-ui font-light text-gray-500 dark:text-gray-400';

const Footer = ({ content: t }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: t.navigation.links.home, href: '#home' },
    { name: t.navigation.links.about, href: '#about' },
    { name: t.navigation.links.experience, href: '#experience' },
    { name: t.navigation.links.skills, href: '#skills' },
    { name: t.navigation.links.projects, href: '#projects' },
    { name: t.navigation.links.contact, href: '#contact' },
  ];

  const contactLinks = [
    { icon: FaEnvelope, href: `mailto:${SITE.email}`, label: 'Email', value: SITE.email, external: false },
    { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn', value: SITE.linkedinHandle, external: true },
    { icon: FaGithub, href: SITE.github, label: 'GitHub', value: SITE.githubHandle, external: true },
  ];

  const socialLinks = [
    { icon: FaGithub, href: SITE.github, label: 'GitHub' },
    { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="section-rule pt-20 pb-10 sm:pt-28">
      <div className="shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <p className="text-title font-light text-black dark:text-white">{t.brand.name}</p>
            <p className="mt-3 max-w-[38ch] text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.brand.description}
            </p>
          </div>

          {/* Los seis enlaces, en dos columnas: tres renglones en vez de seis. */}
          <nav aria-label={t.navigation.title}>
            <h2 className={labelClass}>{t.navigation.title}</h2>
            <ul className="mt-4 list-none columns-2 gap-x-6 space-y-2">
              {navItems.map((item) => (
                <li key={item.name} className="break-inside-avoid">
                  <a href={item.href} className={linkClass}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={labelClass}>{t.navigation.links.contact}</h2>
            <ul className="mt-4 list-none space-y-2">
              {contactLinks.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                    className={`flex items-center gap-2 ${linkClass}`}>
                    <contact.icon className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />
                    <span className="break-all">{contact.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* El cierre, en una sola linea: el aviso legal a la izquierda y, a la
            derecha, donde esta y los dos iconos. Es la linea que ya estaba, asi
            que la ubicacion no cuesta ni un renglon de alto. */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-gray-200 pt-5 dark:border-gray-700">
          <p className={closingClass}>
            © {currentYear} {t.brand.name}. {t.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className={`flex items-center gap-2 ${closingClass}`}>
              <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />
              {t.location.value}
            </p>
            <ul className="flex list-none items-center gap-5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={social.label}
                    className="block text-gray-500 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white">
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
