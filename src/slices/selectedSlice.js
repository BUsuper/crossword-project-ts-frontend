import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
  name: "selected",

  initialState: {
    isVerticalSelection: false,
    selectedCell: "",
    selectedCrossword: "",
  },

  reducers: {
    setIsVerticalSelection: (state, action) => {
      state.isVerticalSelection = action.payload;
    },

    setSelectedCell: (state, action) => {
      state.selectedCell = action.payload;
    },

    setSelectedCrossword: (state, action) => {
      state.selectedCrossword = action.payload;
    },
  },
});

export const { setIsVerticalSelection, setSelectedCell, setSelectedCrossword } =
  selectedSlice.actions;

export default selectedSlice.reducer;
