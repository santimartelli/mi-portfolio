// Pie: marca, navegacion, contacto, ubicacion y stack en una rejilla ancha.
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import type { FooterTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface FooterProps {
  content: FooterTranslations;
}

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
    <footer className="border-t border-gray-200 py-16 dark:border-gray-700">
      <div className="shell">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div>
            <p className="text-title font-medium text-black dark:text-white">{t.brand.name}</p>
            <p className="mt-4 max-w-[38ch] text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.brand.description}
            </p>
            <ul className="mt-6 flex list-none items-center gap-5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={social.label}
                    className="block text-gray-500 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t.navigation.title}>
            <h2 className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t.navigation.title}
            </h2>
            <ul className="mt-5 list-none space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-light text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t.navigation.links.contact}
            </h2>
            <ul className="mt-5 list-none space-y-2">
              {contactLinks.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                    className="flex items-center gap-2 font-light text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    <contact.icon className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />
                    <span className="break-all">{contact.value}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t.location.label}
            </h2>
            <p className="mt-5 flex items-center gap-2 font-light text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />
              {t.location.value}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t.technologies.title}
            </h2>
            <p className="mt-5 font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.builtWith.items.join(' · ')}
            </p>
            <h2 className="mt-8 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t.builtWith.label}
            </h2>
            <p className="mt-5 font-light leading-relaxed text-gray-500 dark:text-gray-400">
              {t.brand.name}
            </p>
          </div>
        </div>

        <p className="mt-14 border-t border-gray-200 pt-6 text-xs font-light text-gray-500 dark:border-gray-700 dark:text-gray-400">
          © {currentYear} {t.brand.name}. {t.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
