"use client";
import Level from "@/app/Components/Level";
import { levelsConfig } from "@/app/Components/LevelsConfig";
import TimerDisplay from "@/app/Components/TimerDisplay";
import TimerEngine from "@/app/Components/TimerEngine";
import TimerModal from "@/app/Components/TimerModal";
import { openTimerModal } from "@/app/store/timerSlice";
import { typeOnScreen } from "@/app/utils/typeOnScreen";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Typewriter from "typewriter-effect";
import styles from "./page.module.css";

function Intro() {
  const intro = [
    "Ngan, our noob programmer, vanished 48 hours ago. Her final communication was a cryptic message pointing to her last project—a top-secret, five-stage code sequence.",
    "Your mission is to infiltrate her digital environment. You must debug, decode, and compile five fragmented pieces of code to trace her steps and discover her fate.",
    "The clock is running. Every second counts. Do not fail.",
  ];
  // const intro = ["placeholder"];
  const dispatch = useDispatch();
  const router = useRouter(); // navigate
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
    dispatch(openTimerModal());
  }, []);

  return (
    <div className={styles.introContainer}>
      <div className={styles.note}>
        <h1>The Case of the Missing Programmer</h1>
        <Typewriter
          onInit={(typewriter) =>
            typeOnScreen(typewriter, intro, handleTypingComplete)
          }
          options={{ delay: 10 }}
        />
        {isTypingComplete && <TimerModal />}
      </div>
    </div>
  );
}
export default function EscapeRoomStage() {
  const router = useRouter();
  const params = useParams(); // show content based on url
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // handle single and optional empty routes
  const config = levelsConfig.find((lvl) => lvl.id === Number(id));
  console.log("id:", id); // debug
  console.log("config:", config); // debug

  return (
    <>
      {!id ? (
        <Intro />
      ) : config ? (
        <div>
          <Level config={config} />
        </div>
      ) : (
        <div>
          <TimerEngine />
          <TimerDisplay />
          <h1>Error 404: Level Not Found</h1>
          <button onClick={() => router.push("/escape-room")}>
            Go to Home page
          </button>
        </div>
      )}
    </>
  );
}
