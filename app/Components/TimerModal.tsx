"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  closeTimerModal,
  setCustomMinutes,
  startTimer,
} from "../store/timerSlice";

export default function TimerModal() {
  const dispatch = useDispatch();
  const { customMinutes, showModal } = useSelector((state: any) => state.timer);
  if (!showModal) return null;
  return (
    <div>
      <h3>Set your timer</h3>
      <input
        type="number"
        value={customMinutes}
        onChange={(e) => dispatch(setCustomMinutes(Number(e.target.value)))}
      ></input>
      <span>minutes</span>
      <button
        onClick={() => {
          dispatch(startTimer());
          dispatch(closeTimerModal());
        }}
      >
        Start
      </button>
    </div>
  );
}
