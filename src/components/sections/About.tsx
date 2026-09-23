// Sobre mi: la trayectoria como una sola historia, en dos columnas editoriales.
import type { AboutTranslations } from '../../util/i18n';

interface AboutProps {
  content: AboutTranslations;
}

const About = ({ content: t }: AboutProps) => {
  return (
    <section id="about" className="border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="font-display text-h2 font-medium text-ink">{t.title}</h2>
        <p className="mt-6 max-w-measure text-lead text-body">{t.lead}</p>

        {/* Cada bloque: etiqueta a la izquierda, prosa a la derecha. Filetes, no cajas. */}
        <div className="mt-16 border-t border-rule">
          {t.story.map((block) => (
            <article key={block.id} className="grid gap-3 border-b border-rule py-10 sm:grid-cols-12 sm:gap-8">
              <h3 className="font-display text-h3 font-medium text-ink sm:col-span-4">{block.title}</h3>
              <div className="space-y-5 text-body sm:col-span-8">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="max-w-measure">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-display text-h3 font-medium text-ink">{t.bridge.title}</h3>
          <div className="mt-6 space-y-5">
            {t.bridge.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="max-w-measure text-lead text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-h3 font-medium text-ink">{t.principles.title}</h3>
          <dl className="mt-6 border-t border-rule">
            {t.principles.items.map((item) => (
              <div key={item.title} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-12 sm:gap-8">
                <dt className="font-mono text-micro uppercase text-muted sm:col-span-4">{item.title}</dt>
                <dd className="max-w-measure text-body sm:col-span-8">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
