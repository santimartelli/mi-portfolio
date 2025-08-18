import { motion, AnimatePresence } from "framer-motion";
import { useRef, useCallback, memo, useState } from "react";
import { useInView } from "framer-motion";
import { HiOutlineMail, HiOutlineUser, HiSparkles, HiLightningBolt, HiCheckCircle } from "react-icons/hi";
import { BiMessageDetail, BiRocket } from "react-icons/bi";
import { FiSend, FiMail, FiUser, FiMessageCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import useForm from "../util/useForm";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headerRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const validateForm = useCallback((values: ContactFormValues) => {
    const errors: Partial<Record<keyof ContactFormValues, string>> = {};
    
    if (!values.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (values.name.trim().length < 2) {
      errors.name = "El nombre debe tener al menos 2 caracteres";
    }
    
    if (!values.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "El email no es válido";
    }
    
    if (!values.message.trim()) {
      errors.message = "El mensaje es requerido";
    } else if (values.message.trim().length < 10) {
      errors.message = "El mensaje debe tener al menos 10 caracteres";
    }
    
    return errors;
  }, []);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset
  } = useForm<ContactFormValues>(
    { name: "", email: "", message: "" },
    validateForm
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ContactFormValues, value);
  }, [setValue]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setFieldTouched(name as keyof ContactFormValues, true);
    setFocusedField(null);
  }, [setFieldTouched]);

  const handleFocus = useCallback((fieldName: string) => {
    setFocusedField(fieldName);
  }, []);

  const onSubmit = useCallback(async (formValues: ContactFormValues) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formValues);
      
      // Reset form after successful submission
      reset();
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }, [reset]);

  const contactMethods = [
    {
      icon: FiMail,
      label: "Email",
      value: "contacto@martelli.dev",
      href: "mailto:contacto@martelli.dev",
      color: "text-blue-400",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/santimartelli",
      href: "https://github.com/santimartelli",
      color: "text-gray-400",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "santiago-martelli",
      href: "https://linkedin.com/in/santiago-martelli",
      color: "text-blue-500",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-darkbg-950 overflow-hidden flex items-center">
      {/* Background Moderno */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full opacity-30"
        />
        <motion.div
          animate={{ y: [30, -30, 30], x: [-15, 15, -15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-16 w-2 h-2 bg-accent-secondary rounded-full opacity-40"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="theme-card flex items-center justify-center gap-3 px-6 py-3 rounded-full text-sm font-semibold mb-8 mx-auto w-fit backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <HiLightningBolt className="text-accent text-lg" />
            </motion.div>
            <span className="theme-text-gradient">¡Hablemos!</span>
            <HiSparkles className="text-accent-secondary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="theme-text-gradient">Contacto</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 mb-16">
            <p className="text-lg md:text-xl text-text-tertiary leading-relaxed max-w-3xl mx-auto">
              ¿Tienes una idea increíble? ¿Necesitas ayuda con un proyecto? 
              <br />
              <span className="text-accent font-semibold">¡Me encantaría escucharte!</span>
            </p>

            {/* Contact Methods */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="theme-card px-4 py-3 rounded-xl hover:scale-105 transition-all duration-300 group flex items-center gap-3"
                  whileHover={{ y: -2 }}
                >
                  <method.icon className={`w-5 h-5 ${method.color} group-hover:text-accent transition-colors duration-300`} />
                  <div className="text-left">
                    <div className="text-xs text-text-muted font-medium">{method.label}</div>
                    <div className="text-sm text-text-secondary font-semibold">{method.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex-1 max-w-2xl mx-auto lg:mx-0">
            
            {/* Success Message */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="mb-6 p-6 theme-card rounded-2xl border-green-500/30 bg-green-500/10 text-center">
                  <HiCheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-text-muted">Gracias por contactarme. Te responderé pronto.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative group">
                <label htmlFor="name" className="block text-sm font-semibold text-text-secondary mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'name' ? 'text-accent' : 'text-text-muted'
                  }`} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('name')}
                    placeholder="Tu nombre completo"
                    required
                    className={`w-full theme-card py-4 pl-12 pr-4 rounded-xl focus:outline-none transition-all duration-300 ${
                      touched.name && errors.name
                        ? 'border-red-500 focus:border-red-400'
                        : focusedField === 'name' 
                        ? 'border-accent shadow-lg shadow-accent/10' 
                        : 'border-border-secondary hover:border-border-primary'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {touched.name && errors.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-red-400 rounded-full" />
                      {errors.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="relative group">
                <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-accent' : 'text-text-muted'
                  }`} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('email')}
                    placeholder="tu@email.com"
                    required
                    className={`w-full theme-card py-4 pl-12 pr-4 rounded-xl focus:outline-none transition-all duration-300 ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-400'
                        : focusedField === 'email' 
                        ? 'border-accent shadow-lg shadow-accent/10' 
                        : 'border-border-secondary hover:border-border-primary'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {touched.email && errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-red-400 rounded-full" />
                      {errors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="relative group">
                <label htmlFor="message" className="block text-sm font-semibold text-text-secondary mb-2">
                  Mensaje
                </label>
                <div className="relative">
                  <FiMessageCircle className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'message' ? 'text-accent' : 'text-text-muted'
                  }`} />
                  <textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('message')}
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                    rows={6}
                    className={`w-full theme-card py-4 pl-12 pr-4 rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                      touched.message && errors.message
                        ? 'border-red-500 focus:border-red-400'
                        : focusedField === 'message' 
                        ? 'border-accent shadow-lg shadow-accent/10' 
                        : 'border-border-secondary hover:border-border-primary'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {touched.message && errors.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-red-400 rounded-full" />
                      {errors.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full theme-button-primary py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <BiRocket className="w-6 h-6" />
                      Enviar mensaje
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:w-80 space-y-6">
            
            <div className="theme-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <HiSparkles className="text-accent" />
                ¿Por qué contactarme?
              </h3>
              <ul className="space-y-3 text-text-tertiary">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span>Respuesta rápida (24-48 horas)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-secondary rounded-full mt-2 flex-shrink-0" />
                  <span>Consulta inicial gratuita</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-tertiary rounded-full mt-2 flex-shrink-0" />
                  <span>Soluciones personalizadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span>Enfoque en resultados</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
