import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload, FaFilePdf, FaFileAlt } from "react-icons/fa";
import { VscCircleFilled } from "react-icons/vsc";

const SocialCV = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 });

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
  const [showCVCard, setShowCVCard] = useState(false);
  const [showSocialCard, setShowSocialCard] = useState(false);

  // Commands sequence
  const commands = [
    {
      text: 'create-element --type="heading" --content="Conectemos"',
      action: () => setShowTitle(true),
    },
    {
      text: 'add-description --content="También puedes encontrarme en mis redes sociales o descargar mi CV"',
      action: () => setShowDescription(true),
    },
    {
      text: 'render-card --template="cv-downloads.tsx"',
      action: () => setShowCVCard(true),
    },
    {
      text: 'render-card --template="social-links.tsx"',
      action: () => setShowSocialCard(true),
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
      id="social-cv"
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
                <div className="mx-auto text-xs font-mono text-gray-400">social-cv-builder</div>
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

        {/* Social CV Content */}
        <div className="flex flex-col items-center text-center space-y-8 w-full">
          {/* Title */}
          {showTitle && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">Conec</span>
              <span className="text-[#66FCF1]">temos</span>
            </motion.h2>
          )}

          {/* Description */}
          {showDescription && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center text-lg md:text-xl text-[#C5C6C7] max-w-2xl mx-auto mb-12">
              También puedes encontrarme en mis redes sociales o descargar mi CV
            </motion.p>
          )}

          <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
            {/* CV Card */}
            {showCVCard && (
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-transparent border border-[#45A29E]/20 hover:bg-[#1F2833]/30 hover:border-[#66FCF1]/30 rounded-xl p-6 transition-all duration-300">
                <h3 className="text-xl font-medium text-slate-200 mb-4 text-left">Currículum Vitae</h3>

                <div className="flex flex-col space-y-4">
                  <motion.a
                    href="/CVSantiagoMartelli.pdf"
                    download
                    className="flex items-center gap-3 px-4 py-3 bg-[#121212]/30 hover:bg-[#1F2833]/50 rounded-lg transition-all duration-200 group"
                    initial={{ x: 0 }}>
                    <div className="flex items-center justify-center w-10 h-10 bg-[#121212]/50 rounded-full">
                      <FaFilePdf className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-200">CV en Español</p>
                      <p className="text-sm text-slate-400">Formato PDF</p>
                    </div>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}>
                      <FaFileDownload className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="/CVSantiagoMartelli.pdf"
                    download
                    className="flex items-center gap-3 px-4 py-3 bg-[#121212]/30 hover:bg-[#1F2833]/50 rounded-lg transition-all duration-200 group"
                    initial={{ x: 0 }}>
                    <div className="flex items-center justify-center w-10 h-10 bg-[#121212]/50 rounded-full">
                      <FaFileAlt className="w-5 h-5 text-blue-300" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-200">Información detallada</p>
                      <p className="text-sm text-slate-400">Experiencia profesional</p>
                    </div>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}>
                      <FaFileDownload className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </motion.a>
                </div>
              </motion.div>
            )}

            {/* Social Links */}
            {showSocialCard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-transparent border border-[#45A29E]/20 hover:bg-[#1F2833]/30 hover:border-[#66FCF1]/30 rounded-xl p-6 transition-all duration-300">
                <h3 className="text-xl font-medium text-slate-200 mb-4 text-left">Redes Sociales</h3>

                <div className="flex flex-col space-y-4">
                  <motion.a
                    href="https://www.linkedin.com/in/santiagomartelli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-[#121212]/30 hover:bg-[#1F2833]/50 rounded-lg transition-all duration-200 group"
                    initial={{ x: 0 }}>
                    <div className="flex items-center justify-center w-10 h-10 bg-[#121212]/50 rounded-full">
                      <FaLinkedin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-200">LinkedIn</p>
                      <p className="text-sm text-slate-400">Perfil profesional</p>
                    </div>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}>
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/santimartelli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-[#121212]/30 hover:bg-[#1F2833]/50 rounded-lg transition-all duration-200 group"
                    initial={{ x: 0 }}>
                    <div className="flex items-center justify-center w-10 h-10 bg-[#121212]/50 rounded-full">
                      <FaGithub className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-200">GitHub</p>
                      <p className="text-sm text-slate-400">Proyectos y código</p>
                    </div>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}>
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialCV;
