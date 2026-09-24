// Sobre mi. A la izquierda el titular, la entradilla y la trayectoria como linea
// de tiempo: tres paradas en orden, unidas por la espina que dibuja .timeline
// (y que se va rellenando con el scroll, ver el layout). A la derecha, en piezas
// cortas, lo que aporto. Sin cajas y sin prosa larga: cada parada cabe en una
// linea, y el detalle vive donde toca (experiencia, skills y proyectos).
import type { AboutTranslations } from '../../util/i18n';

interface AboutProps {
  content: AboutTranslations;
}

const About = ({ content: t }: AboutProps) => {
  return (
    <section id="about" className="section-rule section-rule-hero py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div className="lg:col-span-6">
            <h2 className="text-headline font-light text-black dark:text-white">
              {t.title}
            </h2>
            <p className="measure mt-5 text-lead font-light leading-[1.6] text-gray-600 dark:text-gray-400">
              {t.lead}
            </p>

            {/* La trayectoria, en orden. El hilo y el nodo los pone .timeline;
                aqui solo va el contenido de cada parada. */}
            <ol className="timeline mt-12">
              {t.steps.map((step) => (
                <li key={step.id}>
                  <h3 className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
                    {step.title}
                  </h3>
                  <p className="measure mt-2 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {step.line}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Lo que aporto: tres piezas cortas. Sin filetes; las separa el aire. */}
          <div className="lg:col-span-6">
            <h3 className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
              {t.principles.title}
            </h3>
            <div className="mt-8 space-y-8">
              {t.principles.items.map((item) => (
                <div key={item.title}>
                  <h4 className="text-subhead font-light text-black dark:text-white">
                    {item.title}
                  </h4>
                  <p className="measure mt-2 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
