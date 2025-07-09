import "./QuestionsBlock.css";
import { useSelector } from "react-redux";
import { selectCrossword } from "../../slices/crosswordSelectors";

export function QuestionsBlock({ direction }) {
  const crossword = useSelector(selectCrossword);

  return (
    <div>
      <h1 className="directionHeader">
        {direction === "right" ? "Across" : "Down"}
      </h1>
      <div>
        {crossword.map((row) =>
          row.map((cell) => {
            if (cell[0] && cell[1] === direction) {
              return (
                <p
                  key={`${cell[2]}${cell[1]}`}
                  className="question"
                >{`${cell[2]}) ${cell[0]}`}</p>
              );
            }
          })
        )}
      </div>
    </div>
  );
}
