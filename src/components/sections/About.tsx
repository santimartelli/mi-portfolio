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
            <li key={step.id} className="rounded-xl border border-gray-200 p-6 transition-colors duration-200 ease-out hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500">
              <h3 className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
                {step.title}
              </h3>
              <p className="measure mt-3 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                {step.line}
              </p>
            </li>
          ))}
        </ol>

        {/* Lo que puedo aportar: titulo de banda y lista de tres piezas con
            guion, todo alineado a la izquierda. El rotulo va en negrita y
            engarzado con la linea, asi que cada pieza cae en una sola linea en
            escritorio. El guion es el mismo filete corto que usan experiencia y
            proyectos. */}
        <h3 className="mt-20 text-subhead font-light text-black dark:text-white">
          {t.principles.title}
        </h3>
        <ul className="mt-8 list-none space-y-4">
          {t.principles.items.map((item) => (
            <li
              key={item.title}
              className="flex gap-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
              <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
              <span>
                <strong className="font-semibold text-black dark:text-white">{item.title}:</strong>{' '}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
