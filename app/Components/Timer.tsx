import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  decrementTime,
  pauseTimer,
  resetTimer,
  setCustomMinutes,
  startTimer,
} from "../store/timerSlice";

type TimerProps = {
  onTimeUp: () => void;
};

export default function Timer({ onTimeUp }: TimerProps) {
  const dispatch = useDispatch();
  const { timeLeft, isRunning, customMinutes } = useSelector(
    (state: any) => state.timer
  );

  // const [customMinutes, setCustomMinutes] = useState(5);
  // const [timeLeft, setTimeLeft] = useState(customMinutes * 60);
  // const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      dispatch(pauseTimer());
      onTimeUp();
      return;
    }

    // set time left every 1s (1000ms)
    const interval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, dispatch, onTimeUp]);

  // // keep time left in sync in sec
  // useEffect(() => {
  //   setTimeLeft(customMinutes * 60);
  // }, [customMinutes]);

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
        onChange={(e) => dispatch(setCustomMinutes(Number(e.target.value)))}
        disabled={isRunning}
      ></input>
      <span>minutes</span>
      <button onClick={() => dispatch(startTimer())}>Start</button>
      <button onClick={() => dispatch(pauseTimer())}>Pause</button>
      <button onClick={() => dispatch(resetTimer())}>Reset</button>
    </div>
  );
}
