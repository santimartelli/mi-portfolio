import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
  readonly title: string;
  readonly title2: string;
  readonly body: string;
  readonly technologies: readonly string[];
  readonly href: string;
  readonly github: string;
  readonly image: string;
  onClose: () => void;
}

function Modal({ title, title2, body, technologies, href, github, image, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  // Handle ESC key and focus management
  useEffect(() => {
    // Save current active element and focus modal
    previousActiveElement.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to previous element
      previousActiveElement.current?.focus();
    };
  }, [handleKeyDown]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY;

    // Add styles to prevent scrolling
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Cleanup function to restore scrolling when modal closes
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0B0C10]/95 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <motion.div
        ref={modalRef}
        className="bg-[#1A1A1A] rounded-xl max-w-4xl w-full flex flex-col overflow-hidden border border-[#45A29E]/20 shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        tabIndex={-1}>
        <div className="relative">
          {/* Image Header */}
          <div className="h-[200px] sm:h-[300px] relative">
            <img src={image} alt={`${title} ${title2}`} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] to-transparent" />
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-[#1F2833]/70 hover:bg-[#1F2833] p-2 rounded-full transition-all duration-150 text-[#C5C6C7] hover:text-white backdrop-blur-sm"
            onClick={onClose}
            aria-label="Cerrar modal">
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
          <div className="p-4 sm:p-8">
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-6">
              {title} <span className="text-[#C5C6C7]">{title2}</span>
            </h2>

            <p className="text-[#C5C6C7] mb-8 text-sm sm:text-base">{body}</p>

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
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#1F2833]/30 text-white border border-[#45A29E]/20 hover:border-[#66FCF1]/30 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45A29E]"
                aria-label={`Ver sitio web de ${title} ${title2}`}>
                <FaGlobe className="text-[#66FCF1]" aria-hidden="true" />
                Ver sitio web
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#1F2833]/30 text-white border border-[#45A29E]/20 hover:border-[#66FCF1]/30 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45A29E]"
                aria-label={`Ver código fuente de ${title} ${title2}`}>
                <FaGithub className="text-[#66FCF1]" aria-hidden="true" />
                Ver código
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
