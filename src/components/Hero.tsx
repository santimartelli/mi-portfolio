import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaRocket } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import { BiCode } from "react-icons/bi";
import { useMemo, memo } from "react";

interface SocialLink {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly label: string;
}

const Hero = () => {
  const socialLinks: readonly SocialLink[] = useMemo(() => [
    {
      icon: FaGithub,
      href: "https://github.com/santimartelli",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/santiago-martelli",
      label: "LinkedIn",
    },
    {
      icon: MdEmail,
      href: "mailto:contacto@martelli.dev",
      label: "Email",
    },
  ], []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-darkbg-950 text-white overflow-hidden">
      {/* Background Pattern Moderno */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-primary/5 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
      </div>

      {/* Gradiente de Profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full opacity-60"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-32 w-1 h-1 bg-accent-secondary rounded-full opacity-40"
        />
        <motion.div
          animate={{ 
            y: [-30, 30, -30],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-32 w-3 h-3 bg-accent-tertiary rounded-full opacity-30"
        />
      </div>

      {/* Contenido Principal */}
      <div className="relative w-full max-w-6xl mx-auto px-4 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center text-center space-y-8 py-24 md:py-0">
          {/* Badge Profesional */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="theme-card flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <BiCode className="text-accent text-lg" />
            <span className="theme-text-gradient">Full Stack Developer</span>
          </motion.div>

          {/* Nombre con Animación Avanzada */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9] mb-4">
            <motion.span 
              className="text-text-primary inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Santiago{" "}
            </motion.span>
            <motion.span 
              className="theme-text-gradient inline-block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Martelli
            </motion.span>
          </motion.h1>

          {/* Descripción Elegante */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-text-tertiary leading-relaxed max-w-4xl mx-auto font-light">
            Transformo ideas en{" "}
            <motion.span 
              className="text-accent font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              experiencias digitales excepcionales
            </motion.span>
            {" "}utilizando las últimas tecnologías web. Especializado en{" "}
            <span className="text-accent-secondary font-medium">React</span>,{" "}
            <span className="text-accent-secondary font-medium">TypeScript</span> y{" "}
            <span className="text-accent-secondary font-medium">arquitecturas modernas</span>.
          </motion.p>

          {/* Botones CTA Mejorados */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <motion.a
              href="#projects"
              className="theme-button-primary px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Ver mis proyectos">
              <FaRocket className="group-hover:rotate-12 transition-transform duration-300" />
              Ver Proyectos
            </motion.a>
            <motion.a
              href="#contact"
              className="theme-button-secondary px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Ir a la sección de contacto">
              Contactar
            </motion.a>
          </motion.div>

          {/* Social Links Modernos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-4 pt-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.4 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-card p-4 rounded-xl hover:scale-110 transition-all duration-300 group"
                whileHover={{ y: -2 }}
                aria-label={link.label}>
                <link.icon className="w-6 h-6 text-text-muted group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

          {/* Indicador de Scroll Elegante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="absolute bottom-20 md:bottom-28 inset-x-0 mx-auto flex flex-col items-center gap-2">
            <span className="text-xs text-text-muted font-medium tracking-wider uppercase">
              Scroll para explorar
            </span>
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent cursor-pointer hover:text-accent-hover transition-colors duration-300">
              <HiChevronDown className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
