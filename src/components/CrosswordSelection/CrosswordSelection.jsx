import "./CrosswordSelection.css";
import { useDispatch, useSelector } from "react-redux";
import crosswords from "../../assets/crosswords";
import {
  setCrossword,
  setHorizontalIterationOrder,
  setVerticalIterationOrder,
} from "../../slices/crosswordSlice";
import { selectIsFinished } from "../../slices/statusesSelectors";

export function CrosswordSelection() {
  const crosswordNames = Object.keys(crosswords);
  const isFinished = useSelector(selectIsFinished);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // target is the whole form, crosswords is the name of select in it
    const selectedCrossword = e.target.elements.crosswords.value;
    dispatch(setCrossword(selectedCrossword));
    dispatch(setVerticalIterationOrder(selectedCrossword));
    dispatch(setHorizontalIterationOrder(selectedCrossword));
  };

  return (
    <form
      name="CrosswordSelectionForm"
      id="CrosswordSelectionForm"
      onSubmit={handleSubmit}
    >
      <select name="crosswords" id="CrosswordsSelection" disabled={isFinished}>
        {crosswordNames.map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
      <input type="submit" value="Select" disabled={isFinished}></input>
    </form>
  );
}
