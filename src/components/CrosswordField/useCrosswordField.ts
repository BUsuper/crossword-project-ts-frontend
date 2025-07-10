import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectSelectedCell,
  selectIsVerticalSelection,
} from "../../slices/selectedSelectors";
import { selectCrossword } from "../../slices/crosswordSelectors";
import { selectCurrentWord, filterDirection } from "../../utils/utils";
import { setIsVerticalSelection } from "../../slices/selectedSlice";
import { useEffect } from "react";
import type { CrosswordField } from "../../assets/crosswords";

export default function useCrosswordField(): {
  crossword: CrosswordField;
  currentWord: string[];
} {
  // Get height(rows) and width(columns) of the crossword object
  const crossword: CrosswordField = useAppSelector(selectCrossword);

  const dispatch = useAppDispatch();

  const [selectedCellY, selectedCellX]: string[] =
    useAppSelector(selectSelectedCell).split(":");
  const isVerticalSelection: boolean = useAppSelector(
    selectIsVerticalSelection
  );

  // A list of ids of all cells that should be highlighted as parts of selected row/column
  const cellsInSelectionList: string[] = Array.from(
    document.getElementsByClassName("CrosswordCell")
  )
    .map((cell): string => {
      const htmlCell = cell as HTMLElement;
      return htmlCell.id;
    })
    .filter((cellId: string): boolean =>
      filterDirection(cellId, isVerticalSelection, selectedCellY, selectedCellX)
    );

  const currentWord: string[] = selectCurrentWord(
    cellsInSelectionList,
    isVerticalSelection,
    selectedCellY,
    selectedCellX
  ).map((id: [number, number]): string => id.join(","));

  // This prevents selection when there is no actual word, just a single cell surrounded by emtpy cells
  // Need useEffect to avoid execution while CrosswordField is rendering
  useEffect(() => {
    // If there is selectedCellY, it means that the render is complete and the user is playing
    // This prevents infinite rerenders because of isVerticalSelection changes
    if (selectedCellY && currentWord.length < 2) {
      dispatch(setIsVerticalSelection(!isVerticalSelection));
    }
  }, [currentWord, isVerticalSelection, dispatch]);

  return {
    crossword,
    currentWord,
  };
}
