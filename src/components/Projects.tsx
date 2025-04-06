import { useState, useRef, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { VscCircleFilled } from "react-icons/vsc";

const projects = [
  {
    image: "/tmphoto.webp",
    title: "Tanya Martelli",
    title2: "Photography",
    body: "Portfolio profesional para la fotógrafa Tanya Martelli con diseño minimalista centrado en la experiencia visual. Incluye galería interactiva con categorías, sistema de reserva de sesiones, panel de administración para gestionar contenido y formulario de contacto personalizado. Implementado con Vue.js en el frontend y Node.js con Express en el backend, utilizando MySQL para almacenamiento de datos.",
    href: "https://tanyamartelli.com",
    github: "https://github.com/santimartelli/tanyamartelliphoto-project.git",
    technologies: ["Vue3", "CSS", "Node.js", "Express.js", "MySQL"],
  },
  {
    image: "/smportfolio.webp",
    title: "Web / portfolio",
    title2: "Santiago Martelli",
    body: "Portfolio personal diseñado con enfoque en rendimiento y experiencia visual fluida. Desarrollado con una arquitectura moderna utilizando Astro para optimización de carga, React con TypeScript para componentes tipados e interactivos, y Tailwind CSS para un diseño responsivo y elegante. La implementación con TypeScript garantiza código mantenible y robusto, mientras que Framer Motion proporciona animaciones sutiles. El proyecto sigue principios SOLID, patrones de diseño modernos y prácticas de desarrollo web performante.",
    href: "https://martelli.dev",
    github: "https://github.com/santimartelli/mi-portfolio.git",
    technologies: ["Astro", "React.js", "TypeScript", "Tailwind CSS"],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    title2: string;
    body: string;
    technologies: string[];
    href: string;
    github: string;
    image: string;
  } | null>(null);

  // Terminal state
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [activeCommand, setActiveCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commandStatus, setCommandStatus] = useState<"" | "executing" | "success">("");
  const [completedCommands, setCompletedCommands] = useState<number[]>([]);

  // Refs for section components
  const sectionRef = useRef(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const projectRefs = projects.map(() => useRef(null));

  // InView hooks
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const projectsInView = projectRefs.map((ref) => useInView(ref, { once: true, amount: 0.2 }));

  // UI visibility states
  const [showTitle, setShowTitle] = useState(false);
  const [showProjectCards, setShowProjectCards] = useState(false);

  // Commands sequence
  const commands = [
    {
      text: 'create-element --type="heading" --content="Proyectos"',
      action: () => setShowTitle(true),
    },
    {
      text: 'load-project-cards --section="portfolio-showcase"',
      action: () => setShowProjectCards(true),
    },
  ];

  // Show terminal when section comes into view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowTerminal(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

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

            // Execute the command after a delay
            setTimeout(() => {
              commands[currentCommandIndex].action();
              setCommandStatus("success");

              // Add to completed commands list
              setTimeout(() => {
                setCompletedCommands((prev) => [...prev, currentCommandIndex]);

                // After success, move to next command with a delay
                setTimeout(() => {
                  setCurrentCommandIndex((prev) => prev + 1);
                }, 500);
              }, 500);
            }, 500);
          }, 300);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    };

    // Start the command sequence with a delay
    const timer = setTimeout(startNextCommand, currentCommandIndex === 0 ? 500 : 500);
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
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#0B0C10] text-white overflow-hidden py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Terminal Window */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl mx-auto bg-[#121212] rounded-md overflow-hidden shadow-2xl border border-[#333333] flex flex-col mb-16 mt-4"
              style={{ height: "120px" }}>
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-1 bg-[#1A1A1A] border-b border-[#333333]">
                <div className="flex space-x-2">
                  <VscCircleFilled className="text-red-500" />
                  <VscCircleFilled className="text-yellow-500" />
                  <VscCircleFilled className="text-green-500" />
                </div>
                <div className="mx-auto text-xs font-mono text-gray-400">projects-builder</div>
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

        {/* Projects Content */}
        <div className="flex flex-col items-center text-center space-y-8 w-full">
          {/* Title */}
          {showTitle && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">Pro</span>
              <span className="text-[#66FCF1]">yectos</span>
            </motion.h2>
          )}

          {/* Project Cards */}
          {showProjectCards && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center w-full">
              <div className="flex flex-wrap justify-center w-full max-w-[900px] gap-12">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    ref={projectRefs[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.2,
                    }}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => setSelectedProject(project)}
                    className="w-full sm:w-[420px] mb-2">
                    <Card {...project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {selectedProject && <Modal {...selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
