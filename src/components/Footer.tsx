import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiSparkles, HiHeart, HiCode } from "react-icons/hi";
import { BiRocket } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  const navItems = [
    { name: "Inicio", href: "#home" },
    { name: "Sobre mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/santimartelli", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/santiago-martelli", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:contacto@martelli.dev", label: "Email" },
  ];

  const technologies = [
    "React", "Vue", "TypeScript", "Node.js", "Laravel", "Astro",
    "HTML", "CSS", "Tailwind CSS", "Express.js", "PHP", "Go",
    "MySQL", "Docker", "Git", "WordPress"
  ];

  return (
    <footer ref={footerRef} className="relative w-full bg-darkbg-950 text-white overflow-hidden">
      {/* Background Moderno */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/3 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Top divider with modern gradient */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6">
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  <span className="theme-text-gradient">Santiago Martelli</span>
                </h3>
                <p className="text-text-tertiary text-sm md:text-base max-w-md leading-relaxed">
                  Desarrollo web moderno centrado en la experiencia de usuario, 
                  rendimiento excepcional y código limpio que marca la diferencia.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="p-3 theme-card rounded-xl hover:scale-110 transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                  >
                    <social.icon className="w-5 h-5 text-accent group-hover:text-text-primary transition-colors duration-300" />
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
              <h4 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <BiRocket className="w-4 h-4" />
                Navegación
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
                      className="text-text-muted hover:text-accent text-sm transition-all duration-300 hover:translate-x-1 inline-block">
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
              <h4 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <HiCode className="w-4 h-4" />
                Tecnologías
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 8).map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.2, delay: 0.6 + index * 0.03 }}
                    className="px-2.5 py-1 text-xs font-medium theme-card rounded-md hover:bg-accent/10 hover:text-accent hover:scale-105 transition-all duration-300">
                    {tech}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-text-muted">
                +{technologies.length - 8} más tecnologías
              </p>
            </motion.div>
          </div>
        </div>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-xs text-text-muted">
              &copy; {currentYear} Santiago Martelli. Todos los derechos reservados.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-2 text-xs text-text-muted">
            <span>Desarrollado con</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <HiHeart className="w-3 h-3 text-red-400" />
            </motion.div>
            <span>y</span>
            <HiSparkles className="w-3 h-3 text-accent" />
            <span>desde Argentina</span>
          </motion.div>
        </div>

        {/* Call to Action Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mt-12 pt-8 border-t border-border-secondary">
          <p className="text-text-tertiary mb-4">
            ¿Tienes un proyecto en mente?
          </p>
          <motion.a
            href="#contact"
            className="theme-button-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiSparkles />
            ¡Hablemos!
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
