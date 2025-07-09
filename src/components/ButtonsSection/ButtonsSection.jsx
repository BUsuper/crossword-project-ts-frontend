import "./ButtonsSection.css";
import { useDispatch, useSelector } from "react-redux";
import { setHasErrors, setIsChecking, setIsEndgameModalOpen, setIsFinished } from "../../slices/statusesSlice";
import { selectIsChecking, selectIsFinished } from "../../slices/statusesSelectors";

export function ButtonsSection() {
    const dispatch = useDispatch();
    const isChecking = useSelector(selectIsChecking);
    const isFinished = useSelector(selectIsFinished);

    // Toggles checking mode
    const toggleCheck = () => {
        dispatch(setHasErrors(false));
        dispatch(setIsChecking(!isChecking));
    }

    const finishCrossword = () => {
        dispatch(setIsChecking(true));
        dispatch(setIsFinished(true));
        dispatch(setIsEndgameModalOpen(true));
    }

    // It says "Change answers" because editing is disabled (in CrosswordCell) in checking mode
    return <div id="ButtonsSection">
        <input
            type="button" 
            onClick={toggleCheck} 
            value={isChecking ? "Change answers" : "Check"}
            disabled={isFinished}
        >
        </input>
        <input
            type="button"
            onClick={finishCrossword}
            value={"Finish"}
            disabled={isFinished}
        >
        </input>
    </div>
}