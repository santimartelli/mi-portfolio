// Pie de página: marca, navegación, contacto, ubicación y stack.
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import type { FooterTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface FooterProps {
  content: FooterTranslations;
}

const Footer = ({ content: t }: FooterProps) => {

  const currentYear = new Date().getFullYear();

  const footerRef = useRef(null);
  const bottomRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.05 });
  const isBottomInView = useInView(bottomRef, { once: true, amount: 0.05 });

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
    <footer
      ref={footerRef}
      className="relative w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-10">
          {/* Marca */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4">
              <h3 className="text-xl font-light text-black dark:text-white tracking-tight">
                {t.brand.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm max-w-md">
                {t.brand.description}
              </p>
              <ul className="list-none flex items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={social.label}
                      className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                      <social.icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Navegación */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label={t.navigation.title}>
            <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase mb-4">
              {t.navigation.title}
            </h4>
            <ul className="list-none space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 font-light text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase mb-4">
              {t.navigation.links.contact}
            </h4>
            <ul className="list-none space-y-2">
              {contactLinks.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external
                      ? { target: '_blank', rel: 'noopener noreferrer me' }
                      : {})}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 font-light text-sm">
                    <contact.icon className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span className="break-all">{contact.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ubicación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase mb-4">
              {t.location.label}
            </h4>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-light text-sm">
              <FaMapMarkerAlt className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>{t.location.value}</span>
            </p>
          </motion.div>

          {/* Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}>
            <h4 className="text-sm font-medium text-black dark:text-white tracking-tight uppercase mb-4">
              {t.technologies.title}
            </h4>
            <ul className="list-none space-y-1">
              {t.builtWith.items.map((tech) => (
                <li key={tech} className="text-gray-600 dark:text-gray-400 font-light text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Línea inferior */}
        <div ref={bottomRef} className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isBottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 dark:text-gray-500 font-light text-xs">
              © {currentYear} {t.brand.name}. {t.copyright}
            </p>
            <p className="text-gray-500 dark:text-gray-500 font-light text-xs">
              {t.builtWith.label}: {t.builtWith.items.join(' · ')}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
