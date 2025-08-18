import { motion } from "framer-motion";
import { useRef, useCallback, memo } from "react";
import { useInView } from "framer-motion";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import useForm from "../util/useForm";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
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
  }, [setFieldTouched]);

  const onSubmit = useCallback(async (formValues: ContactFormValues) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formValues);
      
      // Reset form after successful submission
      reset();
      
      // You could show a success message here
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }, [reset]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0B0C10] overflow-hidden flex items-center">
      {/* Background Pattern with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-transparent to-[#0B0C10] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24 md:py-32 z-10">
        {/* Title with Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1F2833] border border-[#45A29E]/20 text-sm font-medium mb-8 mx-auto w-fit">
          <span className="text-[#66FCF1]">¿Hablamos?</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-8 text-center text-white">
          Contacto
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16">
          <p className="text-lg md:text-xl text-[#C5C6C7] mb-4">
            ¿Tienes alguna pregunta o propuesta? No dudes en <span className="text-[#66FCF1]">contactarme</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <HiOutlineMail className="text-[#66FCF1] w-5 h-5" />
            <a 
              href="mailto:santimartelli@gmail.com" 
              className="text-[#66FCF1] hover:text-white transition-colors duration-300 font-medium">
              santimartelli@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Name Input */}
            <div className="relative group">
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66FCF1] w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nombre"
                required
                aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                className={`w-full bg-[#1F2833] text-white placeholder-[#C5C6C7] border-2 rounded-xl py-3.5 px-12 focus:outline-none transition-colors text-base ${
                  touched.name && errors.name
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#45A29E]/20 focus:border-[#66FCF1] group-hover:border-[#66FCF1]/30'
                }`}
              />
              {touched.name && errors.name && (
                <div id="name-error" role="alert" className="text-red-400 text-sm mt-1 px-2">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66FCF1] w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                required
                aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className={`w-full bg-[#1F2833] text-white placeholder-[#C5C6C7] border-2 rounded-xl py-3.5 px-12 focus:outline-none transition-colors text-base ${
                  touched.email && errors.email
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#45A29E]/20 focus:border-[#66FCF1] group-hover:border-[#66FCF1]/30'
                }`}
              />
              {touched.email && errors.email && (
                <div id="email-error" role="alert" className="text-red-400 text-sm mt-1 px-2">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="relative group">
              <label htmlFor="message" className="sr-only">
                Mensaje
              </label>
              <BiMessageDetail className="absolute left-4 top-4 text-[#66FCF1] w-5 h-5" />
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mensaje"
                required
                rows={5}
                aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                className={`w-full bg-[#1F2833] text-white placeholder-[#C5C6C7] border-2 rounded-xl py-3.5 px-12 focus:outline-none transition-colors resize-none text-base ${
                  touched.message && errors.message
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#45A29E]/20 focus:border-[#66FCF1] group-hover:border-[#66FCF1]/30'
                }`}
              />
              {touched.message && errors.message && (
                <div id="message-error" role="alert" className="text-red-400 text-sm mt-1 px-2">
                  {errors.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3.5 bg-[#66FCF1] text-[#0B0C10] rounded-xl font-semibold hover:bg-[#45A29E] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#66FCF1] focus:ring-offset-2 focus:ring-offset-[#0B0C10] ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Enviar mensaje de contacto">
                <span>Enviar mensaje</span>
                <FiSend className={`w-5 h-5 ${isSubmitting ? "animate-ping" : ""}`} aria-hidden="true" />
              </button>
            </div>

            {/* Loading state */}
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2 text-[#66FCF1] mt-6 bg-[#1F2833] py-3 rounded-xl border border-[#66FCF1]">
                <span className="text-lg">Enviando mensaje...</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);
