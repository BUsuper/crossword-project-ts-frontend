import type { JSX } from "react";
import "./CrosswordCell.scss";
import {
  useCrosswordCell,
  type UseCrosswordCellReturns,
} from "./useCrosswordCell";

type CrosswordCellProps = {
  x: number;
  y: number;
  correctAnswer: string;
  number: string;
  direction: string;
  isInSelectionList: boolean;
};

export function CrosswordCell({
  x,
  y,
  correctAnswer,
  number,
  direction,
  isInSelectionList,
}: CrosswordCellProps): JSX.Element {
  const {
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
  }: UseCrosswordCellReturns = useCrosswordCell(y, x, correctAnswer);

  return (
    <div
      id={`CrosswordCell${y},${x}`}
      className={
        "CrosswordCell" + " " + `${isInSelectionList ? "inSelectedList" : ""}`
      }
    >
      <div className="upperRow">
        <span className="numberContainter">{number}</span>
        <span className="rightArrowContainer">
          {direction === "right" ? "→" : ""}
        </span>
      </div>
      <div className="bottomRow">
        <span className="downArrowContainer">
          {direction === "down" ? "↓" : ""}
        </span>
        <input
          type="text"
          id={inputId}
          className={
            "letterContainer" +
            " " +
            `${
              isChecking && (isCorrectLetter ? "correctLetter" : "wrongLetter")
            }` +
            " " +
            `${isInSelectionList ? "inSelectedList" : ""}`
          }
          maxLength={1}
          onChange={(e) => handleInputChange(e, inputId)}
          onKeyUp={(e) => handleKeyUp(e, inputId)}
          onKeyDown={(e) => handleKeyDown(e, inputId)}
          onClick={() => handleClick(inputId, isCurrentlySelected)}
          disabled={isChecking}
          autoComplete="off"
          value={isShowingAnswers ? correctAnswer.toUpperCase() : userLetter}
        ></input>
      </div>
    </div>
  );
}
