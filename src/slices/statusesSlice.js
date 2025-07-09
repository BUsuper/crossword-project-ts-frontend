import { createSlice } from "@reduxjs/toolkit";

const statusesSlice = createSlice({
  name: "statuses",

  initialState: {
    isChecking: false,
    isFinished: false,
    hasErrors: false,
    isEndgameModalOpen: false,
    time: {},
  },

  reducers: {
    setIsChecking: (state, action) => {
      state.isChecking = action.payload;
    },

    setIsFinished: (state, action) => {
      state.isFinished = action.payload;
    },

    setHasErrors: (state, action) => {
      state.hasErrors = action.payload;
    },

    setIsEndgameModalOpen: (state, action) => {
      state.isEndgameModalOpen = action.payload;
    },

    setIsShowingAnswers: (state, action) => {
      state.isShowingAnswers = action.payload;
    },

    setTime: (state, action) => {
      const seconds = action.payload % 60;
      const minutes = (action.payload - seconds) / 60;
      state.time = {
        minutes,
        seconds,
      };
    },
  },
});

export const {
  setIsChecking,
  setIsFinished,
  setHasErrors,
  setIsEndgameModalOpen,
  setIsShowingAnswers,
  setTime,
} = statusesSlice.actions;

export default statusesSlice.reducer;
