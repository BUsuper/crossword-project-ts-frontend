import "./QuestionsSection.css";
import { QuestionsBlock } from "../../components";

export function QuestionsSection() {
  return (
    <div id="QuestionsSection">
      <QuestionsBlock direction="right"></QuestionsBlock>
      <hr></hr>
      <QuestionsBlock direction="down"></QuestionsBlock>
    </div>
  );
}
