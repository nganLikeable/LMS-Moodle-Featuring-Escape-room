"use client";
import { useTimer } from "@/hooks/useTimer";
import { useSelector } from "react-redux";
import styles from "./TimerDisplay.module.css";
export default function TimerDisplay() {
  const { timeLeft, showTimer } = useSelector((state: any) => state.timer);

  console.log({ showTimer });
  if (!showTimer) return null;
  const { minutes, seconds } = useTimer();

  //   const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  //   const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={styles.container}>
      {minutes}:{seconds}
    </div>
  );
}
