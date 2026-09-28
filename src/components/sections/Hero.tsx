// Hero: una sola composicion centrada, con el contacto al pie a la izquierda y
// el hueco de la foto de perfil a la derecha. La idea es la de la referencia que
// paso el usuario (pavlosanchez.com): nada compitiendo con la frase, el titular y
// el texto en el centro de la pantalla, y los datos al pie.
//
// El reparto es una rejilla de tres filas, `1fr / auto / 1fr`: la de en medio
// lleva el titular, la entradilla, las acciones y el marquee (centrados en los
// dos ejes), y las dos de fuera se reparten el aire a partes iguales, asi que el
// centro queda en el medio exacto de la franja que deja el header y el pie no lo
// descentra. El aire de abajo es el de siempre (1,5rem en movil y 4rem desde lg),
// que es lo que mantiene centrada la regla que separa del hero (ver
// `.section-rule-hero` en el layout).
//
// Sin imagen, sin estado, sin JavaScript y sin ninguna animacion de entrada: el
// hero se renderiza entero en el servidor. El hueco de la derecha es un marco de
// puntos para la foto de perfil, que todavia no existe: cuando la haya, se
// sustituye el marco por la imagen y se quita su rotulo.
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import type { HeroTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface HeroProps {
  content: HeroTranslations;
}

/** El canal del pie: el mismo renglon que la lista de contacto de la seccion de
 *  contacto, con el icono en el sitio del punto. */
const channelClass =
  'flex gap-3 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400';

/** El icono del canal, alineado con la primera linea del texto. */
const channelIconClass = 'mt-[0.2em] h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400';

/** El valor: el mismo subrayado suave que usan la seccion de contacto y los
 *  casos de estudio. */
const valueClass =
  'text-black underline decoration-gray-300 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:decoration-gray-500 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-400';

const Hero = ({ content: t }: HeroProps) => {
  // Los cuatro accesos directos, en el orden en que los pidio el usuario. El
  // correo abre el cliente de correo y WhatsApp la aplicacion; LinkedIn y GitHub
  // abren en pestana nueva.
  const channels = [
    { id: 'linkedin', icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn', value: SITE.linkedinHandle, external: true },
    { id: 'email', icon: FaEnvelope, href: `mailto:${SITE.email}`, label: 'Email', value: SITE.email, external: false },
    { id: 'whatsapp', icon: FaWhatsapp, href: SITE.whatsapp, label: 'WhatsApp', value: SITE.phone, external: true },
    { id: 'github', icon: FaGithub, href: SITE.github, label: 'GitHub', value: SITE.githubHandle, external: true },
  ];

  return (
    <section id="home" className="flex min-h-[100dvh] flex-col pt-16 pb-6 lg:min-h-screen lg:pb-0">
      <div className="shell grid flex-1 grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:pb-16">
        {/* El centro: el titular, la entradilla, las dos acciones y el marquee.
            La fila es `auto`, asi que su alto es el del contenido y las dos `1fr`
            de fuera lo dejan en el medio. */}
        <div className="row-start-2 flex flex-col items-center gap-7 text-center lg:gap-8">
          <h1 className="text-display max-w-[22ch] text-balance font-light text-black dark:text-white">
            {t.headline}
          </h1>

          {/* En movil la entradilla va a 1,5 de interlineado, que es el minimo
              comodo para texto corrido, en vez del 1,65 de la escala. */}
          <p className="measure text-pretty text-base font-light leading-normal text-gray-600 lg:text-lead lg:leading-[1.6] dark:text-gray-400">
            {t.description}
          </p>

          {/* Las dos acciones, una con relleno y otra solo con el filete de 1px,
              que es la forma de declarar profundidad de este mundo. Mismo cuerpo,
              mismo radio y mismo tempo, y al pasar el puntero solo cambia el gris
              del filete: asi la principal sigue siendo una sola. */}
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            <a
              href="#experience"
              className="cta-primary flex min-w-[10rem] items-center justify-center px-4 py-2 text-small font-semibold uppercase tracking-widest">
              {t.cta}
            </a>

            <a
              href="#projects"
              className="cta-secondary flex min-w-[10rem] items-center justify-center px-4 py-2 text-small font-semibold uppercase tracking-widest">
              {t.ctaProjects}
            </a>
          </div>

          {/* El marquee, a lo ancho del contenedor. Son dos copias identicas de la
              lista dentro de una pista que se desplaza la mitad de su ancho, asi
              que el bucle no tiene costura; la segunda copia va con aria-hidden
              para que quien use lector de pantalla no oiga la lista dos veces, y
              los puntos que separan las piezas son decorativos por el mismo
              motivo. */}
          <div className="marquee w-full">
            <div className="marquee-track">
              {[false, true].map((duplicada) => (
                <ul
                  key={String(duplicada)}
                  className="flex list-none items-center"
                  {...(duplicada ? { 'aria-hidden': true } : {})}>
                  {t.marquee.map((item) => (
                    <li
                      key={item}
                      className="flex shrink-0 items-center whitespace-nowrap text-small font-light text-gray-600 dark:text-gray-400">
                      {item}
                      <span aria-hidden="true" className="px-4 text-gray-300 dark:text-gray-600">
                        ·
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* El pie del hero: el contacto a la izquierda y el hueco de la foto a la
            derecha. El aire de abajo lo pone el `pb` del contenedor, asi que este
            bloque no lleva ninguno: sumarlo descentraria la regla que separa del
            hero. */}
        <div className="row-start-3 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <ul className="list-none space-y-2">
            {channels.map((channel) => (
              <li key={channel.id} className={channelClass}>
                <channel.icon className={channelIconClass} aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-black dark:text-white">
                    {channel.label}:
                  </strong>{' '}
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                    className={valueClass}>
                    {channel.value}
                  </a>
                </span>
              </li>
            ))}
          </ul>

          {/* Hueco para la foto de perfil. Va con marco de puntos para que se lea
              como lo que es —un sitio reservado— y no como una imagen rota, y con
              la proporcion de un retrato. */}
          <div className="flex aspect-[4/5] w-28 shrink-0 items-center justify-center rounded-xl border border-dashed border-gray-300 p-3 text-center dark:border-gray-700">
            <span className="text-label font-medium uppercase text-gray-500 dark:text-gray-400">
              {t.photoPlaceholder}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
