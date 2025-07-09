import { configureStore } from "@reduxjs/toolkit";
import statucesReducer from "../slices/statusesSlice";
import selectedReducer from "../slices/selectedSlice";
import crosswordReducer from "../slices/crosswordSlice";

const store = configureStore({
  reducer: {
    statuses: statucesReducer,
    selected: selectedReducer,
    crossword: crosswordReducer,
  },
});

export default store;
