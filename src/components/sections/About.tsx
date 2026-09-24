// Sobre mi. Titular y entradilla arriba, y debajo dos bandas en fila: las tres
// paradas de la trayectoria (Hospitality, Operaciones, Tecnologia) y, despues,
// lo que aporto. Sin columnas enfrentadas y sin cajas: cada banda son tres
// piezas cortas que se leen de un vistazo, y el detalle vive donde toca
// (experiencia, skills y proyectos).
import type { AboutTranslations } from '../../util/i18n';

interface AboutProps {
  content: AboutTranslations;
}

const About = ({ content: t }: AboutProps) => {
  return (
    <section id="about" className="section-rule section-rule-hero py-20 sm:py-28">
      <div className="shell">
        <h2 className="text-headline font-light text-black dark:text-white">
          {t.title}
        </h2>
        <p className="measure mt-5 text-lead font-light leading-[1.6] text-gray-600 dark:text-gray-400">
          {t.lead}
        </p>

        {/* La trayectoria, de izquierda a derecha: una parada por columna, cada
            una con su borde de 1px, que es como se declara un contenedor en este
            mundo. La rejilla las estira a la misma altura. */}
        <ol className="mt-16 grid list-none gap-10 lg:grid-cols-3 lg:gap-16">
          {t.steps.map((step) => (
            <li key={step.id} className="border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
                {step.title}
              </h3>
              <p className="measure mt-3 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                {step.line}
              </p>
            </li>
          ))}
        </ol>

        {/* Lo que aporto: el titulo de la banda a la izquierda y las tres piezas
            como filas, cada una con su rotulo en versalitas. Las separa el aire,
            sin filetes: la banda de paradas ya lleva bordes y no hace falta otra
            regla. */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h3 className="text-subhead font-light text-black lg:col-span-3 dark:text-white">
            {t.principles.title}
          </h3>
          <dl className="lg:col-span-9">
            {t.principles.items.map((item) => (
              <div key={item.title} className="py-6 first:pt-0 last:pb-0">
                <dt className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
                  {item.title}
                </dt>
                <dd className="measure mt-2 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
