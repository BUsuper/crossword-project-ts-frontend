import type { RootState } from "../store/store";

export const selectTime = (state: RootState) => state.time.time;
