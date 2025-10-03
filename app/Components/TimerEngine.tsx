// container component - decrement time
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementTime } from "../store/timerSlice";

export default function TimerEngine() {
  const dispatch = useDispatch();
  const { isRunning } = useSelector((state: any) => state.timer.isRunning);

  useEffect(() => {
    if (!isRunning) return;

    // set time left every 1s (1000ms)
    const interval = setInterval(() => dispatch(decrementTime()), 1000);

    return () => clearInterval(interval); // clean up when timer stops or component unmounts
  }, [isRunning, dispatch]); // dependency array, re-run the effect whenever either of the elements changes

  return null;
}
