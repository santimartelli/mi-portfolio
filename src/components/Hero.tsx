import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
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
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: MdEmail,
      href: "mailto:your@email.com",
      label: "Email",
    },
  ], []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#0B0C10] text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-transparent to-[#0B0C10] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center text-center space-y-8 py-24 md:py-0">
          {/* Developer Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2833] border border-[#45A29E]/20 text-sm font-medium mb-4">
            <FaCode className="text-[#66FCF1]" />
            <span className="text-[#66FCF1]">Full Stack Developer</span>
          </motion.div>
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <span className="text-white">Santiago </span>
            <span className="bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-transparent bg-clip-text">Martelli</span>
          </motion.h1>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#C5C6C7] leading-relaxed max-w-3xl mx-auto font-light">
            Creando experiencias digitales <span className="text-[#66FCF1]">innovadoras</span> y{" "}
            <span className="text-[#66FCF1]">escalables</span>. Especializado en desarrollo web moderno con React,
            TypeScript y arquitecturas cloud-native.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6 justify-center pt-8">
            <a
              href="#projects"
              className="px-8 py-4 bg-[#66FCF1] text-[#0B0C10] rounded-lg font-semibold hover:bg-[#45A29E] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#66FCF1] focus:ring-offset-2 focus:ring-offset-[#0B0C10]"
              aria-label="Ver mis proyectos">
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-[#66FCF1] text-[#66FCF1] rounded-lg font-semibold hover:bg-[#66FCF1]/10 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#66FCF1] focus:ring-offset-2 focus:ring-offset-[#0B0C10]"
              aria-label="Ir a la sección de contacto">
              Contactar
            </a>
          </motion.div>
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-6 pt-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5C6C7] hover:text-[#66FCF1] transition-all duration-300 p-3 bg-[#1F2833] rounded-lg border border-[#45A29E]/20 hover:border-[#66FCF1] transform hover:scale-110"
                aria-label={link.label}>
                <link.icon className="w-6 h-6" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
          {/* Container for maintaining spacing */}
          <div className="h-8 md:h-4" /> {/* Spacer */}
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-20 md:bottom-28 inset-x-0 mx-auto flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#66FCF1] cursor-pointer">
              <HiChevronDown className="w-8 h-8" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
