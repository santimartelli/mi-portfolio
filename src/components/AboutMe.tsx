import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "../util/useMediaQuery";

const AboutMeSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const imageRef = useRef(null);
  const paragraphRef = useRef(null);

  const imageInView = useInView(imageRef, { once: true, margin: "-10%" });
  const paragraphInView = useInView(paragraphRef, { once: true, margin: "-10%" });

  return (
    <section className="flex flex-col items-center justify-center w-full overflow-x-hidden">
      <div className="flex flex-col gap-y-14 mx-12 items-center pt-20 pb-20 md:pt-10">
        <h2 className="text-3xl md:text-5xl text-center uppercase">Sobre Mí</h2>

        <div className="flex flex-col gap-y-8 items-center justify-center md:flex-row md:gap-x-5 overflow-hidden">
          <motion.img
            ref={imageRef}
            initial={{ opacity: 0, y: 50 }}
            animate={imageInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            src="/logo.jpg"
            alt="Santiago Martelli"
            className="rounded-full w-36"
          />
          <motion.p
            ref={paragraphRef}
            initial={{ opacity: 0, y: 50 }}
            animate={paragraphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center text-lg md:text-base lg:text-lg 2xl:text-xl text-justify min-h-36 md:w-2/3">
            Desarrollador de Aplicaciones Web motivado, entusiasta y con una sólida formación teórica. Además, cuento
            con diversos proyectos personales que muestran mis capacidades para construir páginas web tanto estáticas como
            dinámicas, brindando soluciones limpias e innovadoras a problemas reales. Me apasiona aprender y mejorar
            constantemente, por lo que estoy dispuesto a enfrentar nuevos desafíos y aportar valor a cualquier equipo de
            trabajo.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
