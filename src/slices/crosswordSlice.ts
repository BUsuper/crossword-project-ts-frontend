import { createSlice } from "@reduxjs/toolkit";
import type { CrosswordFieldType } from "../assets/crosswords";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IterationOrder } from "../utils/utils";
import { createIterationOrder } from "../utils/utils";

type CrosswordState = {
  crossword: CrosswordFieldType | null;
  verticalIterationOrder: IterationOrder | null;
  horizontalIterationOrder: IterationOrder | null;
};

const initialState: CrosswordState = {
  crossword: null,

  verticalIterationOrder: null,

  horizontalIterationOrder: null,
};

const crosswordSlice = createSlice({
  name: "crossword",

  initialState,

  reducers: {
    setCrossword: (
      state: CrosswordState,
      action: PayloadAction<CrosswordFieldType>
    ) => {
      state.crossword = action.payload;
    },

    setVerticalIterationOrder: (
      state: CrosswordState,
      action: PayloadAction<CrosswordFieldType>
    ) => {
      state.verticalIterationOrder = createIterationOrder(
        action.payload,
        Object.keys(action.payload[0]).length,
        Object.keys(action.payload).length,
        "down"
      );
    },

    setHorizontalIterationOrder: (
      state: CrosswordState,
      action: PayloadAction<CrosswordFieldType>
    ) => {
      state.horizontalIterationOrder = createIterationOrder(
        action.payload,
        Object.keys(action.payload[0]).length,
        Object.keys(action.payload).length,
        "right"
      );
    },
  },
});

export const {
  setCrossword,
  setVerticalIterationOrder,
  setHorizontalIterationOrder,
} = crosswordSlice.actions;

export default crosswordSlice.reducer;
