import "./QuestionsSection.css";
import type { JSX } from "react";
import { QuestionsBlock } from "..";

export function QuestionsSection(): JSX.Element {
  return (
    <div id="QuestionsSection">
      <QuestionsBlock direction="right" />
      <hr />
      <QuestionsBlock direction="down" />
    </div>
  );
}
