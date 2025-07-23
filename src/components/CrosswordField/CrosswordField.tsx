import "./CrosswordField.scss";
import { CrosswordCell } from "..";
import useCrosswordField from "./useCrosswordField";
import type {
  CrosswordFieldType,
  CrosswordCellType,
  CrosswordRow,
} from "../../assets/crosswords";
import type { JSX } from "react";

export function CrosswordField(): JSX.Element {
  const {
    crossword,
    currentWord,
  }: { crossword: CrosswordFieldType | null; currentWord: string[] } =
    useCrosswordField();

  // Crossword cells are only rendered in non-empty table cells
  return (
    <div id="CrosswordField">
      <table>
        <tbody>
          {crossword
            ? crossword.map((row: CrosswordRow, rowNumber: number) => (
                <tr key={`row${rowNumber}`}>
                  {row.map(
                    (cell: CrosswordCellType | "", columnNumber: number) => (
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
                    )
                  )}
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
