import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  customMinutes: number;
  showModal: boolean;
  showTimer: boolean;
}

const initialState: TimerState = {
  timeLeft: 5 * 60, // 5m
  isRunning: false,
  customMinutes: 5,
  showModal: false,
  showTimer: false,
};

// generate actions that can be dispatched to trigger updates
export const timerSlice = createSlice({
  name: "timer",
  initialState,
  // calculates a new state based on an action
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
      state.showModal = false;
      state.showTimer = true;
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
      state.showTimer = false;
    },
    openTimerModal: (state) => {
      state.showModal = true;
    },
    closeTimerModal: (state) => {
      state.showModal = false;
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
  openTimerModal,
  closeTimerModal,
} = timerSlice.actions;

// export slice reducer for use inn store config
export default timerSlice.reducer;
