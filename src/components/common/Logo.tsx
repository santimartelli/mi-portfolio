// Marca: nombre y posicionamiento en una sola linea.
// Sin caja de iniciales: el nombre se sostiene solo. El tema se resuelve con
// variantes `dark:`, como en el resto del sitio, en vez de leer el contexto.
import { SITE } from "../../util/site";

const Logo = () => {
  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap">
      <span className="font-display text-lg font-semibold uppercase tracking-wide text-black dark:text-white">
        {SITE.name}
      </span>
      {/* En pantallas estrechas no cabe junto a los controles: se oculta. */}
      <span className="hidden text-sm font-light text-gray-500 sm:inline dark:text-gray-400">
        : {SITE.tagline}
      </span>
    </span>
  );
};

export default Logo;
