import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SelectedState {
  isVerticalSelection: boolean;
  selectedCell: string;
}

const initialState: SelectedState = {
  isVerticalSelection: false,
  selectedCell: "",
};

const selectedSlice = createSlice({
  name: "selected",

  initialState,

  reducers: {
    setIsVerticalSelection: (state, action: PayloadAction<boolean>) => {
      state.isVerticalSelection = action.payload;
    },

    setSelectedCell: (state, action: PayloadAction<string>) => {
      state.selectedCell = action.payload;
    },
  },
});

export const { setIsVerticalSelection, setSelectedCell } =
  selectedSlice.actions;

export default selectedSlice.reducer;
