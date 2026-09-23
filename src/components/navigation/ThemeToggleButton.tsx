// Conmutador de tema. Sin animacion de libreria: una transicion CSS basta.
import { useThemeContext } from "../../util/ThemeContext";

interface ThemeToggleButtonProps {
  labels: { toLight: string; toDark: string };
}

const ThemeToggleButton = ({ labels }: ThemeToggleButtonProps) => {
  const { theme, changeTheme } = useThemeContext();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => changeTheme(isLight ? "dark" : "light")}
      className="flex h-9 w-9 items-center justify-center border border-rule text-muted transition-colors duration-200 ease-out hover:border-rule-strong hover:text-ink"
      aria-label={isLight ? labels.toDark : labels.toLight}>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true">
        {isLight ? (
          <path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4m0-14.2l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </>
        )}
      </svg>
    </button>
  );
};

export default ThemeToggleButton;
