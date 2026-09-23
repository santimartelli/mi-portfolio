// Sobre mi: la trayectoria como una sola historia, en unidades anchas y repetibles.
import type { AboutTranslations } from '../../util/i18n';

interface AboutProps {
  content: AboutTranslations;
}

const About = ({ content: t }: AboutProps) => {
  return (
    <section id="about" className="border-t border-gray-200 py-20 sm:py-28 dark:border-gray-700">
      <div className="shell">
        <h2 className="text-headline font-light text-black dark:text-white">
          {t.title}
        </h2>
        <p className="measure mt-5 text-lead font-light text-gray-600 dark:text-gray-400">
          {t.lead}
        </p>

        {/* Cada etapa: etiqueta a la izquierda, prosa a la derecha. Filas, no cajas. */}
        <div className="mt-16">
          {t.story.map((block) => (
            <article
              key={block.id}
              className="grid gap-4 border-b border-gray-200 py-10 lg:grid-cols-12 lg:gap-12 dark:border-gray-700">
              <h3 className="text-title-lg font-light text-black lg:col-span-4 dark:text-white">
                {block.title}
              </h3>
              <div className="space-y-5 lg:col-span-8">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="measure font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* El puente entre los dos mundos, en una banda ancha */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-12">
          <h3 className="text-title-lg font-light text-black lg:col-span-4 dark:text-white">
            {t.bridge.title}
          </h3>
          <div className="space-y-5 lg:col-span-8">
            {t.bridge.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="measure text-lead font-light text-gray-600 dark:text-gray-400">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Lo que aporto: tres unidades en fila, separadas por filete */}
        <div className="mt-20">
          <h3 className="text-title-lg font-light text-black dark:text-white">
            {t.principles.title}
          </h3>
          <div className="mt-8 grid gap-10 border-t border-gray-200 pt-8 md:grid-cols-3 lg:gap-16 dark:border-gray-700">
            {t.principles.items.map((item) => (
              <div key={item.title}>
                <h4 className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
                  {item.title}
                </h4>
                <p className="mt-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
