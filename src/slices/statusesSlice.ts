import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StatusesState {
  isChecking: boolean;
  isFinished: boolean;
  hasErrors: boolean;
  isEndgameModalOpen: boolean;
  isShowingAnswers: boolean;
}

const initialState: StatusesState = {
  isChecking: false,
  isFinished: false,
  hasErrors: false,
  isEndgameModalOpen: false,
  isShowingAnswers: false,
};

const statusesSlice = createSlice({
  name: "statuses",

  initialState,

  reducers: {
    setIsChecking: (state, action: PayloadAction<boolean>) => {
      state.isChecking = action.payload;
    },

    setIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },

    setHasErrors: (state, action: PayloadAction<boolean>) => {
      state.hasErrors = action.payload;
    },

    setIsEndgameModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEndgameModalOpen = action.payload;
    },

    setIsShowingAnswers: (state, action: PayloadAction<boolean>) => {
      state.isShowingAnswers = action.payload;
    },
  },
});

export const {
  setIsChecking,
  setIsFinished,
  setHasErrors,
  setIsEndgameModalOpen,
  setIsShowingAnswers,
} = statusesSlice.actions;

export default statusesSlice.reducer;
