"use client";
import { useSessionCheck } from "@/hooks/useSessionCheck";
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

  const { gameId } = useSelector((state: any) => state.game);
  const { hasActiveSession, activeGame, isLoading } = useSessionCheck(
    showModal,
    gameId
  );

  async function handleResume() {
    const currentUserId = getCookie("userId");

    if (!currentUserId) {
      console.error("No current user ID found");
      setError("User session not found. Please log in again.");
      return;
    }

    if (!activeGame) {
      console.error("No active game to resume");
      setError("No active game found to resume");
      return;
    }

    // Double-check that the active game belongs to the current user
    if (activeGame.userId !== parseInt(currentUserId)) {
      console.error(
        "Active game user mismatch:",
        activeGame.userId,
        "vs",
        currentUserId
      );
      setError("Session mismatch. Please refresh and try again.");
      return;
    }

    console.log(
      "Resuming game for user:",
      currentUserId,
      "game:",
      activeGame.id
    );

    dispatch(setGameId(activeGame.id));
    // dispatch(setCustomMinutes(activeGame)) // resume from the time last saved
    dispatch(resetTimer());
    dispatch(startTimer());
    dispatch(closeTimerModal());

    // navigate to the curretn level of active game
    router.push(`./escape-room/${activeGame.currentLevel}`);
  }

  async function handleStart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setError("");
    console.log("button clicked");

    const userId = getCookie("userId");
    console.log("userId from cookie:", userId);

    const token = getCookie("token");
    if (!token) {
      setError("Authentication required. Please log in again.");
      return null;
    }

    try {
      const response = await fetch("http://ec2-174-129-49-28.compute-1.amazonaws.com:4080/api/session/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      {isLoading ? (
        <div>
          <h3>Checking for existing games...</h3>
          <div className={styles.loader}>Loading...</div>
        </div>
      ) : hasActiveSession && activeGame ? (
        <div>
          <h3>Game in Progress</h3>
          <p>You have an active game at Level {activeGame.currentLevel}</p>
          <p>Started: {new Date(activeGame.startTime).toLocaleString()}</p>

          <div className={styles.buttonGroup}>
            <button className={styles.resumeButton} onClick={handleResume}>
              Resume Game
            </button>
            <button
              className={styles.newGameButton}
              onClick={async (e) => {
                // This will create a new game (the API should handle ending the previous one)
                const game = await handleStart(e);
                if (!game) return;
                dispatch(setGameId(game.id));
                dispatch(resetTimer());
                dispatch(startTimer());
                dispatch(closeTimerModal());
                router.push("./escape-room/1");
              }}
            >
              Start New Game
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Set your timer</h3>
          <div className={styles.inputRow}>
            <input
              type="number"
              value={customMinutes}
              onChange={(e) =>
                dispatch(setCustomMinutes(Number(e.target.value)))
              }
            />
            <span>minutes</span>
          </div>
          <button
            onClick={async (e) => {
              const game = await handleStart(e);
              if (!game) return;
              dispatch(setGameId(game.id));
              dispatch(resetTimer());
              dispatch(startTimer());
              dispatch(closeTimerModal());
              router.push("./escape-room/1");
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
