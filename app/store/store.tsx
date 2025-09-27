import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});

// type safe
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
