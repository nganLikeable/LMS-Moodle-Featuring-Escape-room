"use client";
import { decrementTime, pauseTimer } from "@/app/store/timerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useTimer(onTimeUp?: () => void) {
  const dispatch = useDispatch();
  const { timeLeft, isRunning, customMinutes } = useSelector(
    (state: any) => state.timer
  );

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      dispatch(pauseTimer());
      if (onTimeUp) onTimeUp();
      return;
    }

    // set time left every 1s (1000ms)
    const interval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, dispatch, onTimeUp]);

  // format time
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return { timeLeft, isRunning, customMinutes, minutes, seconds };
}
