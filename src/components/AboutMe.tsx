import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "../util/useMediaQuery";

const AboutMeSection = () => {
  const imageRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageRefMobile = useRef(null);
  const paragraphRefMobile = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const imageInView = useInView(imageRef, { once: true, margin: "-10%" });
  const paragraphInView = useInView(paragraphRef, { once: true, margin: "-10%" });
  const imageInViewMobile = useInView(imageRefMobile, { once: true, margin: "-25%" });
  const paragraphInViewMobile = useInView(paragraphRefMobile, { once: true, margin: "-25%" });

  return (
    <section id="about" className="w-full pt-20 pb-20 overflow-x-hidden">
      <div className="flex flex-col gap-y-10 max-md:mx-4 items-center">
        <h2 className="text-3xl font-bold text-center uppercase">Sobre Mí</h2>
        {!isMobile && (
          <div className="flex flex-col gap-y-8 items-center justify-center m-1 md:flex-row md:gap-x-5">
            <motion.img
              ref={imageRef}
              initial={{ opacity: 0, x: -50 }}
              animate={imageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src="/logo.jpg"
              alt="Santiago Martelli"
              className="rounded-full w-36"
            />
            <motion.p
              ref={paragraphRef}
              initial={{ opacity: 0, x: 50 }}
              animate={paragraphInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-justify px-4 md:w-2/3">
              Desarrollador de Aplicaciones Web motivado, entusiasta y con una sólida formación teórica. Aunuqe a simple
              vista mi experiencia parezca limitada, cuento con proyectos personales que muestran mis capacidades para
              construir páginas web tanto estáticas como dinámicas, brindando soluciones limpias e innovadoras a
              problemas reales. Me apasiona aprender y mejorar constantemente, por lo que estoy dispuesto a enfrentar
              nuevos desafíos y aportar valor a cualquier equipo de trabajo.
            </motion.p>
          </div>
        )}
        {isMobile && (
          <div className="flex flex-col gap-y-8 items-center justify-center m-1 overflow-x-hidden">
            <motion.img
              ref={imageRefMobile}
              initial={{ opacity: 0, y: 50 }}
              animate={imageInViewMobile ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src="/logo.jpg"
              alt="Santiago Martelli"
              className="rounded-full w-36"
            />
            <motion.p
              ref={paragraphRefMobile}
              initial={{ opacity: 0, y: 50 }}
              animate={paragraphInViewMobile ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-justify px-4 md:w-2/3">
              Desarrollador de Aplicaciones Web motivado, entusiasta y con una sólida formación teórica. Aunuqe a simple
              vista mi experiencia parezca limitada, cuento con proyectos personales que muestran mis capacidades para
              construir páginas web tanto estáticas como dinámicas, brindando soluciones limpias e innovadoras a
              problemas reales. Me apasiona aprender y mejorar constantemente, por lo que estoy dispuesto a enfrentar
              nuevos desafíos y aportar valor a cualquier equipo de trabajo.
            </motion.p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutMeSection;
