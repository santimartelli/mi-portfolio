import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useEffect } from "react";

interface Props {
  title: string;
  title2: string;
  body: string;
  technologies: string[];
  href: string;
  github: string;
  image: string;
  onClose: () => void;
}

export default function Modal({ title, title2, body, technologies, href, github, image, onClose }: Props) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0B0C10]/95 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}>
      <motion.div
        className="bg-[#1A1A1A] rounded-xl max-w-4xl w-full my-8 flex flex-col overflow-hidden border border-[#45A29E]/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
        <div className="relative">
          {/* Image Header */}
          <div className="h-[240px] sm:h-[300px] relative">
            <img src={image} alt={`${title} ${title2}`} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] to-transparent" />
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-[#1F2833]/70 hover:bg-[#1F2833] p-2 rounded-full transition-all duration-150 text-[#C5C6C7] hover:text-white backdrop-blur-sm"
            onClick={onClose}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {title} <span className="text-[#C5C6C7]">{title2}</span>
            </h2>

            <p className="text-[#C5C6C7] mb-8">{body}</p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Tecnologías</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-[#0B0C10]/30 text-[#C5C6C7] border border-[#45A29E]/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1F2833] hover:bg-[#45A29E]/90 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45A29E]">
                <FaGlobe className="text-[#66FCF1]" />
                Ver sitio web
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#1F2833]/30 text-white border border-[#45A29E]/20 hover:border-[#66FCF1]/30 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45A29E]">
                <FaGithub className="text-[#66FCF1]" />
                Ver código
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
