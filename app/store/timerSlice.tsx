import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  customMinutes: number;
}

const initialState: TimerState = {
  timeLeft: 5 * 60, // 5m
  isRunning: false,
  customMinutes: 5,
};

// generate actions that can be dispatched to trigger updates
export const timerSlice = createSlice({
  name: "timer",
  initialState,
  // calculates a new state based on an action
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    decrementTime: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    setCustomMinutes: (state, action: PayloadAction<number>) => {
      state.customMinutes = action.payload;
      state.timeLeft = action.payload * 60;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.customMinutes * 60;
    },
  },
});

// export generated action creators for use in components
export const {
  startTimer,
  decrementTime,
  setCustomMinutes,
  resetTimer,
  pauseTimer,
} = timerSlice.actions;

// export slice reducer for use inn store config
export default timerSlice.reducer;
