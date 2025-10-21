"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { solveLevel } from "../store/gameSlice";
import { RootState } from "../store/store";
import DeleteUserButton from "./DeleteAccountButton";
import styles from "./Level.module.css";
import { LevelConfig, levelsConfig } from "./LevelsConfig";
import LogOutButton from "./LogOutButton";
import TimerDisplay from "./TimerDisplay";
interface LevelProps {
  config: LevelConfig;
}

export default function Level({ config }: LevelProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");

  // local component state
  const [puzzleText, setPuzzleText] = useState("Loading puzzle data...");
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  // global redux state
  // check if current lvl is solved
  const isSolved = useSelector(
    (state: RootState) => state.game.levels[config.id]?.solved || false
  );
  // get total lvls for routing checks
  const totalLevels = levelsConfig.length;

  // get game Id
  const gameId = useSelector((state: RootState) => state.game.gameId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    if (isSolved) return;

    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === config.ans.toLowerCase()) {
      dispatch(solveLevel({ levelId: config.id, ans: trimmedInput }));
      setFeedback("Correct Answer!");

      try {
        // PATCH to update level
        const response = await fetch(
          "http://localhost:3001/api/session/update",
          {
            method: "PATCH",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameId, currentLevel: config.id }),
          }
        );
        console.log("Response received:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Level updated", data);
        } else {
          const errorData = await response.json();
          setError(
            errorData.error || "Level failed to update. Please try again."
          );
          console.log(error);
        }
      } catch (e: any) {
        setError("Unexpected error occurred. Please try again.");
        console.error(e);
      }
    } else {
      setInput(""); // clear wrong ans
      setFeedback("Incorrect Answer!! Please try again....");
    }
  }

  // routing logic
  const handleAdvance = useCallback(async () => {
    const nextId = config.id + 1;
    if (nextId <= totalLevels) {
      router.push(`/escape-room/${nextId}`);
    } else {
      try {
        const response = await fetch(
          "http://localhost:3001/api/session/finish",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameId }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to finish game.");
          return;
        }

        const data = await response.json();
        console.log("Game finished:", data);
      } catch (err) {
        console.error("Finish error:", err);
        setError("Unexpected error while finishing the game.");
      }

      router.push("/escape-room/complete");
    }
  }, [router, config.id, totalLevels]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.topItem}>
          <TimerDisplay />
        </div>{" "}
        <div className={styles.topItem}>
          <LogOutButton />
        </div>
        <div className={styles.topItem}>
          <DeleteUserButton />
        </div>
      </div>
      <div className={styles.narrative}>
        <h1>Chapter {config.id}</h1>
        <p>{config.narrative}</p>
        {config.puzzleFile !== "" && (
          <p>
            Puzzle resource:
            <a
              href={config.puzzleFile}
              target="_blank"
              rel="noopener noreferrer"
            >
              puzzle input
            </a>
          </p>
        )}
      </div>
      {isSolved ? (
        // render next page button if solved
        <div className={styles.nextLevel}>
          <button onClick={handleAdvance}>
            {config.id < totalLevels
              ? `Advance to chapter ${config.id + 1}`
              : "Finish game"}
          </button>
        </div>
      ) : (
        // unsolved form
        <div className={styles.form}>
          {/* {feedback && ( */}
          <p className={styles.feedback} data-testid="feedback">
            {feedback}
          </p>
          {/* )} */}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your answer here..."
              required
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
