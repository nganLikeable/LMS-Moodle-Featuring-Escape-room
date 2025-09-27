"use client";
import Stage1 from "@/app/Components/Stage1";
import { typeOnScreen } from "@/app/utils/typeOnScreen";
import { useParams, useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";

import styles from "./page.module.css";

function Intro() {
  const intro = [
    "Prologue",
    "Ngan, our noob programmer, vanished 48 hours ago. Her final communication was a cryptic message pointing to her last project—a top-secret, five-stage code sequence.",
    "Your mission is to infiltrate her digital environment. You must debug, decode, and compile five fragmented pieces of code to trace her steps and discover her fate.",
    "The clock is running. Every second counts. Do not fail.",
  ];
  const router = useRouter(); // navigate

  return (
    <div className={styles.introContainer}>
      <div className={styles.note}>
        <h1>The Case of the Missing Programmer</h1>
        <Typewriter
          onInit={(typewriter) => typeOnScreen(typewriter, intro)}
          options={{ delay: 10 }}
        />
        <button onClick={() => router.push("/escape-room/1")}>Start</button>
      </div>
    </div>
  );
}
export default function EscapeRoomStage() {
  const params = useParams(); // show content based on url
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // handle single and optional empty routes

  // if no id => optional page
  if (!id) {
    return Intro();
  }
  switch (id) {
    case "1":
      return <Stage1 />;
    // case "2":
    //   return <Stage2 />;
    // case "3":
    //   return <Stage3 />;
    // case "4":
    //   return <Stage4 />;
    // case "5":
    //   return <Stage5 />;
  }

  return <div>Stage not found</div>;
}
