import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { JSX } from "react";
import "./EndgameModal.scss";
import closeModalLogo from "../../assets/close.svg";
import { selectHasErrors } from "../../slices/statusesSelectors";
import { selectTime } from "../../slices/timeSelectors";
import {
  setIsEndgameModalOpen,
  setIsShowingAnswers,
} from "../../slices/statusesSlice";

export function EndgameModal(): JSX.Element {
  type FinishTime = {
    minutes: number;
    seconds: number;
  };

  const hasErrors: boolean = useAppSelector(selectHasErrors);
  const { minutes, seconds }: FinishTime = useAppSelector(selectTime);

  const dispatch = useAppDispatch();

  return (
    <div id="EndgameModal">
      <div id="modalUpperRow">
        <img
          id="closeEndgameModalButton"
          src={closeModalLogo}
          onClick={() => dispatch(setIsEndgameModalOpen(false))}
          alt="Close"
        ></img>
      </div>
      <div id="modalResultsRow">
        {hasErrors ? (
          <div id="modalMessage">
            <h1>Oh no!</h1>
            <p>There are errors in your answers.</p>
            <p>You can see the correct answers by clicking the button below.</p>
          </div>
        ) : (
          <div id="modalMessage">
            <h1>Congratulations!</h1>
            <p>{`You have finished the crossword in ${minutes} ${
              minutes === 1 ? "minute" : "minutes"
            } ${seconds} ${seconds === 1 ? "second" : "seconds"}`}</p>
          </div>
        )}
      </div>
      <div id="modalBottomRow">
        {hasErrors && (
          <input
            type="button"
            value="Show answers"
            onClick={() => dispatch(setIsShowingAnswers(true))}
          />
        )}
      </div>
    </div>
  );
}
