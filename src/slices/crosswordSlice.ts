import { createSlice } from "@reduxjs/toolkit";
import crosswords from "../assets/crosswords";
import type { CrosswordField } from "../assets/crosswords";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IterationOrder } from "../utils/utils";
import { createIterationOrder } from "../utils/utils";

type CrosswordState = {
  crossword: CrosswordField;
  verticalIterationOrder: IterationOrder;
  horizontalIterationOrder: IterationOrder;
};

const selectedCrossword = "30.05.2025";

const initialState: CrosswordState = {
  crossword: crosswords[selectedCrossword],

  verticalIterationOrder: createIterationOrder(
    crosswords[selectedCrossword],
    Object.keys(crosswords[selectedCrossword][0]).length,
    Object.keys(crosswords[selectedCrossword]).length,
    "down"
  ),

  horizontalIterationOrder: createIterationOrder(
    crosswords[selectedCrossword],
    Object.keys(crosswords[selectedCrossword][0]).length,
    Object.keys(crosswords[selectedCrossword]).length,
    "right"
  ),
};

const crosswordSlice = createSlice({
  name: "crossword",

  initialState,

  reducers: {
    setCrossword: (state, action: PayloadAction<string>) => {
      state.crossword = crosswords[action.payload];
    },

    setVerticalIterationOrder: (state, action) => {
      state.verticalIterationOrder = createIterationOrder(
        crosswords[action.payload],
        Object.keys(crosswords[action.payload][0]).length,
        Object.keys(crosswords[action.payload]).length,
        "down"
      );
    },

    setHorizontalIterationOrder: (state, action) => {
      state.horizontalIterationOrder = createIterationOrder(
        crosswords[action.payload],
        Object.keys(crosswords[action.payload][0]).length,
        Object.keys(crosswords[action.payload]).length,
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
