import type { RootState } from "../store/store";

export const selectIsChecking = (state: RootState) => state.statuses.isChecking;
export const selectIsFinished = (state: RootState) => state.statuses.isFinished;
export const selectHasErrors = (state: RootState) => state.statuses.hasErrors;
export const selectIsEndgameModalOpen = (state: RootState) =>
  state.statuses.isEndgameModalOpen;
export const selectIsShowingAnswers = (state: RootState) =>
  state.statuses.isShowingAnswers;
