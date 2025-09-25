import { useState } from "react";
type TimerProps = {
  initialSeconds: number;
  onTimeUp: () => void;
};
export default function Timer({ initialSeconds, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  return (
    <div>
      <button>Start</button>
      <button></button>
    </div>
  );
}
