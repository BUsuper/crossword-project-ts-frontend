import "./CrosswordSelection.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import crosswords from "../../assets/crosswords";
import {
  setCrossword,
  setHorizontalIterationOrder,
  setVerticalIterationOrder,
} from "../../slices/crosswordSlice";
import { selectIsFinished } from "../../slices/statusesSelectors";
import type { FormEvent, JSX } from "react";

export function CrosswordSelection(): JSX.Element {
  const crosswordNames: string[] = Object.keys(crosswords);
  const isFinished: boolean = useAppSelector(selectIsFinished);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // target is the whole form, crosswords is the name of select in it
    const selectedCrossword = (
      (e.target as HTMLFormElement).elements.namedItem(
        "crosswords"
      ) as HTMLSelectElement
    ).value;

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
      <input type="submit" value="Select" disabled={isFinished} />
    </form>
  );
}
