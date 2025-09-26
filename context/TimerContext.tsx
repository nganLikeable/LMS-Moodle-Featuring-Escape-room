// /context/TimerContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type TimerContextType = {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  customMinutes: number;
  setCustomMinutes: React.Dispatch<React.SetStateAction<number>>;
};

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [customMinutes, setCustomMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(customMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("escapeRoomTimer");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCustomMinutes(parsed.customMinutes);
      setTimeLeft(parsed.timeLeft);
      setIsRunning(parsed.isRunning);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(
      "escapeRoomTimer",
      JSON.stringify({ customMinutes, timeLeft, isRunning })
    );
  }, [customMinutes, timeLeft, isRunning]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        isRunning,
        setIsRunning,
        customMinutes,
        setCustomMinutes,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimer must be used inside TimerProvider");
  return ctx;
}
