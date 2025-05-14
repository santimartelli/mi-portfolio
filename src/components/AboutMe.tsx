import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "../util/useMediaQuery";
import { FaReact, FaNodeJs, FaDatabase, FaWordpress, FaDocker } from "react-icons/fa";
import { SiTypescript, SiGo, SiAstro } from "react-icons/si";
import { VscCircleFilled } from "react-icons/vsc";

const technologies = [
  {
    icon: FaReact,
    name: "Frontend",
    desc: "Desarrollo de interfaces modernas y responsivas",
    skills: ["HTML", "CSS", "TypeScript", "React.js", "Vue.js", "Astro.js", "Tailwind CSS"],
  },
  {
    icon: FaNodeJs,
    name: "Backend",
    desc: "Arquitectura y desarrollo de APIs",
    skills: ["Node.js", "Express.js", "PHP", "Laravel", "Go"],
  },
  {
    icon: FaDatabase,
    name: "Database & DevOps",
    desc: "Bases de datos y herramientas de desarrollo",
    skills: ["MySQL", "SQL", "Docker", "Git"],
  },
  {
    icon: FaWordpress,
    name: "CMS",
    desc: "Gestión de contenidos y personalización",
    skills: ["WordPress", "Headless CMS"],
  },
];

const AboutMeSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#0B0C10] text-white">
      {/* Background Pattern with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-transparent to-[#0B0C10] pointer-events-none" />
      </div>

      <div ref={contentRef} className="relative w-full max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center">
          {/* Title with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2833] border border-[#45A29E]/20 text-sm font-medium mb-8">
            <span className="text-[#66FCF1]">Experiencia & Habilidades</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-8 text-center text-white">
            Sobre Mí
          </motion.h2>

          {/* Description with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#C5C6C7] leading-relaxed max-w-3xl text-center mb-16">
            <p>
              Desarrollador de software especializado en crear soluciones digitales de alto rendimiento y experiencias
              web intuitivas. Mi enfoque combina <span className="text-[#66FCF1]">diseño moderno</span> con{" "}
              <span className="text-[#66FCF1]">arquitectura escalable</span> para entregar productos que superan
              expectativas.
            </p>
          </motion.div>

          {/* Tech Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group relative p-6 rounded-xl bg-[#1F2833] border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <tech.icon className="w-8 h-8 text-[#66FCF1] group-hover:text-[#66FCF1] transition-colors duration-300" />
                    <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">
                      {tech.name}
                    </h3>
                  </div>
                  <p className="text-base text-left text-[#C5C6C7] mb-6 group-hover:text-[#C5C6C7] transition-colors duration-300">
                    {tech.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-full bg-[#0B0C10]/50 text-[#C5C6C7] border border-[#45A29E]/20 group-hover:border-[#66FCF1]/30 group-hover:text-white transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
