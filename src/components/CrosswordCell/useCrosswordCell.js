import { useDispatch, useSelector } from "react-redux";
import {
  selectIsChecking,
  selectIsShowingAnswers,
} from "../../slices/statusesSelectors";
import { useEffect, useState } from "react";
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

export default function useCrosswordCell(y, x, correctAnswer) {
  const isChecking = useSelector(selectIsChecking);
  const isShowingAnswers = useSelector(selectIsShowingAnswers);
  const selectedCell = useSelector(selectSelectedCell);
  const isVerticalSelection = useSelector(selectIsVerticalSelection);
  const verticalIterationOrder = useSelector(selectVerticalIterationOrder);
  const horizontalIterationOrder = useSelector(selectHorizontalIterationOrder);
  const [userLetter, setUserLetter] = useState("");

  const dispatch = useDispatch();

  const inputId = `${y}:${x}`;

  const isCurrentlySelected = selectedCell === inputId;

  const convertId = (id) => id.split(":").map((id) => +id);

  // Focuses on the next cell in the iteration order and changes selectedCell accordingly
  const focusNext = (id, iterationOrder, skipFilled) => {
    let currentId = convertId(id);
    let currentIndex = iterationOrder.findIndex(
      (cellId) => cellId[0] === currentId[0] && cellId[1] === currentId[1]
    );

    while (true) {
      if (currentIndex < iterationOrder.length - 1) {
        const nextCellId = iterationOrder[currentIndex + 1].join(":");
        const nextCell = document.getElementById(nextCellId);

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
  const focusPrev = (id, iterationOrder) => {
    const reverseIterationOrder = iterationOrder.slice().reverse();

    let currentId = convertId(id);
    let currentIndex = reverseIterationOrder.findIndex(
      (cellId) => cellId[0] === currentId[0] && cellId[1] === currentId[1]
    );

    while (true) {
      if (currentIndex < reverseIterationOrder.length - 1) {
        const nextCellId = reverseIterationOrder[currentIndex + 1].join(":");
        const nextCell = document.getElementById(nextCellId);

        dispatch(setSelectedCell(nextCellId));
        nextCell.focus();
        break;
      } else {
        break;
      }
    }
  };

  const handleInputChange = (e, id) => {
    const userInput = e.target.value;
    setUserLetter(userInput);
    const iterationOrder = isVerticalSelection
      ? verticalIterationOrder
      : horizontalIterationOrder;

    if (userInput.length > 0) {
      focusNext(id, iterationOrder, true);
    }
  };

  const handleKeyUp = (e, id) => {
    const iterationOrder = isVerticalSelection
      ? verticalIterationOrder
      : horizontalIterationOrder;

    if (e.key === "Backspace" && e.target.value === "") {
      focusPrev(id, iterationOrder);
    }
  };

  const handleKeyDown = (e, id) => {
    const iterationOrder = isVerticalSelection
      ? verticalIterationOrder
      : horizontalIterationOrder;

    if (e.key === "Tab") {
      e.preventDefault();
      focusNext(id, iterationOrder, false);
    }
  };

  // Make selection direction change if the same cell is clicked twice
  const handleClick = (currentCellId, isCurrentlySelected) => {
    if (isCurrentlySelected) {
      dispatch(setIsVerticalSelection(!isVerticalSelection));
    } else {
      dispatch(setSelectedCell(currentCellId));
    }
  };

  // This is used when letter is rendered and checking mode is active to determine
  // if the user's input is a correct answer and determine the input tag class
  // accordingly to change the color of the letter
  const isCorrectLetter = userLetter === correctAnswer;

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
