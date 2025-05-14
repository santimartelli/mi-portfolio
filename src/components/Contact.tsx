import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
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

    setTimeout(() => {
      const form = e.target as HTMLFormElement;
      form.submit();
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
          <p className="text-lg md:text-xl text-[#C5C6C7]">
            ¿Tienes alguna pregunta o propuesta? No dudes en <span className="text-[#66FCF1]">contactarme</span>
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formState.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
                className="w-full bg-[#1F2833] text-white placeholder-[#C5C6C7] border-2 border-[#45A29E]/20 rounded-xl py-3.5 px-12 focus:outline-none focus:border-[#66FCF1] group-hover:border-[#66FCF1]/30 transition-colors text-base"
              />
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
                value={formState.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-[#1F2833] text-white placeholder-[#C5C6C7] border-2 border-[#45A29E]/20 rounded-xl py-3.5 px-12 focus:outline-none focus:border-[#66FCF1] group-hover:border-[#66FCF1]/30 transition-colors text-base"
              />
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
                value={formState.message}
                onChange={handleChange}
                placeholder="Mensaje"
                required
                rows={5}
                className="w-full bg-[#1F2833] text-white placeholder-[#C5C6C7] border-2 border-[#45A29E]/20 rounded-xl py-3.5 px-12 focus:outline-none focus:border-[#66FCF1] group-hover:border-[#66FCF1]/30 transition-colors resize-none text-base"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`flex items-center gap-2 px-8 py-3.5 bg-[#66FCF1] text-[#0B0C10] rounded-xl font-semibold hover:bg-[#45A29E] transition-all duration-300 transform hover:scale-105 ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                <span>Enviar mensaje</span>
                <FiSend className={`w-5 h-5 ${submitting ? "animate-ping" : ""}`} />
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2 text-[#66FCF1] mt-6 bg-[#1F2833] py-3 rounded-xl border border-[#66FCF1]">
                <span className="text-lg">¡Mensaje enviado con éxito!</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
