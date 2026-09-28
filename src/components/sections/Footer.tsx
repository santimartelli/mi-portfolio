// Pie: **una sola linea de cierre**, sin columnas. El usuario mando quitar el
// bloque de tres columnas —la marca con su descripcion, la navegacion y la lista
// de contacto— y quedarse solo con la linea de abajo, asi que el pie es ahora el
// aviso legal a la izquierda y, a la derecha, la ubicacion y **los cuatro canales
// de contacto**: los mismos cuatro del hero y de la seccion de contacto, en el
// mismo orden (LinkedIn, Email, WhatsApp y GitHub). Antes solo iban dos.
//
// **El pie es solo el container de esa linea**: el <footer> no reserva aire
// arriba ni tiene piezas propias. Lo unico que hay entre su borde y el contenido
// es el filete de arriba (1px de `gray-200`, el mismo gris de las tarjetas) y los
// 0,5rem de aire de dentro, que son **simetricos**: arriba y abajo. Ese aire es lo
// que deja los items **centrados en la caja del pie** —lo ultimo que pidio el
// usuario—, con el renglon de 48px a 8px del filete y a 8px del borde inferior.
// Llego a tener 7rem de aire arriba —eran los que centraban el separador que habia
// entre Contacto y el pie— y despues 1,25rem solo arriba: el usuario los mando
// quitar hasta dejar el pie reducido a su caja y con el contenido centrado. **El
// aire de arriba lo pone Contacto**, que reserva abajo sus 7rem, y como la seccion
// termina donde empieza el pie, el filete cae justo en esa frontera: es la linea
// del pie y a la vez el final de Contacto, sin un segundo separador.
//
// **El filete cruza de lado a lado**: «una linea horizontal (igual que el borde de
// las tarjetas) de un lado al otro», dijo el usuario. Es el borde superior del
// <footer>, que ya ocupa todo el ancho, asi que llega a los dos bordes de la
// pantalla y no lleva el desvanecido de los costados que tienen las reglas de las
// secciones.
//
// Los 0,5rem de arriba y de abajo son la cuenta que hace la barra por arriba —un
// bloque de 48px dentro de una banda de 64 lo deja 8px por cada lado—, que es lo
// que el usuario queria «igual que el header pero al reves»: los iconos del pie
// acaban a 8px del borde y el aviso legal a la misma altura que el nombre en la
// barra. Al ser simetricos, los items quedan centrados en la caja.
//
// **El contenedor es `.bleed`, el de la barra, no el `.shell` de las secciones**:
// el usuario pidio que el pie midiera lo mismo que el header, y el pie es la otra
// pieza que cierra la pagina, asi que comparte caja con la barra —todo el ancho y
// la sangria corta (1,5 / 2 / 3rem)—: el aviso legal arranca donde arranca la foto
// de la barra y los iconos acaban donde acaban los de la barra.
//
// Los campos que ya no se pintan —`brand.description`, todo `navigation`,
// `technologies` y `builtWith`— siguen en los dos `footer.json` y en el tipo, que
// es como el sitio guarda todo lo que se retira por si vuelve.
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import type { FooterTranslations } from '../../util/i18n';
import { SITE } from '../../util/site';

interface FooterProps {
  content: FooterTranslations;
}

/** La linea de cierre: el paso `ui`, un escalon por debajo del cuerpo. */
const closingClass = 'text-ui font-light text-gray-500 dark:text-gray-400';

const Footer = ({ content: t }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  // Los cuatro canales del sitio, en el orden de la seccion de contacto. Son
  // iconos sin texto, asi que el nombre accesible lo pone el aria-label; el
  // correo abre el cliente de correo y WhatsApp la aplicacion.
  const contactLinks = [
    { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn', external: true },
    { icon: FaEnvelope, href: `mailto:${SITE.email}`, label: 'Email', external: false },
    { icon: FaWhatsapp, href: SITE.whatsapp, label: 'WhatsApp', external: true },
    { icon: FaGithub, href: SITE.github, label: 'GitHub', external: true },
  ];

  return (
    <footer className="border-t border-gray-200 py-2 dark:border-gray-700">
      {/* El aire de dentro es simetrico (0,5rem arriba y abajo), asi que los items
          quedan **centrados en la caja del pie**: el renglon de 48px deja 8px
          hasta el filete y 8 hasta el borde inferior, que es exactamente la banda
          del header al reves —un bloque de 48px dentro de una banda de 64—. El
          resto del hueco de arriba lo pone Contacto con su padding de abajo, que
          es lo que deja la frontera entre las dos piezas donde cae el filete. */}
      <div className="bleed flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className={closingClass}>
          © {currentYear} {t.brand.name}. {t.copyright}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className={`flex items-center gap-2 ${closingClass}`}>
            <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />
            {t.location.value}
          </p>

          {/* Los iconos, en cajas de 48px (el objetivo tactil que usa todo el
              sitio) con el icono de 20: el pie es mas tranquilo que el hero, asi
              que el icono baja un paso y el objetivo no. */}
          <ul className="flex list-none items-center gap-1">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                  aria-label={link.label}
                  className="flex h-12 w-12 items-center justify-center text-gray-500 transition-colors duration-200 ease-out hover:text-black dark:text-gray-400 dark:hover:text-white">
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
