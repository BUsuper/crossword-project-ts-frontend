import "./ButtonsSection.css";
import type { JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setHasErrors,
  setIsChecking,
  setIsEndgameModalOpen,
  setIsFinished,
} from "../../slices/statusesSlice";
import {
  selectIsChecking,
  selectIsFinished,
} from "../../slices/statusesSelectors";

export function ButtonsSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const isChecking: boolean = useAppSelector(selectIsChecking);
  const isFinished: boolean = useAppSelector(selectIsFinished);

  // Toggles checking mode
  const toggleCheck = (): void => {
    dispatch(setHasErrors(false));
    dispatch(setIsChecking(!isChecking));
  };

  const finishCrossword = (): void => {
    dispatch(setIsChecking(true));
    dispatch(setIsFinished(true));
    dispatch(setIsEndgameModalOpen(true));
  };

  // It says "Change answers" because editing is disabled (in CrosswordCell) in checking mode
  return (
    <div id="ButtonsSection">
      <input
        type="button"
        onClick={toggleCheck}
        value={isChecking ? "Change answers" : "Check"}
        disabled={isFinished}
      />
      <input
        type="button"
        onClick={finishCrossword}
        value={"Finish"}
        disabled={isFinished}
      />
    </div>
  );
}
