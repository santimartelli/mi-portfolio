import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: "Inicio", href: "#home" },
    { name: "Sobre mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <footer className="relative w-full bg-darkbg-950 text-white overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-6">
          {/* Brand/Logo Section */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col space-y-4">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-accent-500">
                Santiago Martelli
              </h3>
              <p className="text-darktext-300 text-sm max-w-xs">
                Desarrollo web moderno centrado en la experiencia de usuario, rendimiento y código limpio.
              </p>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold text-accent-400 uppercase tracking-wider">Navegación</h4>
              <ul className="space-y-2">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="text-darktext-300 hover:text-accent-400 text-sm transition-colors duration-200 hover:underline decoration-accent-500 underline-offset-4">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold text-accent-400 uppercase tracking-wider">Stack Tecnológico</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "Vue", "TypeScript", "Node.js", "Laravel", "Astro"].map((tech, i) => (
                  <span
                    key={i}
                    className="inline-block px-2.5 py-1 text-xs bg-darkbg-900 text-accent-400 rounded-md border border-accent-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Separator line taking full width */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen border-t border-accent-500/10"></div>
        </div>
        <div className="h-4"></div>

        {/* Bottom copyright bar with reduced height */}
        <div className="flex flex-col md:flex-row justify-between items-center py-1 opacity-80">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center text-xs text-darktext-300">
            &copy; {currentYear} Santiago Martelli. Todos los derechos reservados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center mt-1 md:mt-0">
            <span className="text-xs text-darktext-300">Diseñado y desarrollado con</span>
            <svg className="w-3 h-3 mx-1 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Background subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#66FCF120_1px,transparent_1px),linear-gradient(to_bottom,#66FCF120_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    </footer>
  );
};

export default Footer;
