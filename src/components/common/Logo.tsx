// Marca: nombre y posicionamiento en dos lineas.
// Dos renglones ocupan menos a lo ancho que uno solo con las dos cosas, asi que
// el posicionamiento puede verse tambien en movil.
// La tipografia la hereda del body (ver Layout): una sola familia en toda la web.
import { SITE } from "../../util/site";

const Logo = () => {
  return (
    <span className="flex flex-col leading-tight">
      <span className="whitespace-nowrap text-sm font-semibold text-black sm:text-lg dark:text-white">
        {SITE.name}
      </span>
      <span className="whitespace-nowrap text-[0.65rem] font-light text-gray-500 sm:text-sm dark:text-gray-400">
        {SITE.tagline}
      </span>
    </span>
  );
};

export default Logo;
