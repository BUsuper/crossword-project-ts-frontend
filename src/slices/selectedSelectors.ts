import type { RootState } from "../store/store";

export const selectIsVerticalSelection = (state: RootState) =>
  state.selected.isVerticalSelection;
export const selectSelectedCell = (state: RootState) =>
  state.selected.selectedCell;
