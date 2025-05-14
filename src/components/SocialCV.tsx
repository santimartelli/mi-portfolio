import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
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
      className="relative w-full bg-[#0B0C10] text-white overflow-hidden py-24 md:py-32">
      {/* Background Pattern with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-transparent to-[#0B0C10] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* Title with Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1F2833] border border-[#45A29E]/20 text-sm font-medium mb-8 mx-auto w-fit">
          <span className="text-[#66FCF1]">Redes Sociales & CV</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-8 text-center text-white">
          Conectemos
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16">
          <p className="text-lg md:text-xl text-[#C5C6C7]">
            También puedes encontrarme en mis <span className="text-[#66FCF1]">redes sociales</span> o descargar mi{" "}
            <span className="text-[#66FCF1]">CV</span>
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* CV Downloads Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl bg-[#1F2833] border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300 transform hover:scale-[1.02]">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <FaFileDownload className="text-[#66FCF1] w-6 h-6" />
              <span>Descargar CV</span>
            </h3>
            <div className="space-y-6">
              <a
                href="/cv-es.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#C5C6C7] hover:text-white group p-4 rounded-lg bg-[#0B0C10]/50 border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300">
                <FaFilePdf className="text-[#66FCF1] w-5 h-5" />
                <span className="text-lg">Español (PDF)</span>
              </a>
              <a
                href="/cv-en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#C5C6C7] hover:text-white group p-4 rounded-lg bg-[#0B0C10]/50 border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300">
                <FaFileAlt className="text-[#66FCF1] w-5 h-5" />
                <span className="text-lg">English (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-xl bg-[#1F2833] border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300 transform hover:scale-[1.02]">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <FaLinkedin className="text-[#66FCF1] w-6 h-6" />
              <span>Redes Sociales</span>
            </h3>
            <div className="space-y-6">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#C5C6C7] hover:text-white group p-4 rounded-lg bg-[#0B0C10]/50 border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300">
                <FaGithub className="text-[#66FCF1] w-5 h-5" />
                <span className="text-lg">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#C5C6C7] hover:text-white group p-4 rounded-lg bg-[#0B0C10]/50 border border-[#45A29E]/20 hover:border-[#66FCF1]/30 transition-all duration-300">
                <FaLinkedin className="text-[#66FCF1] w-5 h-5" />
                <span className="text-lg">LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialCV;
