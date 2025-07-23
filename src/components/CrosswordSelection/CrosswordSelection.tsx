import "./CrosswordSelection.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCrossword,
  setHorizontalIterationOrder,
  setVerticalIterationOrder,
} from "../../slices/crosswordSlice";
import { selectIsFinished } from "../../slices/statusesSelectors";
import { useEffect, useState } from "react";
import { type FormEvent, type JSX } from "react";
import { loadCrossword, loadCrosswordKeys } from "../../utils/utils";
import type { CrosswordFieldType } from "../../assets/crosswords";

export function CrosswordSelection(): JSX.Element {
  const [crosswordNames, setCrosswordNames] = useState<string[]>([]);
  const [selectedCrosswordName, setSelectedCrosswordName] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const isFinished: boolean = useAppSelector(selectIsFinished);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // target is the whole form, crosswords is the name of select in it
    const selectedCrosswordName = (
      (e.target as HTMLFormElement).elements.namedItem(
        "crosswords"
      ) as HTMLSelectElement
    ).value;

    setSelectedCrosswordName(selectedCrosswordName);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const keys: string[] | null = await loadCrosswordKeys();

      if (keys === null) {
        console.error("Cannot load the crossword keys");
      } else {
        setCrosswordNames(keys);
      }

      setLoading(false);
    };

    fetchKeys();
  }, []);

  useEffect(() => {
    const fetchCrossword = async () => {
      const crossword: CrosswordFieldType | null = await loadCrossword(
        selectedCrosswordName
      );

      if (crossword === null) {
        console.error("Cannot load the crossword");
      } else {
        dispatch(setCrossword(crossword));
        dispatch(setVerticalIterationOrder(crossword));
        dispatch(setHorizontalIterationOrder(crossword));
      }
    };

    fetchCrossword();
  }, [selectedCrosswordName, dispatch]);

  console.log(crosswordNames);

  return (
    <form
      name="CrosswordSelectionForm"
      id="CrosswordSelectionForm"
      onSubmit={handleSubmit}
    >
      <select name="crosswords" id="CrosswordsSelection" disabled={isFinished}>
        {loading ? (
          <option disabled>Loading</option>
        ) : crosswordNames ? (
          crosswordNames.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))
        ) : (
          <option disabled>Error while loading crossword names</option>
        )}
      </select>
      <input type="submit" value="Select" disabled={isFinished} />
    </form>
  );
}
