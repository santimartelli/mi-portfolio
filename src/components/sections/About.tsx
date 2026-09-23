// Sección "Sobre mí": la narrativa hospitality → operaciones → tecnología.
import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import type { AboutTranslations } from '../../util/i18n';

/**
 * About.
 *
 * Cuenta la trayectoria como una sola historia: de dónde vengo (hospitality),
 * qué aprendí por el camino (operaciones) y qué añadí después (tecnología).
 * Todo el texto vive en el contenido por idioma.
 */
interface AboutProps {
  content: AboutTranslations;
}

const About = ({ content: t }: AboutProps) => {

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.05 });

  return (
    <section id="about" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div ref={contentRef} className="w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          {/* Encabezado */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t.title}
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              {t.lead}
            </p>
          </motion.header>

          {/* Trayectoria en tres bloques */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-24">
            {t.story.map((block, index) => (
              <motion.article
                key={block.id}
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full" aria-hidden="true" />
                  <h3 className="text-xl font-light text-black dark:text-white tracking-wide">
                    {block.title}
                  </h3>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Por qué las dos partes encajan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto mb-24 border-l-2 border-blue-400 dark:border-blue-500 pl-6 sm:pl-8">
            <h3 className="text-2xl font-light text-black dark:text-white tracking-wide mb-6">
              {t.bridge.title}
            </h3>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              {t.bridge.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Lo que aporto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full" aria-hidden="true" />
              <h3 className="text-2xl font-light text-black dark:text-white tracking-wide">
                {t.principles.title}
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {t.principles.items.map((item) => (
                <div key={item.title} className="text-center sm:text-left">
                  <h4 className="text-lg font-light text-black dark:text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
