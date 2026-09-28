// Barra de navegacion con menu desplegable en todos los tamanos.
//
// **Los dos desplegables son `<details>` nativos**: abrir y cerrar lo hace el
// navegador, sin una sola linea de JavaScript, asi que funcionan aunque la isla
// no llegue a hidratarse. El estado vive en el atributo `[open]` y el CSS lo lee
// (ver `Layout.astro`): de ahi salen el panel y el aspa de las tres barras. React
// solo añade dos comodidades cuando hidrata: cerrar al pulsar fuera o con Escape,
// y cerrar el otro desplegable al abrir uno (eso ultimo tambien lo hace el
// navegador solo, por el `name` compartido de los dos `<details>`).
//
// La barra no se anima a si misma: su unico estado lo fija el scroll, y es el
// fondo. En cuanto la pagina se mueve, la barra pasa de opaca a translucida con
// el fondo difuminado (backdrop-filter) para que el contenido que pasa por debajo
// se lea como tal y no desaparezca de golpe. El difuminado esta siempre declarado
// y lo que cambia es la opacidad del blanco, que es lo unico que se puede
// interpolar: asi la transicion es continua. Sin JavaScript la barra se queda
// opaca y los paneles cerrados, que es exactamente el estado de antes.
import { useState, useEffect } from "react";
import { useActiveSection } from "../../util/useActiveSection";
import type { Locale, NavbarTranslations } from "../../util/i18n";
import Logo from "../common/Logo";
import LanguageSelector from "./LanguageSelector";
import { dropdownItemClass, dropdownPanelClass } from "./dropdownStyles";

interface NavbarProps {
  content: NavbarTranslations;
  locale: Locale;
}

const Navbar = ({ content: t, locale }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en/" : "/";

  const sections = [
    { key: "home", label: t.navigation.home },
    { key: "about", label: t.navigation.about },
    { key: "experience", label: t.navigation.experience },
    { key: "skills", label: t.navigation.skills },
    { key: "projects", label: t.navigation.projects },
    { key: "contact", label: t.navigation.contact },
  ];

  // Estado del fondo segun el scroll. El listener es pasivo y lleva un umbral de
  // 8px, que absorbe el rebote elastico de iOS (scrollY puede ser negativo) y el
  // ruido de las ruedas de los trackpads. Se comprueba tambien al montar porque
  // el selector de idioma guarda y restaura la posicion del scroll al navegar.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lo unico que aporta JavaScript al desplegable: cerrarlo al pulsar fuera o
  // con Escape, que un `<details>` no hace solo. Si la isla no hidrata, el
  // desplegable sigue abriendo y cerrando; simplemente no se cierra al pulsar
  // fuera.
  useEffect(() => {
    const closeAll = () => {
      document
        .querySelectorAll<HTMLDetailsElement>("details.dropdown[open]")
        .forEach((dropdown) => {
          dropdown.open = false;
        });
    };
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dropdown")) closeAll();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      aria-label={t.menuLabel}
      className={`nav-bar fixed inset-x-0 top-0 z-50 bg-white backdrop-blur-md transition-colors duration-200 ease-out dark:bg-gray-950 ${
        scrolled ? "supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-gray-950/85" : ""
      }`}>
      {/* El contenido va a sangre (`.bleed`: todo el ancho, sin tope y con una
          sangria corta). El usuario lo pidio asi dos veces, con un tramo en medio
          en el que iba en `.shell`: con `.bleed` la marca y los iconos se acercan
          a los bordes y dejan de compartir vertical con el contenido, que si sigue
          topado en 1600px. */}
      <div className="bleed flex h-16 items-center justify-between gap-3 sm:gap-6">
        {/* La marca: el retrato del usuario a la izquierda del logo, los dos
            dentro del mismo enlace a la portada. La foto va con `alt` vacio a
            proposito: no aporta nada que no diga el nombre que tiene al lado, y un
            lector de pantalla no necesita oir dos veces quien es. */}
        <a href={homeHref} className="flex shrink-0 items-center gap-3">
          <img
            src="/images/hero-photo.webp"
            alt=""
            width="1200"
            height="1220"
            loading="eager"
            decoding="async"
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
          <Logo />
        </a>


        {/* Los dos controles de la derecha van juntos, sin hueco entre sus cajas:
            el aire lo pone el padding asimetrico de cada boton, que empuja su
            dibujo hacia el vecino. Ver el comentario del boton del menu. */}
        <div className="flex shrink-0 items-center">
          <LanguageSelector content={t} locale={locale} />
          {/* Menu: mismo panel y mismos items que el selector de idioma.
              La caja es de 48x56 y el dibujo se empuja 2px hacia la izquierda con
              el padding de la derecha (las barras van centradas en la caja de
              contenido, asi que recortarla por un lado las mueve). Es la mitad
              del trabajo de acercar los dos iconos: el selector de idioma hace lo
              simetrico. Sin esto, con las dos cajas centradas, quedaban 42px
              entre el simbolo y las barras y parecian dos controles sueltos. */}
          <details name="barra" className="dropdown relative z-40">
          <summary
            aria-label={t.menuLabel}
            className="menu-button flex h-14 w-12 flex-col items-center justify-center pr-1 text-black dark:text-white">
            <span className="menu-bar block h-0.5 w-6 bg-current transition-transform duration-200 ease-out motion-reduce:transition-none" />
            <span className="menu-bar my-1 block h-0.5 w-6 bg-current transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none" />
            <span className="menu-bar block h-0.5 w-6 bg-current transition-transform duration-200 ease-out motion-reduce:transition-none" />
          </summary>

          <div id="primary-menu" className={dropdownPanelClass}>
            <ul className="list-none space-y-1">
              {sections.map((section) => {
                const isActive = activeSection === section.key;
                return (
                  <li key={section.key}>
                    <a
                      href={`${prefix}/#${section.key}`}
                      onClick={(e) => {
                        // El navegador no cierra el <details> al seguir un enlace.
                        (e.currentTarget.closest("details") as HTMLDetailsElement | null)?.removeAttribute("open");
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={dropdownItemClass(isActive)}>
                      {section.label}
                      {isActive && (
                        <span
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          </details>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
