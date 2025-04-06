import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { VscCircleFilled } from "react-icons/vsc";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Commands sequence
  const commands = [
    {
      text: 'create-element --type="heading" --content="Contacto"',
      action: () => setShowTitle(true),
    },
    {
      text: 'load-contact-info --file="contact-details.json"',
      action: () => setShowContactInfo(true),
    },
    {
      text: 'render-contact-form --template="contact-form.tsx"',
      action: () => setShowContactForm(true),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Allow the animation to play before submitting
    setTimeout(() => {
      const form = e.target as HTMLFormElement;
      // Handle form submission
      form.submit();
      // We would normally wait for form response here
      // For demo, simulate successful submission
      setShowSuccess(true);
      setTimeout(() => {
        setSubmitting(false);
        setShowSuccess(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }, 600);
  };

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
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#0B0C10] to-[#0B0C10] overflow-hidden flex items-center">
      {/* Background Pattern - Code-like grid */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24 md:py-32 z-10">
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
                <div className="mx-auto text-xs font-mono text-gray-400">contact-builder</div>
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

        {/* Contact Content */}
        <div className="flex flex-col items-center text-center space-y-8 w-full">
          {/* Title */}
          {showTitle && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-10">
              <span className="text-white">Con</span>
              <span className="text-[#66FCF1]">tacto</span>
            </motion.h2>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side - Contact Info */}
            {showContactInfo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white">¿Quieres que trabajemos juntos?</h3>
                  <p className="text-lg text-[#C5C6C7] leading-relaxed">
                    Estoy disponible para trabajos freelance y oportunidades a tiempo completo. Si tienes un proyecto
                    que necesita llevarse a cabo o simplemente quieres conectar, estaré encantado de conversar.
                  </p>
                </div>

                {/* Contact Methods with ultra-clean styling */}
                <div className="space-y-5 pt-6">
                  <a href="mailto:santimartelli@gmail.com" className="flex items-center group">
                    <HiOutlineMail className="h-5 w-5 text-[#66FCF1] mr-3" />
                    <span className="text-[#C5C6C7] group-hover:text-white transition-colors duration-300">
                      santimartelli@gmail.com
                    </span>
                  </a>

                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-[#66FCF1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-[#C5C6C7]">Barcelona and Girona</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-[#66FCF1] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[#66FCF1]">Available for work</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Right side - Contact Form */}
            {showContactForm && (
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative">
                {/* Form with transparent background that shows on hover */}
                <div className="relative p-6 rounded-xl bg-transparent border border-[#45A29E]/20 hover:bg-[#1F2833]/30 hover:border-[#66FCF1]/30 transition-all duration-300">
                  <form
                    action="https://formsubmit.co/90453a8b6d243aa64cc7b871c1bf436f"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-6">
                    {/* Honeypot and security tokens */}
                    <input type="text" name="_honey" style={{ display: "none" }} />
                    <input type="hidden" name="_subject" value="***Nuevo mensaje*** | www.martelli.dev" />
                    <input type="hidden" name="_next" value="https://www.martelli.dev/feedbackemail" />
                    <input type="hidden" name="_captcha" value="true" />
                    <input type="hidden" name="_template" value="table" />
                    <input
                      type="hidden"
                      name="_autoresponse"
                      value="Gracias por tu mensaje. Te responderé a la brevedad."
                    />

                    {/* Name field */}
                    <div className="relative">
                      <div className="flex items-center gap-2 text-[#C5C6C7] mb-2">
                        <HiOutlineUser className="h-4 w-4 text-[#66FCF1]" />
                        <label htmlFor="name" className="text-sm font-medium">
                          Nombre
                        </label>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        pattern="[A-Za-z0-9\s]+"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="block w-full px-4 py-3 bg-[#121212]/30 rounded-lg text-[#C5C6C7] border border-[#45A29E]/20 placeholder:text-[#C5C6C7]/50 focus:outline-none focus:ring-1 focus:ring-[#66FCF1]/30 focus:border-[#66FCF1]/30 transition-all duration-200"
                      />
                    </div>

                    {/* Email field */}
                    <div className="relative">
                      <div className="flex items-center gap-2 text-[#C5C6C7] mb-2">
                        <HiOutlineMail className="h-4 w-4 text-[#66FCF1]" />
                        <label htmlFor="email" className="text-sm font-medium">
                          Correo Electrónico
                        </label>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="block w-full px-4 py-3 bg-[#121212]/30 rounded-lg text-[#C5C6C7] border border-[#45A29E]/20 placeholder:text-[#C5C6C7]/50 focus:outline-none focus:ring-1 focus:ring-[#66FCF1]/30 focus:border-[#66FCF1]/30 transition-all duration-200"
                      />
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <div className="flex items-center gap-2 text-[#C5C6C7] mb-2">
                        <BiMessageDetail className="h-4 w-4 text-[#66FCF1]" />
                        <label htmlFor="message" className="text-sm font-medium">
                          Mensaje
                        </label>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        required
                        minLength={10}
                        maxLength={1000}
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tu mensaje..."
                        className="block w-full px-4 py-3 bg-[#121212]/30 rounded-lg text-[#C5C6C7] border border-[#45A29E]/20 placeholder:text-[#C5C6C7]/50 focus:outline-none focus:ring-1 focus:ring-[#66FCF1]/30 focus:border-[#66FCF1]/30 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1F2833]/50 hover:bg-[#1F2833]/80 text-[#C5C6C7] font-medium transition-all duration-300 overflow-hidden border border-[#45A29E]/20 hover:border-[#66FCF1]/30 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <span
                          className={`flex items-center justify-center gap-2 ${
                            submitting ? "opacity-0" : "opacity-100"
                          } transition-opacity duration-200`}>
                          <FiSend className="h-4 w-4" />
                          Enviar Mensaje
                        </span>

                        {submitting && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        )}
                      </motion.button>

                      {/* Success indicator */}
                      <AnimatePresence>
                        {showSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm text-center">
                            ¡Mensaje enviado con éxito! Gracias por contactar.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
