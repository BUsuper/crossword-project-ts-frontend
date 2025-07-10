import "./QuestionsBlock.css";
import type { JSX } from "react";
import type {
  CrosswordField,
  CrosswordRow,
  CrosswordCellType,
  EmptyCell,
} from "../../assets/crosswords";
import { useAppSelector } from "../../store/hooks";
import { selectCrossword } from "../../slices/crosswordSelectors";

type QuestionsBlockProps = {
  direction: string;
};

export function QuestionsBlock({
  direction,
}: QuestionsBlockProps): JSX.Element {
  const crossword: CrosswordField = useAppSelector(selectCrossword);

  return (
    <div>
      <h1 className="directionHeader">
        {direction === "right" ? "Across" : "Down"}
      </h1>
      <div>
        {crossword.map((row: CrosswordRow) =>
          row.map((cell: CrosswordCellType | EmptyCell) => {
            if (cell[0] && cell[1] === direction) {
              return (
                <p
                  key={`${cell[2]}${cell[1]}`}
                  className="question"
                >{`${cell[2]}) ${cell[0]}`}</p>
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
}
