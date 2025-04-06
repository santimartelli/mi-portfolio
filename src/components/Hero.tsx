import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { VscCircleFilled } from "react-icons/vsc";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const socialLinks = [
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
  ];

  // Terminal state
  const [showCursor, setShowCursor] = useState(true);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [activeCommand, setActiveCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commandStatus, setCommandStatus] = useState<"" | "executing" | "success">("");
  const [completedCommands, setCompletedCommands] = useState<number[]>([]);

  // Ref for terminal content auto-scrolling
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // UI visibility states
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  // Commands sequence
  const commands = [
    {
      text: 'create-element --type="heading" --content="Santiago Martelli"',
      action: () => setShowName(true),
    },
    {
      text: 'add-badge --text="Full Stack Developer"',
      action: () => setShowRole(true),
    },
    {
      text: 'add-description --file="about.txt"',
      action: () => setShowDescription(true),
    },
    {
      text: 'create-buttons --content="Ver proyectos" --href="#projects"',
      action: () => setShowButtons(true),
    },
    {
      text: "add-social-links --github --linkedin --email",
      action: () => setShowSocialLinks(true),
    },
  ];

  // Auto-scroll terminal content
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [completedCommands, activeCommand, commandStatus]);

  // Process the sequence of commands
  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

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
  }, [currentCommandIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center bg-[#0B0C10] text-white px-4 pt-24 pb-32">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0B0C10]" />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
            <div className="mx-auto text-xs font-mono text-gray-400">hero-builder</div>
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

        {/* Hero Content Building Below Terminal */}
        <div className="flex flex-col items-center text-center space-y-8 w-full">
          {/* Name */}
          {showName && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Santiago </span>
              <span className="text-[#66FCF1]">Martelli</span>
            </motion.h1>
          )}

          {/* Role */}
          {showRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#1A1A1A] border border-[#45A29E]/20 text-sm font-medium">
              <span className="w-1.5 h-1.5 bg-[#66FCF1] rounded-full animate-pulse"></span>
              <span className="text-[#66FCF1]">Full Stack Developer</span>
            </motion.div>
          )}

          {/* Description */}
          {showDescription && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-base md:text-lg text-[#C5C6C7] leading-relaxed max-w-2xl">
              Desarrollador de software especializado en crear soluciones digitales de alto rendimiento y experiencias
              web intuitivas. Mi enfoque combina diseño moderno con arquitectura escalable para entregar productos que
              superan expectativas.
            </motion.p>
          )}

          {/* Buttons */}
          {showButtons && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center pt-2">
              <a
                href="#projects"
                className="px-6 py-3 bg-transparent border border-[#45A29E]/20 text-[#66FCF1] rounded-xl hover:bg-[#1F2833]/30 hover:border-[#66FCF1]/30 transition-all duration-300 font-medium">
                Ver proyectos
              </a>
            </motion.div>
          )}

          {/* Social Links */}
          {showSocialLinks && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex gap-6 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5C6C7] hover:text-[#66FCF1] transition-all duration-300 p-2 bg-[#1F2833] rounded-lg border border-[#45A29E]/20 hover:border-[#66FCF1]/30"
                  aria-label={link.label}>
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
