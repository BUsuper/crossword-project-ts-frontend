import type { RootState } from "../store/store";

export const selectCrossword = (state: RootState) => state.crossword.crossword;
export const selectVerticalIterationOrder = (state: RootState) =>
  state.crossword.verticalIterationOrder;
export const selectHorizontalIterationOrder = (state: RootState) =>
  state.crossword.horizontalIterationOrder;
