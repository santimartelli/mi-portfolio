import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaServer, FaCode, FaBrain, FaRocket, FaLightbulb } from "react-icons/fa";
import { HiSparkles, HiTrendingUp } from "react-icons/hi";
import { SiTypescript, SiGo, SiAstro, SiDocker } from "react-icons/si";

const technologies = [
  {
    icon: FaReact,
    name: "Frontend",
    desc: "Interfaces modernas y experiencias inmersivas",
    skills: ["React", "TypeScript", "Vue.js", "Astro", "Tailwind CSS", "Next.js"],
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: FaServer,
    name: "Backend",
    desc: "APIs robustas y arquitecturas escalables",
    skills: ["Node.js", "Express", "PHP", "Laravel", "Go", "REST APIs"],
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    icon: FaDatabase,
    name: "Database & DevOps",
    desc: "Gestión de datos y automatización",
    skills: ["MySQL", "PostgreSQL", "Docker", "Git", "CI/CD", "AWS"],
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: FaBrain,
    name: "Metodologías",
    desc: "Procesos ágiles y buenas prácticas",
    skills: ["SOLID", "Clean Code", "TDD", "Agile", "Scrum", "Design Patterns"],
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
];

const stats = [
  { icon: FaCode, value: "100+", label: "Proyectos Completados" },
  { icon: FaRocket, value: "3+", label: "Años de Experiencia" },
  { icon: HiTrendingUp, value: "50+", label: "Clientes Satisfechos" },
  { icon: FaLightbulb, value: "24/7", label: "Aprendizaje Continuo" },
];

const AboutMeSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.1 });

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-darkbg-950 text-white">
      {/* Background Moderno */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Efectos de profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-transparent to-bg-primary/80 pointer-events-none" />

      <div ref={contentRef} className="relative w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center">
          {/* Badge Animado */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={isContentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="theme-card flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="text-accent text-lg" />
            </motion.div>
            <span className="theme-text-gradient">Experiencia & Habilidades</span>
          </motion.div>

          {/* Título Principal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">
            <span className="theme-text-gradient">Sobre Mí</span>
          </motion.h2>

          {/* Descripción Mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-tertiary leading-relaxed max-w-4xl text-center mb-16 space-y-4">
            <p>
              Soy un <span className="text-accent font-semibold">desarrollador full-stack apasionado</span> por crear
              soluciones digitales que marquen la diferencia. Mi enfoque combina{" "}
              <span className="text-accent-secondary font-semibold">diseño centrado en el usuario</span> con{" "}
              <span className="text-accent-tertiary font-semibold">arquitectura robusta y escalable</span>.
            </p>
            <p className="text-text-muted">
              Con más de <span className="text-accent font-semibold">3 años de experiencia</span>, he trabajado en
              proyectos diversos, desde startups hasta empresas consolidadas, siempre buscando la excelencia técnica
              y la innovación continua.
            </p>
          </motion.div>

          {/* Estadísticas Impresionantes */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="theme-card p-6 rounded-2xl text-center group">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-text-muted font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Cards Grid Mejorado */}
          <motion.div
            ref={cardsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.02] ${tech.bgColor} ${tech.borderColor} border hover:border-accent/30`}
                whileHover={{ y: -5 }}
              >
                {/* Efecto de resplandor al hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--accent), var(--accent-secondary))`,
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={hoveredCard === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-xl bg-bg-primary/50 backdrop-blur-sm"
                    >
                      <tech.icon className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {tech.name}
                    </h3>
                  </div>
                  
                  <p className="text-text-tertiary mb-6 leading-relaxed">
                    {tech.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isCardsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 + skillIndex * 0.05 }}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-bg-secondary/80 text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300 border border-border-secondary"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Llamada a la acción */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-16 text-center">
            <p className="text-text-tertiary mb-6">
              ¿Listo para llevar tu proyecto al siguiente nivel?
            </p>
            <motion.a
              href="#contact"
              className="theme-button-primary px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiSparkles />
              Trabajemos Juntos
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
