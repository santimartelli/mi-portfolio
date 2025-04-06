import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload, FaFilePdf, FaFileAlt } from "react-icons/fa";

const SocialCV = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <section
      id="social-cv"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300">
          Conectemos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12">
          También puedes encontrarme en mis redes sociales o descargar mi CV
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
          {/* CV Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-medium text-slate-200 mb-4">Currículum Vitae</h3>

            <div className="flex flex-col space-y-4">
              <motion.a
                href="/CVSantiagoMartelli.pdf"
                download
                className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 group"
                whileHover={{ x: 5 }}
                initial={{ x: 0 }}>
                <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-full">
                  <FaFilePdf className="w-5 h-5 text-red-400" />
                </div>
                <div>
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
                className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 group"
                whileHover={{ x: 5 }}
                initial={{ x: 0 }}>
                <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-full">
                  <FaFileAlt className="w-5 h-5 text-blue-300" />
                </div>
                <div>
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

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-medium text-slate-200 mb-4">Redes Sociales</h3>

            <div className="flex flex-col space-y-4">
              <motion.a
                href="https://www.linkedin.com/in/santiagomartelli/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 group"
                whileHover={{ x: 5 }}
                initial={{ x: 0 }}>
                <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-full">
                  <FaLinkedin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
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
                className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 group"
                whileHover={{ x: 5 }}
                initial={{ x: 0 }}>
                <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-full">
                  <FaGithub className="w-5 h-5 text-white" />
                </div>
                <div>
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
        </div>

        {/* Technical decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-tr from-slate-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-slate-500/10 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default SocialCV;
