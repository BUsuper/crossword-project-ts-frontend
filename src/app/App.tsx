import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";
import type { CrosswordFieldType } from "../assets/crosswords";
import {
  CrosswordField,
  EndgameModal,
  Header,
  QuestionsSection,
} from "../components";
import "./App.scss";
import { selectIsEndgameModalOpen } from "../slices/statusesSelectors";
import { selectCrossword } from "../slices/crosswordSelectors";

export default function App(): JSX.Element {
  const isEndgameModalOpen: boolean = useAppSelector(selectIsEndgameModalOpen);
  const crossword: CrosswordFieldType | null = useAppSelector(selectCrossword);

  return (
    <>
      <Header />
      {crossword ? (
        <div id="crosswordWrapprer">
          <CrosswordField />
          <QuestionsSection />
        </div>
      ) : (
        <div id="selectMessage">
          <p>Please, select a crossword</p>
        </div>
      )}
      {isEndgameModalOpen && <EndgameModal />}
    </>
  );
}
