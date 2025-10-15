"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { solveLevel } from "../store/gameSlice";
import { RootState } from "../store/store";
import styles from "./Level.module.css";
import { LevelConfig, levelsConfig } from "./LevelsConfig";
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

  const handleSubmit = (e: React.FormEvent) => {
    if (isSolved) return;

    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === config.ans.toLowerCase()) {
      dispatch(solveLevel({ levelId: config.id, ans: trimmedInput }));
      setFeedback("Correct Answer!");
    } else {
      setFeedback("Incorrect Answer!! Please try again....");
    }
  };

  // routing logic
  const handleAdvance = useCallback(() => {
    const nextId = config.id + 1;
    if (nextId <= totalLevels) {
      router.push(`/escape-room/${nextId}`);
    } else {
      router.push("/escape-room/complete");
    }
  }, [router, config.id, totalLevels]);

  async function handleSubmit1(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const formData = new FormData(event.currentTarget);
  }

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <TimerDisplay />
      </div>
      <div className={styles.narrative}>
        <h1>Chapter {config.id}</h1>
        <p>{config.narrative}</p>
        <p>
          Puzzle resource:
          <a href={config.puzzleFile} target="_blank" rel="noopener noreferrer">
            puzzle input
          </a>{" "}
        </p>
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
      )}{" "}
    </div>
  );
}
