import "./CrosswordField.css";
import { CrosswordCell } from "..";
import type { CrosswordCellType } from "../../assets/crosswords";
import useCrosswordField from "./useCrosswordField";
import type { CrosswordField, CrosswordRow } from "../../assets/crosswords";
import type { JSX } from "react";

export function CrosswordField(): JSX.Element {
  const {
    crossword,
    currentWord,
  }: { crossword: CrosswordField; currentWord: string[] } = useCrosswordField();

  // Crossword cells are only rendered in non-empty table cells
  return (
    <div id="CrosswordField">
      <table>
        <tbody>
          {crossword.map((row: CrosswordRow, rowNumber: number) => (
            <tr key={`row${rowNumber}`}>
              {row.map((cell: CrosswordCellType | "", columnNumber: number) => (
                <td
                  key={`x${columnNumber}y${rowNumber}`}
                  className={!cell ? "emptyCell" : ""}
                >
                  {cell && (
                    <CrosswordCell
                      x={columnNumber}
                      y={rowNumber}
                      direction={cell[1]}
                      number={cell[2]}
                      correctAnswer={cell[3]}
                      isInSelectionList={currentWord.includes(
                        `${rowNumber},${columnNumber}`
                      )}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
