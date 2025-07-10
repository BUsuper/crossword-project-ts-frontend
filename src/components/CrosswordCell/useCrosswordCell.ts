import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectIsChecking,
  selectIsShowingAnswers,
} from "../../slices/statusesSelectors";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { setHasErrors } from "../../slices/statusesSlice";
import {
  selectIsVerticalSelection,
  selectSelectedCell,
} from "../../slices/selectedSelectors";
import {
  setIsVerticalSelection,
  setSelectedCell,
} from "../../slices/selectedSlice";
import {
  selectHorizontalIterationOrder,
  selectVerticalIterationOrder,
} from "../../slices/crosswordSelectors";
import type { IterationOrder } from "../../utils/utils";

export type UseCrosswordCellReturns = {
  isChecking: boolean;
  isShowingAnswers: boolean;
  isCorrectLetter: boolean;
  isCurrentlySelected: boolean;
  inputId: string;
  userLetter: string;
  handleClick: (currentCellId: string, isCurrentlySelected: boolean) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, id: string) => void;
  handleKeyUp: (e: KeyboardEvent<HTMLInputElement>, id: string) => void;
};

export function useCrosswordCell(
  y: number,
  x: number,
  correctAnswer: string
): UseCrosswordCellReturns {
  const isChecking: boolean = useAppSelector(selectIsChecking);
  const isShowingAnswers: boolean = useAppSelector(selectIsShowingAnswers);
  const selectedCell: string = useAppSelector(selectSelectedCell);
  const isVerticalSelection: boolean = useAppSelector(
    selectIsVerticalSelection
  );
  const verticalIterationOrder: IterationOrder = useAppSelector(
    selectVerticalIterationOrder
  );
  const horizontalIterationOrder: IterationOrder = useAppSelector(
    selectHorizontalIterationOrder
  );
  const [userLetter, setUserLetter] = useState<string>("");

  const dispatch = useAppDispatch();

  const inputId: string = `${y}:${x}`;

  const isCurrentlySelected: boolean = selectedCell === inputId;

  const convertId = (id: string): number[] => id.split(":").map((id) => +id);

  // Focuses on the next cell in the iteration order and changes selectedCell accordingly
  const focusNext = (
    id: string,
    iterationOrder: IterationOrder,
    skipFilled: boolean
  ): void => {
    let currentId: number[] = convertId(id);
    let currentIndex: number = iterationOrder.findIndex(
      (cellId) => cellId[0] === currentId[0] && cellId[1] === currentId[1]
    );

    while (true) {
      if (currentIndex < iterationOrder.length - 1) {
        const nextCellId: string = iterationOrder[currentIndex + 1].join(":");
        const nextCell = document.getElementById(
          nextCellId
        ) as HTMLInputElement;

        if (skipFilled) {
          if (!nextCell.value) {
            dispatch(setSelectedCell(nextCellId));
            nextCell.focus();
            break;
          } else {
            if (++currentIndex < iterationOrder.length - 1) {
              continue;
            }
          }
        } else {
          dispatch(setSelectedCell(nextCellId));
          nextCell.focus();
          break;
        }
      } else {
        break;
      }
    }
  };

  // Focuses on the previous cell in the iteration order and changes selectedCell accordingly
  const focusPrev = (id: string, iterationOrder: IterationOrder): void => {
    const reverseIterationOrder: IterationOrder = iterationOrder
      .slice()
      .reverse();

    let currentId: number[] = convertId(id);
    let currentIndex: number = reverseIterationOrder.findIndex(
      (cellId) => cellId[0] === currentId[0] && cellId[1] === currentId[1]
    );

    while (true) {
      if (currentIndex < reverseIterationOrder.length - 1) {
        const nextCellId: string =
          reverseIterationOrder[currentIndex + 1].join(":");
        const nextCell = document.getElementById(
          nextCellId
        ) as HTMLInputElement;

        dispatch(setSelectedCell(nextCellId));
        nextCell.focus();
        break;
      } else {
        break;
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    const inputElement: HTMLInputElement = e.target;
    const userInput: string = inputElement.value;

    setUserLetter(userInput);
    const iterationOrder: IterationOrder = isVerticalSelection
      ? verticalIterationOrder
      : horizontalIterationOrder;

    if (userInput.length > 0) {
      focusNext(id, iterationOrder, true);
    }
  };

  const handleKeyUp = (
    e: KeyboardEvent<HTMLInputElement>,
    id: string
  ): void => {
    const inputElement = e.target as HTMLInputElement;
    const inputValue: string = inputElement.value;

    const iterationOrder: IterationOrder = isVerticalSelection
      ? verticalIterationOrder
      : horizontalIterationOrder;

    if (e.key === "Backspace" && inputValue === "") {
      focusPrev(id, iterationOrder);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    id: string
  ): void => {
    const iterationOrder: IterationOrder = isVerticalSelection
      ? verticalIterationOrder
      : horizontalIterationOrder;

    if (e.key === "Tab") {
      e.preventDefault();
      focusNext(id, iterationOrder, false);
    }
  };

  // Make selection direction change if the same cell is clicked twice
  const handleClick = (
    currentCellId: string,
    isCurrentlySelected: boolean
  ): void => {
    if (isCurrentlySelected) {
      dispatch(setIsVerticalSelection(!isVerticalSelection));
    } else {
      dispatch(setSelectedCell(currentCellId));
    }
  };

  // This is used when letter is rendered and checking mode is active to determine
  // if the user's input is a correct answer and determine the input tag class
  // accordingly to change the color of the letter
  const isCorrectLetter: boolean = userLetter === correctAnswer;

  // If the letter is wrong and the checking mode is on, dispatch the action
  // useEffect ensures that it's done when isChecking changes, not during the render (that would cause an error)
  // If at least one letter triggers hasErrors (because it's not correct), you can't win
  useEffect(() => {
    if (isChecking && !isCorrectLetter) dispatch(setHasErrors(true));
  }, [isChecking, isCorrectLetter, dispatch]);

  return {
    isChecking,
    isShowingAnswers,
    isCorrectLetter,
    isCurrentlySelected,
    inputId,
    userLetter,
    handleClick,
    handleInputChange,
    handleKeyDown,
    handleKeyUp,
  };
}
