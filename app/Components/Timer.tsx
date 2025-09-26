import { useEffect, useState } from "react";
type TimerProps = {
  onTimeUp: () => void;
};

export default function Timer({ onTimeUp }: TimerProps) {
  const [customMinutes, setCustomMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(customMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      onTimeUp();
      return;
    }

    // set time left every 1s (1000ms)
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  // keep time left in sync in sec
  useEffect(() => {
    setTimeLeft(customMinutes * 60);
  }, [customMinutes]);

  // format time
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div>
      <h3>
        Timer: {minutes}:{seconds}
      </h3>
      <input
        type="number"
        value={customMinutes}
        onChange={(e) => setCustomMinutes(Number(e.target.value))}
        disabled={isRunning}
      ></input>
      <span>minutes</span>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button
        onClick={() => {
          setIsRunning(false);
          setTimeLeft(customMinutes * 60); // convert m => s
        }}
      >
        Reset
      </button>
    </div>
  );
}
