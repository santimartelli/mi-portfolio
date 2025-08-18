import { ThemeProvider } from "../util/ThemeContext";
import Navbar from "./Navbar";

export default function NavbarWithTheme() {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}