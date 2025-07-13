import "./Header.scss";
import type { JSX } from "react";
import { ButtonsSection, Timer, CrosswordSelection } from "..";

export function Header(): JSX.Element {
  return (
    <header>
      <ButtonsSection />
      <Timer />
      <CrosswordSelection />
    </header>
  );
}
