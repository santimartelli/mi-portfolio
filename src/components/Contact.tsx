import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden flex items-center">
      {/* Background Pattern - Code-like grid */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Removed floating code symbols animation */}

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24 md:py-32 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300">
          Contacto
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-300">
                ¿Quieres que trabajemos juntos?
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Estoy disponible para trabajos freelance y oportunidades a tiempo completo. Si tienes un proyecto que
                necesita llevarse a cabo o simplemente quieres conectar, estaré encantado de conversar.
              </p>
            </div>

            {/* Contact Methods with code-like styling */}
            <div className="space-y-4 pt-4">
              <div className="group">
                <div className="p-4 bg-slate-800/40 border border-slate-700/40 rounded-lg hover:bg-slate-800/80 hover:border-slate-600/80 transition-all duration-300">
                  <div className="flex items-start">
                    <span className="text-slate-500 font-mono mr-2">const</span>
                    <span className="text-slate-300 font-mono">email</span>
                    <span className="text-slate-500 font-mono mx-2">=</span>
                    <a
                      href="mailto:santimartelli@gmail.com"
                      className="text-slate-300 hover:text-white transition-colors duration-300 font-mono">
                      "santimartelli@gmail.com"
                    </a>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="p-4 bg-slate-800/40 border border-slate-700/40 rounded-lg hover:bg-slate-800/80 hover:border-slate-600/80 transition-all duration-300">
                  <div className="flex items-start">
                    <span className="text-slate-500 font-mono mr-2">const</span>
                    <span className="text-slate-300 font-mono">location</span>
                    <span className="text-slate-500 font-mono mx-2">=</span>
                    <span className="text-slate-300 font-mono">"Barcelona and Girona"</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="p-4 bg-slate-800/40 border border-slate-700/40 rounded-lg hover:bg-slate-800/80 hover:border-slate-600/80 transition-all duration-300">
                  <div className="flex items-start">
                    <span className="text-slate-500 font-mono mr-2">const</span>
                    <span className="text-slate-300 font-mono">availability</span>
                    <span className="text-slate-500 font-mono mx-2">=</span>
                    <span className="text-green-400 font-mono">"Available for work"</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden">
            {/* Form card with glassmorphism effect */}
            <div className="relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300  hover:border-slate-600/80">
              {/* Static border gradient - matching code cards style */}
              <div className="absolute inset-0 rounded-xl bg-slate-800/20" />

              {/* Form content */}
              <div className="relative m-[1px] rounded-xl bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm overflow-hidden hover:border-slate-600/60 transition-all duration-300">
                <form
                  action="https://formsubmit.co/90453a8b6d243aa64cc7b871c1bf436f"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="p-8">
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

                  <div className="space-y-6">
                    {/* Name field */}
                    <div className="relative">
                      <div className="flex items-center gap-2 text-slate-300 mb-2">
                        <HiOutlineUser className="h-4 w-4" />
                        <label htmlFor="name" className="text-sm font-medium">
                          Nombre
                        </label>
                      </div>
                      <div className="relative">
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
                          className="block w-full px-4 py-3 bg-slate-800/50 rounded-lg text-slate-200 border border-slate-700/50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400/50 focus:border-slate-400/50 transition-all duration-200"
                        />
                        <div
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-400/50 to-slate-600/50 transition-all duration-300"
                          style={{ width: `${formState.name.length > 0 ? 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="relative">
                      <div className="flex items-center gap-2 text-slate-300 mb-2">
                        <HiOutlineMail className="h-4 w-4" />
                        <label htmlFor="email" className="text-sm font-medium">
                          Correo Electrónico
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className="block w-full px-4 py-3 bg-slate-800/50 rounded-lg text-slate-200 border border-slate-700/50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400/50 focus:border-slate-400/50 transition-all duration-200"
                        />
                        <div
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-400/50 to-slate-600/50 transition-all duration-300"
                          style={{ width: `${formState.email.length > 0 ? 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <div className="flex items-center gap-2 text-slate-300 mb-2">
                        <BiMessageDetail className="h-4 w-4" />
                        <label htmlFor="message" className="text-sm font-medium">
                          Mensaje
                        </label>
                      </div>
                      <div className="relative">
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
                          className="block w-full px-4 py-3 bg-slate-800/50 rounded-lg text-slate-200 border border-slate-700/50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400/50 focus:border-slate-400/50 transition-all duration-200 resize-none"
                        />
                        <div
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-400/50 to-slate-600/50 transition-all duration-300"
                          style={{ width: `${formState.message.length > 0 ? 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-200 font-medium transition-all duration-300 overflow-hidden border border-slate-600/50 hover:border-slate-500/50 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
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
                  </div>
                </form>
              </div>
            </div>

            {/* Technical decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-tr from-slate-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-slate-500/10 to-transparent rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
