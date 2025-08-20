import { motion } from "framer-motion";
import { useRef, memo } from "react";
import { useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaFilePdf, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiLocationMarker } from "react-icons/hi";
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
  
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  const currentLocale = getCurrentLocale();

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: t.contact.methods.email.label,
      action: t.contact.methods.email.action,
      href: "mailto:santimartelli@gmail.com",
      color: "text-blue-400",
      hoverColor: "hover:bg-blue-500/10 hover:border-blue-500/30",
      bgGradient: "from-blue-500/10 to-blue-600/10",
    },
    {
      icon: FaWhatsapp,
      label: t.contact.methods.whatsapp.label,
      action: t.contact.methods.whatsapp.action,
      href: "https://wa.me/34628434434",
      color: "text-green-400",
      hoverColor: "hover:bg-green-500/10 hover:border-green-500/30",
      bgGradient: "from-green-500/10 to-green-600/10",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/santimartelli",
      username: "santimartelli",
      color: "text-gray-400",
      hoverColor: "hover:bg-gray-500/10 hover:border-gray-500/30",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/santiagomartelli/",
      username: "santiagomartelli",
      color: "text-blue-400",
      hoverColor: "hover:bg-blue-500/10 hover:border-blue-500/30",
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
      ref={sectionRef}
      className="relative w-full bg-darkbg-950 py-24 md:py-32">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/2 to-transparent" />

      <div ref={contentRef} className="relative w-full max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {t.title}
          </h2>
          
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          
          <p className="text-lg text-text-tertiary max-w-2xl mx-auto leading-relaxed">
            {t.description.line1} <br />
            <span className="text-accent font-semibold">{t.description.line2}</span> {t.description.line2_highlight}
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6">
            
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              {t.contact.title}
            </h3>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border border-border-secondary transition-all duration-300 group bg-bg-secondary/20 ${method.hoverColor}`}>
                  
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${method.bgGradient} transition-colors duration-300`}>
                    <method.icon className={`w-5 h-5 ${method.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary mb-1">
                      {method.label}
                    </div>
                    <div className="text-xs text-text-muted group-hover:text-accent transition-colors duration-300">
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
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-border-secondary bg-bg-secondary/20">
              
              <div className="p-3 rounded-lg bg-purple-500/10">
                <HiLocationMarker className="w-5 h-5 text-purple-400" />
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary mb-1">
                  {currentLocale === 'es' ? 'Ubicación' : 'Location'}
                </div>
                <div className="text-xs text-text-muted">
                  {currentLocale === 'es' ? 'España (Remoto Disponible)' : 'Spain (Remote Available)'}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Professional Networks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6">
            
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              {t.socialNetworks.title}
            </h3>

            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border border-border-secondary transition-all duration-300 group bg-bg-secondary/20 ${social.hoverColor}`}>
                  
                  <div className="p-3 rounded-lg bg-bg-primary/50">
                    <social.icon className={`w-5 h-5 ${social.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary mb-1">
                      {social.label}
                    </div>
                    <div className="text-xs text-text-muted font-mono group-hover:text-accent transition-colors duration-300">
                      @{social.username}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Why Follow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="p-4 rounded-lg border border-border-secondary bg-bg-secondary/20">
              
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                {t.socialNetworks.whyFollow.title}
              </h4>
              
              <ul className="space-y-2">
                {t.socialNetworks.whyFollow.reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-text-tertiary">
                    <div className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* CV Download */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6">
            
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              {t.cv.title}
            </h3>

            <motion.a
              href={currentCV.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-border-secondary hover:border-accent/30 transition-all duration-300 group bg-bg-secondary/20 hover:bg-bg-secondary/40">
              
              <div className="p-3 rounded-lg bg-red-500/10">
                <FaFilePdf className="w-5 h-5 text-red-400" />
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary mb-1">
                  {currentCV.language}
                </div>
                <div className="text-xs text-text-muted group-hover:text-accent transition-colors duration-300">
                  {currentCV.description}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-accent font-medium">{currentCV.size}</div>
                <div className="text-xs text-text-muted">{currentCV.lastUpdate}</div>
              </div>
            </motion.a>

            {/* CV Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-4 rounded-lg border border-border-secondary bg-bg-secondary/20">
              
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                {t.cv.info.title}
              </h4>
              
              <ul className="space-y-2">
                {t.cv.info.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-text-tertiary">
                    <div className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16">
          <p className="text-text-muted text-sm">
            {t.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);