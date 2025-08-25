import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiSparkles, HiHeart, HiCode } from "react-icons/hi";
import { BiRocket } from "react-icons/bi";
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
    "HTML", "CSS", "Tailwind CSS", "Express.js", "PHP", "Go",
    "MySQL", "Docker", "Git", "WordPress"
  ];

  return (
    <footer ref={footerRef} className="relative w-full bg-darkbg-950 text-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-accent-primary/2 to-transparent" />

      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6">
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-text-primary">
                  {t.brand.name}
                </h3>
                <p className="text-text-tertiary text-sm leading-relaxed max-w-sm">
                  {t.brand.description}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="p-3 rounded-lg border border-border-secondary/50 hover:border-accent/30 transition-all duration-300 group bg-bg-secondary/10 hover:bg-bg-secondary/20 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/5"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors duration-300" />
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4">
              <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <BiRocket className="w-4 h-4 text-accent" />
                {t.navigation.title}
              </h4>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      className="text-text-muted hover:text-accent text-sm transition-all duration-300 block hover:translate-x-1">
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4">
              <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <HiCode className="w-4 h-4 text-accent" />
                {t.technologies.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 8).map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.2, delay: 0.6 + index * 0.03 }}
                    className="px-2.5 py-1 text-xs font-medium rounded border border-border-secondary/50 bg-bg-secondary/10 text-text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 cursor-default hover:scale-105">
                    {tech}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-text-muted">
                +{technologies.length - 8} {t.technologies.moreText}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-border-secondary to-transparent mb-8"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center md:text-left">
            <p className="text-xs text-text-muted">
              &copy; {currentYear} {t.brand.name}. {t.copyright}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-2 text-xs text-text-muted">
            <span>{t.madeWith.developedWith}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <HiHeart className="w-3 h-3 text-red-400" />
            </motion.div>
            <span>{t.madeWith.and}</span>
            <HiSparkles className="w-3 h-3 text-accent" />
            <span>{t.madeWith.from} {t.madeWith.location}</span>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mt-12 pt-8 border-t border-border-secondary">
          <p className="text-text-tertiary mb-4 text-sm">
            {t.cta.question}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border-secondary hover:border-accent/30 transition-all duration-300 group bg-bg-secondary/20 hover:bg-bg-secondary/40 text-sm font-medium text-text-primary hover:text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiSparkles className="w-4 h-4" />
            {t.cta.button}
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;