import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";
import {
  CrosswordField,
  EndgameModal,
  Header,
  QuestionsSection,
} from "../components";
import "./App.css";
import { selectIsEndgameModalOpen } from "../slices/statusesSelectors";

export default function App(): JSX.Element {
  const isEndgameModalOpen: boolean = useAppSelector(selectIsEndgameModalOpen);

  return (
    <>
      <Header />
      <div id="crosswordWrapprer">
        <CrosswordField />
        <QuestionsSection />
      </div>
      {isEndgameModalOpen && <EndgameModal />}
    </>
  );
}
