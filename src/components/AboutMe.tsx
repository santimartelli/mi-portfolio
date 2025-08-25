import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { FaReact, FaDatabase, FaServer, FaCode, FaBrain, FaRocket } from "react-icons/fa";
import { HiOutlineCode } from "react-icons/hi";
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


const AboutMeSection = () => {
  const { aboutme: t } = useTranslations();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
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
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              {t.description.paragraph1.intro} <span className="text-accent font-semibold">{t.description.paragraph1.highlight1}</span> {t.description.paragraph1.middle} <span className="text-accent font-medium">{t.description.paragraph1.highlight2}</span> {t.description.paragraph1.continuation} <span className="text-accent font-medium">{t.description.paragraph1.highlight3}</span>{t.description.paragraph1.end}
            </p>
            
            <p className="text-base text-text-muted leading-relaxed">
              {t.description.paragraph2.intro} <span className="text-accent font-medium">
                {t.description.paragraph2.highlight}
              </span>, {t.description.paragraph2.continuation}
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
                  className={`p-5 rounded-xl border border-border-secondary/50 transition-all duration-300 group bg-bg-secondary/10 hover:bg-bg-secondary/20 hover:border-accent/20 backdrop-blur-sm`}>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tech.bgColor} border border-opacity-20 transition-colors duration-300`} style={{borderColor: `${tech.color.replace('text-', '')}`}}>
                      <tech.icon className={`w-5 h-5 ${tech.color}`} />
                    </div>
                    <div className="text-base font-semibold text-text-primary">
                      {tech.name}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-xs bg-bg-tertiary/30 text-text-tertiary rounded-full border border-border-secondary/30 hover:bg-accent/10 hover:text-accent transition-colors duration-200">
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center p-6 rounded-xl bg-bg-secondary/10 border border-border-secondary/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">3+</div>
                  <div className="text-sm text-text-muted font-medium">
                    {currentLocale === 'es' ? 'Años de Experiencia' : 'Years Experience'}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-center p-6 rounded-xl bg-bg-secondary/10 border border-border-secondary/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-text-muted font-medium">
                    {currentLocale === 'es' ? 'Compromiso' : 'Commitment'}
                  </div>
                </motion.div>
              </div>

              {/* Professional Focus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-6 rounded-xl border border-border-secondary/50 bg-bg-secondary/10 backdrop-blur-sm">
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <FaCode className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-base font-semibold text-text-primary">
                    {currentLocale === 'es' ? 'Desarrollo Full Stack' : 'Full Stack Development'}
                  </div>
                </div>
                
                <div className="text-sm text-text-tertiary leading-relaxed">
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
                className="pt-6">
                <motion.a
                  href="#projects"
                  className="theme-button-secondary flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <FaRocket className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  <span>
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