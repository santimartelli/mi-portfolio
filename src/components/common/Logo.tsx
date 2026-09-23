// Marca: nombre y posicionamiento seguidos, en una sola linea.
// Sin caja de iniciales y sin dos puntos: la jerarquia la hacen el peso y el
// color, no un separador. La tipografia la hereda del header (ver Navbar), que
// aplica la pila de display a toda la barra.
import { SITE } from "../../util/site";

const Logo = () => {
  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap">
      <span className="text-lg font-semibold text-black dark:text-white">{SITE.name}</span>
      {/* En pantallas estrechas no cabe junto a los controles: se oculta. */}
      <span className="hidden text-sm font-light text-gray-500 sm:inline dark:text-gray-400">
        {SITE.tagline}
      </span>
    </span>
  );
};

export default Logo;
