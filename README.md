# Igor's Crossword Project

### A single-page web-application built using TypeScript, React, and Redux Toolkit

Solve at: https://busuper.github.io/crossword-project-ts-frontend/

This is a crossword puzzle game. You can select of of the available puzzles and then try and solve it.
When you click on a cell you activate selection. The text cursor jumps automatically to the next letter in the selected word or to the next question. Naturally, if you've finished answering the "down" question, the text cursor correctly jumps to the cell either below it or, if it's finished, to the word that is the answer to the next "down" question. Backspace deletes the current letter and makes the text cursor jump one cell back. Tab makes the text cursor jump to the next cell.
