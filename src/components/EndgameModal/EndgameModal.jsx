import { useDispatch, useSelector } from "react-redux";
import "./EndgameModal.css";
import closeModalLogo from "../../assets/close.svg";
import { selectHasErrors, selectTime } from "../../slices/statusesSelectors";
import {
  setIsEndgameModalOpen,
  setIsShowingAnswers,
} from "../../slices/statusesSlice";

export function EndgameModal() {
  const hasErrors = useSelector(selectHasErrors);
  const { minutes, seconds } = useSelector(selectTime);

  const dispatch = useDispatch();

  return (
    <div id="EndgameModal">
      <div id="modalUpperRow">
        <img
          id="closeEndgameModalButton"
          src={closeModalLogo}
          onClick={() => dispatch(setIsEndgameModalOpen(false))}
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
        {hasErrors ? (
          <input
            type="button"
            value="Show answers"
            onClick={() => dispatch(setIsShowingAnswers(true))}
          ></input>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
