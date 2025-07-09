import "./CrosswordField.css";
import { CrosswordCell } from "../../components";
import useCrosswordField from "./useCrosswordField";

export function CrosswordField() {
  const { crossword, currentWord } = useCrosswordField();

  // Crossword cells are only rendered in non-empty table cells
  return (
    <div id="CrosswordField">
      <table>
        <tbody>
          {crossword.map((row, rowNumber) => (
            <tr key={`row${rowNumber}`}>
              {row.map((column, columnNumber) => (
                <td
                  key={`x${columnNumber}y${rowNumber}`}
                  className={
                    !crossword[rowNumber][columnNumber] ? "emptyCell" : ""
                  }
                >
                  {crossword[rowNumber][columnNumber] ? (
                    <CrosswordCell
                      x={columnNumber}
                      y={rowNumber}
                      direction={crossword[rowNumber][columnNumber][1]}
                      number={crossword[rowNumber][columnNumber][2]}
                      correctAnswer={crossword[rowNumber][columnNumber][3]}
                      isInSelectionList={currentWord.includes(
                        `${rowNumber},${columnNumber}`
                      )}
                    ></CrosswordCell>
                  ) : (
                    ""
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
