// Pie: marca, navegacion, contacto, ubicacion y stack.
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
    <footer className="border-t border-rule py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-h3 font-medium text-ink">{t.brand.name}</p>
            <p className="mt-4 max-w-[34ch] text-meta text-muted">{t.brand.description}</p>
            <ul className="mt-6 flex list-none items-center gap-5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={social.label}
                    className="block text-muted no-underline transition-colors duration-200 ease-out hover:text-ink">
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t.navigation.title}>
            <h2 className="font-mono text-micro uppercase text-muted">{t.navigation.title}</h2>
            <ul className="mt-5 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-body no-underline hover:text-ink">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-micro uppercase text-muted">{t.navigation.links.contact}</h2>
            <ul className="mt-5 space-y-2">
              {contactLinks.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                    className="flex items-center gap-2 text-body no-underline hover:text-ink">
                    <contact.icon className="h-3 w-3 shrink-0 text-muted" aria-hidden="true" />
                    <span className="break-all">{contact.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-micro uppercase text-muted">{t.location.label}</h2>
            <p className="mt-5 flex items-center gap-2 text-body">
              <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-muted" aria-hidden="true" />
              {t.location.value}
            </p>
            <h2 className="mt-8 font-mono text-micro uppercase text-muted">{t.technologies.title}</h2>
            <p className="mt-5 text-meta text-muted">{t.builtWith.items.join(' · ')}</p>
          </div>
        </div>

        <p className="mt-14 border-t border-rule pt-6 font-mono text-micro uppercase text-faint">
          © {currentYear} {t.brand.name}. {t.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
