import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiHeart } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslations } from "../util/i18n";

const Footer = () => {
  const { footer: t } = useTranslations();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  const navItems = [
    { name: t.navigation.links.home, href: "#home" },
    { name: t.navigation.links.about, href: "#about" },
    { name: t.navigation.links.projects, href: "#projects" },
    { name: t.navigation.links.contact, href: "#contact" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/santimartelli", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/santiagomartelli/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:santimartelli@gmail.com", label: "Email" },
  ];

  const technologies = [
    "React", "Vue", "TypeScript", "Node.js", "Laravel", "Astro",
    "HTML", "CSS"
  ];

  return (
    <footer ref={footerRef} className="relative w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">

      <div className="relative max-w-7xl mx-auto px-8 py-16">
        {/* Minimal Main Content */}
        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          {/* Brand Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6">
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.brand.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.brand.description}
                </p>
              </div>

              {/* Simple Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.navigation.title}
              </h4>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Technologies */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.technologies.title}
              </h4>
              <div className="space-y-2">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                    className="text-gray-600 dark:text-gray-400">
                    {tech}
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-500">
                +{8} {t.technologies.moreText}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Minimal Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 dark:text-gray-500">
                &copy; {currentYear} {t.brand.name}. {t.copyright}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <span>{t.madeWith.developedWith}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <HiHeart className="w-4 h-4 text-red-500" />
              </motion.div>
              <span>{t.madeWith.and}</span>
              <span className="text-gray-600 dark:text-gray-400">⚡</span>
              <span>{t.madeWith.from} {t.madeWith.location}</span>
            </div>
          </div>

          {/* Simple Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.cta.question}
            </p>
            <motion.a
              href="#contact"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1"
              whileHover={{ y: -1 }}
            >
              {t.cta.button}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;