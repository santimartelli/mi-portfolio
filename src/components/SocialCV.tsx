import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaFilePdf, FaFileAlt, FaEnvelope } from "react-icons/fa";
import { HiSparkles, HiDownload, HiExternalLink, HiShare } from "react-icons/hi";
import { BiNetworkChart } from "react-icons/bi";

const SocialCV = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  const socialLinks = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Código y proyectos',
      href: 'https://github.com/santimartelli',
      icon: FaGithub,
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-500/10',
      followers: '25+ repositorios',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Red profesional',
      href: 'https://www.linkedin.com/in/santiago-martelli/',
      icon: FaLinkedin,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-500/10',
      followers: '500+ conexiones',
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Contacto directo',
      href: 'mailto:contacto@martelli.dev',
      icon: FaEnvelope,
      color: 'hover:text-green-400',
      bgColor: 'hover:bg-green-500/10',
      followers: 'Respuesta 24h',
    },
  ];

  const cvOptions = [
    {
      id: 'cv-es',
      language: 'Español',
      description: 'Curriculum Vitae completo',
      href: '/cv-es.pdf',
      available: true,
      size: '2.3 MB',
      lastUpdate: 'Dic 2024',
    },
    {
      id: 'cv-en',
      language: 'English',
      description: 'Complete Resume',
      href: '/cv-en.pdf',
      available: false,
      size: 'Próximamente',
      lastUpdate: 'Coming Soon',
    },
  ];

  return (
    <section
      id="social-cv"
      ref={sectionRef}
      className="relative w-full bg-darkbg-950 text-white overflow-hidden py-24 md:py-32">
      
      {/* Background Moderno */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/3 via-transparent to-accent-secondary/3" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-20 w-2 h-2 bg-accent rounded-full opacity-40"
        />
        <motion.div
          animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-24 w-3 h-3 bg-accent-secondary rounded-full opacity-30"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="theme-card flex items-center justify-center gap-3 px-6 py-3 rounded-full text-sm font-semibold mb-8 mx-auto w-fit backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <BiNetworkChart className="text-accent text-lg" />
            </motion.div>
            <span className="theme-text-gradient">Redes & Recursos</span>
            <HiShare className="text-accent-secondary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="theme-text-gradient">Conectemos</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 mb-16">
            <p className="text-lg md:text-xl text-text-tertiary leading-relaxed max-w-3xl mx-auto">
              Sígueme en mis redes sociales para estar al día con mis últimos proyectos,
              <br />
              <span className="text-accent font-semibold">o descarga mi CV</span> para conocer más sobre mi experiencia.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Social Networks Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={cardsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            onHoverStart={() => setHoveredCard('social')}
            onHoverEnd={() => setHoveredCard(null)}
            className="theme-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                animate={hoveredCard === 'social' ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl theme-card"
              >
                <HiShare className="w-8 h-8 text-accent" />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">Redes Sociales</h3>
                <p className="text-text-muted">Sígueme para más contenido</p>
              </div>
            </div>

            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className={`group flex items-center gap-4 p-4 rounded-xl theme-card hover:scale-[1.02] transition-all duration-300 ${social.bgColor}`}
                  whileHover={{ x: 5 }}
                >
                  <social.icon className={`w-6 h-6 text-accent transition-colors duration-300 ${social.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary">{social.name}</span>
                      <HiExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-text-muted">{social.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-accent font-medium">{social.followers}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 p-4 theme-card rounded-xl bg-accent/5 border border-accent/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <HiSparkles className="text-accent" />
                <span className="text-sm font-semibold text-text-primary">¿Por qué seguirme?</span>
              </div>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• Tutoriales y tips de desarrollo</li>
                <li>• Behind the scenes de proyectos</li>
                <li>• Updates de tecnologías modernas</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* CV Downloads Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={cardsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            onHoverStart={() => setHoveredCard('cv')}
            onHoverEnd={() => setHoveredCard(null)}
            className="theme-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                animate={hoveredCard === 'cv' ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl theme-card"
              >
                <HiDownload className="w-8 h-8 text-accent" />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">Curriculum Vitae</h3>
                <p className="text-text-muted">Descarga mi CV actualizado</p>
              </div>
            </div>

            <div className="space-y-4">
              {cvOptions.map((cv, index) => (
                <motion.div
                  key={cv.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className={`p-4 rounded-xl theme-card transition-all duration-300 ${
                    cv.available 
                      ? 'hover:scale-[1.02] cursor-pointer hover:border-accent/30' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  {cv.available ? (
                    <motion.a
                      href={cv.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <FaFilePdf className="w-6 h-6 text-red-400" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-primary">{cv.language}</span>
                          <HiDownload className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <p className="text-sm text-text-muted">{cv.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-accent font-medium">{cv.size}</div>
                        <div className="text-xs text-text-muted">{cv.lastUpdate}</div>
                      </div>
                    </motion.a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <FaFileAlt className="w-6 h-6 text-text-muted" />
                      <div className="flex-1">
                        <span className="font-semibold text-text-muted">{cv.language}</span>
                        <p className="text-sm text-text-muted">{cv.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-text-muted">{cv.size}</div>
                        <div className="text-xs text-text-muted">{cv.lastUpdate}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-8 p-4 theme-card rounded-xl bg-accent/5 border border-accent/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <FaFilePdf className="text-red-400" />
                <span className="text-sm font-semibold text-text-primary">Información del CV</span>
              </div>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• 3+ años de experiencia</li>
                <li>• Stack completo documentado</li>
                <li>• Proyectos y logros destacados</li>
                <li>• Referencias disponibles</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-20"
        >
          <p className="text-text-tertiary mb-8 text-lg">
            ¿Te interesa mi perfil? ¡No dudes en contactarme!
          </p>
          <motion.a
            href="#contact"
            className="theme-button-primary px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiSparkles />
            Iniciar Conversación
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialCV;
