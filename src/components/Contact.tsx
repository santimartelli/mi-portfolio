import { motion } from "framer-motion";
import { useRef, memo } from "react";
import { useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "../util/i18n";

// Helper function to determine current locale from URL or context
const getCurrentLocale = (): string => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/en')) return 'en';
  }
  return 'es';
};

const Contact = () => {
  const { contact: t } = useTranslations();
  
  const contentRef = useRef(null);
  
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  const currentLocale = getCurrentLocale();

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: t.contact.methods.email.label,
      action: t.contact.methods.email.action,
      href: "mailto:santimartelli@gmail.com",
    },
    {
      icon: FaWhatsapp,
      label: t.contact.methods.whatsapp.label,
      action: t.contact.methods.whatsapp.action,
      href: "https://wa.me/34628434434",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/santimartelli",
      username: "@santimartelli",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/santiagomartelli/",
      username: "@santiagomartelli",
    },
  ];

  // Determine which CV to show based on current language
  const getCurrentCV = () => {
    if (currentLocale === 'en') {
      return {
        language: t.cv.english.language,
        description: t.cv.english.description,
        href: '/cv-en.pdf',
        size: t.cv.english.size,
        lastUpdate: t.cv.english.lastUpdate,
        available: true
      };
    } else {
      return {
        language: t.cv.spanish.language,
        description: t.cv.spanish.description,
        href: '/cv-es.pdf',
        size: t.cv.spanish.size,
        lastUpdate: t.cv.spanish.lastUpdate,
        available: true
      };
    }
  };

  const currentCV = getCurrentCV();

  return (
    <section
      id="contact"
      className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">

      <div ref={contentRef} className="relative w-full max-w-7xl mx-auto px-8">
        
        {/* Rothelowman-inspired Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24">
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-16">
            {t.title}
          </h2>
          
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl font-light">
            {t.description.line1}<br />
            <span className="text-gray-900 dark:text-white font-normal">{t.description.line2}</span> {t.description.line2_highlight}
          </p>
        </motion.div>

        {/* Minimal Contact Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8">
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t.contact.title}
            </h3>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 group">
                  
                  <method.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  
                  <div>
                    <div className="text-lg font-medium mb-1">
                      {method.label}
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-400">
                      {method.action}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {currentLocale === 'es' ? 'Ubicación' : 'Location'}
              </div>
              <div className="text-base text-gray-600 dark:text-gray-400">
                {currentLocale === 'es' ? 'España (Remoto Disponible)' : 'Spain (Remote Available)'}
              </div>
            </motion.div>
          </motion.div>

          {/* Professional Networks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8">
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t.socialNetworks.title}
            </h3>

            <div className="space-y-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 group">
                  
                  <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  
                  <div>
                    <div className="text-lg font-medium mb-1">
                      {social.label}
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-400 font-mono">
                      {social.username}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Why Follow - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-800">
              
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t.socialNetworks.whyFollow.title}
              </h4>
              
              <ul className="space-y-2">
                {t.socialNetworks.whyFollow.reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="text-base text-gray-600 dark:text-gray-400">
                    • {reason}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* CV Download - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8">
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t.cv.title}
            </h3>

            <motion.a
              href={currentCV.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
              
              <div className="text-lg font-medium mb-2">
                {currentCV.language}
              </div>
              <div className="text-base text-gray-600 dark:text-gray-400 mb-2">
                {currentCV.description}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {currentCV.size} • {currentCV.lastUpdate}
              </div>
            </motion.a>

            {/* CV Info - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-800">
              
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t.cv.info.title}
              </h4>
              
              <ul className="space-y-2">
                {t.cv.info.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="text-base text-gray-600 dark:text-gray-400">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Minimal Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-32">
          <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
            {t.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);