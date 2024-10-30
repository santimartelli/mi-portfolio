import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
  const textRef = useRef(null);
  const formRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-10%" });
  const formInView = useInView(formRef, { once: true, margin: "-20%" });

  return (
    <section id="contact" className="mx-auto flex flex-col justify-center w-full overflow-x-hidden">
      <div className="flex flex-col mx-12 gap-y-14 items-center pt-20 pb-20 md:pt-32 md:pb-40">
        <h2 className="text-3xl md:text-4xl uppercase">Contacto</h2>
        <motion.p
          ref={textRef}
          initial={{ opacity: 0, y: 50 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-justify text-lg 2xl:text-xl md:w-4/6">
          Si tienes alguna pregunta o simplemente quieres saludar, no dudes en escribirme. Estoy disponible para
          trabajar en proyectos interesantes.
        </motion.p>
        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 50 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          action="https://formsubmit.co/90453a8b6d243aa64cc7b871c1bf436f"
          method="POST"
          className="flex flex-col gap-y-4 w-full max-md:mx-4 md:w-4/6 lg:w-3/6 text-base md:text-base lg:text-lg 2xl:text-xl">
          {/* Honeypot */}
          <input type="text" name="_honey" style={{ display: "none" }} />
          {/* desactivar el captcha de formsubmit.co */}
          <input type="hidden" name="_captcha" value="false" />
          {/* Blacklist */}
          <input type="hidden" name="_blacklist" value="spammy pattern, banned term, phrase" />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="p-2 border-b
            border-gray-300 focus:outline-none focus:border-b focus:border-b-sky-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            required
            className="p-2 border-b
            border-gray-300 focus:outline-none focus:border-b focus:border-b-sky-700"
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            className="p-2 border-b border-gray-300
            focus:outline-none focus:border-b focus:border-b-sky-700"></textarea>

          <input type="hidden" name="_subject" value="***Nuevo mensaje*** | www.martelli.dev" />
          <input type="hidden" name="_next" value="https://www.martelli.dev/feedbackemail" />
          <div className="w-full flex items-center justify-center mt-6">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center px-24 py-4 overflow-hidden text-white transition duration-300 ease-out border border-black rounded-sm group active:border-green-600">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-500 -translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-black text-lg transition-all duration-300 transform group-hover:translate-y-full ease">
                Enviar
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
