import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TimeState {
  time: {
    minutes: number;
    seconds: number;
  };
}

const initialState: TimeState = {
  time: {
    minutes: 0,
    seconds: 0,
  },
};

const timeSlice = createSlice({
  name: "time",

  initialState,

  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      const seconds = action.payload % 60;
      const minutes = (action.payload - seconds) / 60;
      state.time = {
        minutes,
        seconds,
      };
    },
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
