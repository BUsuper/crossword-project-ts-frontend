import { configureStore } from "@reduxjs/toolkit";
import statucesReducer from "../slices/statusesSlice";
import timeReducer from "../slices/timeSlice";
import selectedReducer from "../slices/selectedSlice";
import crosswordReducer from "../slices/crosswordSlice";

export const store = configureStore({
  reducer: {
    statuses: statucesReducer,
    selected: selectedReducer,
    crossword: crosswordReducer,
    time: timeReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
