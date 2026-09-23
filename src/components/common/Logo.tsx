// Marca: iniciales en caja de tinta y nombre en la display condensada.
import { SITE } from "../../util/site";

const Logo = () => {
  return (
    <span className="flex items-baseline gap-3">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center border border-rule-strong font-display text-lg font-semibold leading-none text-ink">
        SM
      </span>
      <span className="hidden flex-col sm:flex">
        <span className="font-display text-xl font-medium leading-none tracking-tight text-ink">
          {SITE.name}
        </span>
        <span className="mt-1 font-mono text-micro uppercase tracking-[0.16em] text-muted">
          {SITE.tagline}
        </span>
      </span>
    </span>
  );
};

export default Logo;
