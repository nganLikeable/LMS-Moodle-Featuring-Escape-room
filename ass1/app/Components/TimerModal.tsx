"use client";
import { getCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameId } from "../store/gameSlice";
import {
  closeTimerModal,
  resetTimer,
  setCustomMinutes,
  startTimer,
} from "../store/timerSlice";
import styles from "./TimerModal.module.css";

export default function TimerModal() {
  const dispatch = useDispatch();
  const { customMinutes, showModal } = useSelector((state: any) => state.timer);
  console.log({ showModal });
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleStart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setError("");
    console.log("button clicked");

    const userId = getCookie("userId");
    console.log("userId from cookie:", userId);

    try {
      const response = await fetch("http://localhost:3001/api/session/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      console.log("Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Session started", data);
        return data.game;
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || "Session failed to start. Please try again"
        );
        console.log(error);
        return null;
      }
    } catch (e: any) {
      setError("Unexpected error occurred. Please try again.");
      console.error(e);
    }
  }

  if (!showModal) return null;
  return (
    <div className={styles.container}>
      <h3>Set your timer</h3>
      <div className={styles.inputRow}>
        <input
          type="number"
          value={customMinutes}
          onChange={(e) => dispatch(setCustomMinutes(Number(e.target.value)))}
        ></input>
        <span>minutes</span>
      </div>
      <button
        onClick={async (e) => {
          const game = await handleStart(e);
          if (!game) return null;
          dispatch(setGameId(game.id));
          dispatch(resetTimer());
          dispatch(startTimer());
          dispatch(closeTimerModal());
          // dispatch(resetGame());

          router.push("./escape-room/1");
        }}
      >
        Start
      </button>
    </div>
  );
}
