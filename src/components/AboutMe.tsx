import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaServer, FaCode, FaBrain, FaRocket, FaLightbulb } from "react-icons/fa";
import { HiOutlineCode, HiTrendingUp } from "react-icons/hi";
import { useTranslations } from "../util/i18n";

const getTechnologies = (t: any) => [
  {
    icon: FaReact,
    name: t.technologies.frontend.name,
    desc: t.technologies.frontend.desc,
    skills: ["React", "TypeScript", "Vue.js", "Astro", "Tailwind CSS", "Next.js"],
    color: "text-blue-400",
    bgColor: "from-blue-500/10 to-blue-600/10",
    hoverColor: "hover:bg-blue-500/10 hover:border-blue-500/30",
  },
  {
    icon: FaServer,
    name: t.technologies.backend.name,
    desc: t.technologies.backend.desc,
    skills: ["Node.js", "Express", "PHP", "Laravel", "Go", "REST APIs"],
    color: "text-green-400",
    bgColor: "from-green-500/10 to-green-600/10",
    hoverColor: "hover:bg-green-500/10 hover:border-green-500/30",
  },
  {
    icon: FaDatabase,
    name: t.technologies.database.name,
    desc: t.technologies.database.desc,
    skills: ["MySQL", "PostgreSQL", "Docker", "Git", "CI/CD", "AWS"],
    color: "text-purple-400",
    bgColor: "from-purple-500/10 to-purple-600/10",
    hoverColor: "hover:bg-purple-500/10 hover:border-purple-500/30",
  },
  {
    icon: FaBrain,
    name: t.technologies.methodologies.name,
    desc: t.technologies.methodologies.desc,
    skills: ["SOLID", "Clean Code", "TDD", "Agile", "Scrum", "Design Patterns"],
    color: "text-orange-400",
    bgColor: "from-orange-500/10 to-orange-600/10",
    hoverColor: "hover:bg-orange-500/10 hover:border-orange-500/30",
  },
];

const getStats = (t: any) => [
  { icon: FaCode, value: "100+", label: t.stats.projects, color: "text-blue-400", bgColor: "from-blue-500/10 to-blue-600/10" },
  { icon: FaRocket, value: "3+", label: t.stats.experience, color: "text-green-400", bgColor: "from-green-500/10 to-green-600/10" },
  { icon: HiTrendingUp, value: "50+", label: t.stats.clients, color: "text-purple-400", bgColor: "from-purple-500/10 to-purple-600/10" },
  { icon: FaLightbulb, value: "24/7", label: t.stats.learning, color: "text-orange-400", bgColor: "from-orange-500/10 to-orange-600/10" },
];

const AboutMeSection = () => {
  const { aboutme: t } = useTranslations();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  // Helper function for current locale like in Contact
  const getCurrentLocale = (): string => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/en')) return 'en';
    }
    return 'es';
  };

  const currentLocale = getCurrentLocale();
  const technologies = getTechnologies(t);
  const stats = getStats(t);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-darkbg-950 py-24 md:py-32">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/2 to-transparent" />

      <div ref={contentRef} className="relative w-full max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-sm font-medium text-accent-400 backdrop-blur-sm mb-8">
            <HiOutlineCode className="w-4 h-4" />
            <span>{t.badge}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {t.title}
          </h2>
          
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-text-tertiary leading-relaxed mb-4">
              {t.description.paragraph1.intro} <span className="text-accent font-semibold">{t.description.paragraph1.highlight1}</span> {t.description.paragraph1.middle}
            </p>
            
            <p className="text-base text-text-muted leading-relaxed">
              {t.description.paragraph2.intro} <span className="text-accent font-medium">
                {t.description.paragraph2.highlight}
              </span> {t.description.paragraph2.continuation}
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          
          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6">
            
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              {currentLocale === 'es' ? 'Stack Tecnológico' : 'Technology Stack'}
            </h3>

            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-lg border border-border-secondary transition-all duration-300 group bg-bg-secondary/20 ${tech.hoverColor}`}>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${tech.bgColor} transition-colors duration-300`}>
                      <tech.icon className={`w-4 h-4 ${tech.color}`} />
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      {tech.name}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 text-xs bg-bg-tertiary/50 text-text-muted rounded-full border border-border-secondary/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6">
            
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              {currentLocale === 'es' ? 'Experiencia & Enfoque' : 'Experience & Focus'}
            </h3>

            <div className="space-y-4">
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center p-4 rounded-lg bg-bg-secondary/20 border border-border-secondary">
                  <div className="text-2xl font-bold text-accent-400 mb-1">3+</div>
                  <div className="text-xs text-text-muted">
                    {currentLocale === 'es' ? 'Años' : 'Years'}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-center p-4 rounded-lg bg-bg-secondary/20 border border-border-secondary">
                  <div className="text-2xl font-bold text-accent-400 mb-1">50+</div>
                  <div className="text-xs text-text-muted">
                    {currentLocale === 'es' ? 'Proyectos' : 'Projects'}
                  </div>
                </motion.div>
              </div>

              {/* Professional Focus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-4 rounded-lg border border-border-secondary bg-bg-secondary/20">
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FaCode className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-sm font-medium text-text-primary">
                    {currentLocale === 'es' ? 'Desarrollo Full Stack' : 'Full Stack Development'}
                  </div>
                </div>
                
                <div className="text-xs text-text-muted leading-relaxed">
                  {currentLocale === 'es' ? 
                    'Especializado en crear aplicaciones web completas, desde el frontend hasta el backend, con enfoque en código limpio y arquitecturas escalables.' : 
                    'Specialized in creating complete web applications, from frontend to backend, with focus on clean code and scalable architectures.'
                  }
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="pt-4">
                <motion.a
                  href="#projects"
                  className="flex items-center justify-center gap-3 p-4 rounded-lg border border-accent-500/30 bg-accent-500/10 hover:bg-accent-500/20 hover:border-accent-500/50 transition-all duration-300 group text-accent-400 hover:text-accent-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}>
                  <FaRocket className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentLocale === 'es' ? 'Ver Portfolio' : 'View Portfolio'}
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutMeSection);