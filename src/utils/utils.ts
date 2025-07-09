import type { CrosswordField } from "../assets/crosswords";

/* Vertical selection: Check each column. If a column has a down arrow - check each cell below.
When an arrow is found, put the cell in the list, move to the next cell (below).
If a cell doesn't have an arrow, but is active and placed concecutively after the one with an arrow,
it belongs to the list.
If an inactive cell is encountered, it's not included the search for an arrow starts again.
If an active cell is encountered, but there is no down arrow, it's not a part of a word placed
vertically, so it doesn't belong to the list.
When we run out of elements in the column, move right to the next column 
The algorithm is the same for horizontal selection, the only change is direction */
export type IterationOrder = [number, number][];

export function createIterationOrder(
  crossword: CrosswordField,
  numberOfColumns: number,
  numberOfRows: number,
  direction: "down" | "right"
): IterationOrder {
  /* The direction determines whether we iterate over columns or rows (first dimension)
    iteration inside a column/row is in the second dimension */
  const firstDimensionLength: number =
    direction === "down" ? numberOfColumns : numberOfRows;
  const secondDimentionLength: number =
    direction === "down" ? numberOfRows : numberOfColumns;

  const iterationOrder: IterationOrder = [];

  for (let i: number = 0; i < firstDimensionLength; i++) {
    let isArrowFound: boolean = false;

    for (let j: number = 0; j < secondDimentionLength; j++) {
      // If we first iterate over columns, then the first iteration variable is a column index
      const column: number = direction === "down" ? i : j;
      const row: number = direction === "down" ? j : i;

      if (isArrowFound) {
        if (crossword[row][column]?.[1] === direction) {
          iterationOrder.push([row, column]);
          continue;
        } else {
          if (crossword[row][column]) {
            iterationOrder.push([row, column]);
            continue;
          } else {
            isArrowFound = false;
            continue;
          }
        }
      } else {
        if (crossword[row][column]?.[1] === direction) {
          iterationOrder.push([row, column]);
          isArrowFound = true;
          continue;
        }
      }
    }
  }

  return iterationOrder;
}

export function selectCurrentWord(
  cellsArr,
  isVerticalSelection,
  selectedCellY,
  selectedCellX
) {
  const currentWord = [];
  const consecutiveCoordinateIndex = isVerticalSelection ? 0 : 1;
  let isSelectedCellFound = false;

  let i = 0;
  while (i < cellsArr.length) {
    const currentCellId = shortenId(cellsArr[i]);
    const currentIsSelected =
      currentCellId[0] === +selectedCellY &&
      currentCellId[1] === +selectedCellX;

    // If the word isn't empty, check if the cell is consecutive
    if (currentWord.length > 0) {
      if (
        currentWord.at(-1)[consecutiveCoordinateIndex] ===
        currentCellId[consecutiveCoordinateIndex] - 1
      ) {
        // If consecutive, check if it's current cell
        if (currentIsSelected) {
          // If it's current, trigger the found flag and push it, then move on
          isSelectedCellFound = true;
          currentWord.push(currentCellId);
          i++;
          continue;
        } else {
          // If it's not current, it's still consecutive, just push it
          currentWord.push(currentCellId);
          i++;
          continue;
        }
        // If the cell is not consecutive
      } else {
        // Check if it's current
        if (currentIsSelected) {
          // If it's current, we start a new word (empty the array, trigger the found flag)
          currentWord.splice(0, currentWord.length);
          isSelectedCellFound = true;
          currentWord.push(currentCellId);
          i++;
          continue;
          // If it's not current
        } else {
          // Check if current cell is found
          if (isSelectedCellFound) {
            // If the selected cell is found, we've reached the end of the word before
            return currentWord;
          } else {
            // Not consecutive, not current word, so
            // Delete everything from the array and move on
            currentWord.splice(0, currentWord.length);
            currentWord.push(currentCellId);
            i++;
            continue;
          }
        }
      }
    } else {
      // If it's the first letter that goes into the word you can't check if it's consecutive
      // But you still need to check if it's current
      if (currentIsSelected) {
        isSelectedCellFound = true;
      }
      currentWord.push(currentCellId);
      i++;
    }
  }
  return currentWord;
}

function shortenId(cellId) {
  return cellId
    .slice(13)
    .split(",")
    .map((coordinate) => +coordinate);
}

export function filterDirection(
  cellId,
  isVerticalSelection,
  selectedCellY,
  selectedCellX
) {
  const shortenedId = shortenId(cellId);

  if (isVerticalSelection) {
    return shortenedId[1] === +selectedCellX;
  }
  return shortenedId[0] === +selectedCellY;
}
