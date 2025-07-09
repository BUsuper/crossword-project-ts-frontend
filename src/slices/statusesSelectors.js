export const selectIsChecking = (state) => state.statuses.isChecking;
export const selectIsFinished = (state) => state.statuses.isFinished;
export const selectHasErrors = (state) => state.statuses.hasErrors;
export const selectIsEndgameModalOpen = (state) =>
  state.statuses.isEndgameModalOpen;
export const selectIsShowingAnswers = (state) =>
  state.statuses.isShowingAnswers;
export const selectTime = (state) => state.statuses.time;
