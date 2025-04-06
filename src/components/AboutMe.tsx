import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

  // Refs for section and terminal visibility
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });

  // Terminal state
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [activeCommand, setActiveCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commandStatus, setCommandStatus] = useState<"" | "executing" | "success">("");
  const [completedCommands, setCompletedCommands] = useState<number[]>([]);

  // Ref for terminal content auto-scrolling
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // UI visibility states
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showTechCards, setShowTechCards] = useState(false);

  // Commands sequence
  const commands = [
    {
      text: 'create-element --type="heading" --content="Sobre Mí"',
      action: () => setShowTitle(true),
    },
    {
      text: 'add-description --file="about-me.txt"',
      action: () => setShowDescription(true),
    },
    {
      text: 'load-tech-skills --section="developer-profile"',
      action: () => setShowTechCards(true),
    },
  ];

  // Show terminal when section comes into view
  useEffect(() => {
    if (isSectionInView) {
      setShowTerminal(true);
    }
  }, [isSectionInView]);

  // Auto-scroll terminal content
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [completedCommands, activeCommand, commandStatus]);

  // Process the sequence of commands
  useEffect(() => {
    if (!showTerminal || currentCommandIndex >= commands.length) return;

    const startNextCommand = () => {
      // Reset states for new command
      setActiveCommand("");
      setIsTyping(true);
      setCommandStatus("");

      // Type out the command character by character
      const command = commands[currentCommandIndex].text;
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex < command.length) {
          setActiveCommand((prev) => prev + command[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);

          // After finishing typing, execute command
          setTimeout(() => {
            setCommandStatus("executing");

            // Execute the command
            setTimeout(() => {
              commands[currentCommandIndex].action();
              setCommandStatus("success");

              // Add to completed commands list
              setTimeout(() => {
                setCompletedCommands((prev) => [...prev, currentCommandIndex]);

                // After success, move to next command
                setTimeout(() => {
                  setCurrentCommandIndex((prev) => prev + 1);
                }, 200);
              }, 300);
            }, 200);
          }, 150);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    };

    // Start the command sequence with a delay
    const timer = setTimeout(startNextCommand, currentCommandIndex === 0 ? 300 : 150);
    return () => clearTimeout(timer);
  }, [currentCommandIndex, showTerminal]);

  // Blinking cursor effect
  useEffect(() => {
    if (!showTerminal) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [showTerminal]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#0B0C10] text-white px-4 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div ref={contentRef} className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Terminal Window */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl bg-[#121212] rounded-md overflow-hidden shadow-2xl border border-[#333333] flex flex-col mb-16 mt-12"
              style={{ height: "120px" }}>
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-1 bg-[#1A1A1A] border-b border-[#333333]">
                <div className="flex space-x-2">
                  <VscCircleFilled className="text-red-500" />
                  <VscCircleFilled className="text-yellow-500" />
                  <VscCircleFilled className="text-green-500" />
                </div>
                <div className="mx-auto text-xs font-mono text-gray-400">about-me-builder</div>
              </div>

              {/* Terminal Content with Scrolling */}
              <div
                ref={terminalContentRef}
                className="p-3 font-mono text-sm bg-[#121212] flex-grow overflow-y-auto"
                style={{
                  fontFamily: "'Ubuntu Mono', 'Courier New', monospace",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#333333 #121212",
                  msOverflowStyle: "auto",
                }}>
                {/* Completed Commands */}
                {completedCommands.map((cmdIndex) => (
                  <div key={`completed-${cmdIndex}`} className="mb-2">
                    {/* Command Line */}
                    <div className="flex">
                      <span className="text-[#45A29E] mr-2">$</span>
                      <span className="text-gray-300">{commands[cmdIndex].text}</span>
                    </div>

                    {/* Command Result */}
                    <div className="text-green-400 ml-4 mt-0.5">✓ Command executed successfully</div>
                  </div>
                ))}

                {/* Current Command */}
                {currentCommandIndex < commands.length && (
                  <div className="mb-1">
                    {/* Command */}
                    <div className="flex">
                      <span className="text-[#45A29E] mr-2">$</span>
                      <span className="text-gray-300">{activeCommand}</span>
                      {isTyping && showCursor && <span className="text-gray-300 animate-pulse">▋</span>}
                    </div>

                    {/* Command Status */}
                    {commandStatus === "executing" && <div className="text-yellow-400 ml-4 mt-0.5">Executing...</div>}

                    {commandStatus === "success" && (
                      <div className="text-green-400 ml-4 mt-0.5">✓ Command executed successfully</div>
                    )}
                  </div>
                )}

                {/* Final cursor after all commands */}
                {currentCommandIndex >= commands.length && (
                  <div className="flex">
                    <span className="text-[#45A29E] mr-2">$</span>
                    {showCursor && <span className="text-gray-300 animate-pulse">▋</span>}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Me Content */}
        <div className="flex flex-col items-center text-center space-y-8 w-full">
          {/* Title */}
          {showTitle && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Sobre </span>
              <span className="text-[#66FCF1]">Mí</span>
            </motion.h2>
          )}

          {/* Description */}
          {showDescription && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-left space-y-6 mb-16">
              <p className="text-base md:text-lg text-[#C5C6C7] leading-relaxed">
                Desarrollador Web apasionado por crear experiencias digitales excepcionales. Combino creatividad y
                conocimientos técnicos para transformar ideas en aplicaciones web modernas y eficientes. Mi enfoque se
                centra en escribir código limpio y mantener las mejores prácticas de desarrollo.
              </p>
              <p className="text-base md:text-lg text-[#C5C6C7] leading-relaxed">
                Mi portafolio de proyectos personales refleja mi compromiso con la excelencia técnica y mi capacidad
                para entregar soluciones innovadoras. Destaco por mi rápida adaptación a nuevas tecnologías y mi
                dedicación al aprendizaje continuo. Busco unirme a un equipo dinámico donde pueda aportar ideas frescas
                y contribuir al éxito de proyectos desafiantes.
              </p>
              <br></br>
            </motion.div>
          )}

          {/* Tech Cards */}
          {showTechCards && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group relative p-6 rounded-xl bg-transparent border border-[#45A29E]/20 hover:bg-[#1F2833]/30 hover:border-[#66FCF1]/30 transition-all duration-300">
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <tech.icon className="w-7 h-7 text-[#66FCF1] group-hover:text-[#66FCF1] transition-colors duration-300" />
                      <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">
                        {tech.name}
                      </h3>
                    </div>
                    <p className="text-sm text-left text-[#C5C6C7] mb-4 group-hover:text-[#C5C6C7] transition-colors duration-300">
                      {tech.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tech.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-[#0B0C10]/30 text-[#C5C6C7] border border-[#45A29E]/20 group-hover:border-[#66FCF1]/30 group-hover:text-white transition-all duration-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
