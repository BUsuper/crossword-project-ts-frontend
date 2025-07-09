import "./Header.css";
import { ButtonsSection, Timer, CrosswordSelection } from "../../components";

export function Header() {
  return (
    <header>
      <ButtonsSection></ButtonsSection>
      <Timer></Timer>
      <CrosswordSelection></CrosswordSelection>
    </header>
  );
}
