"use client";
import Level from "@/app/Components/Level";
import { levelsConfig } from "@/app/Components/LevelsConfig";
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
  const router = useRouter();
  const params = useParams(); // show content based on url
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // handle single and optional empty routes
  const config = levelsConfig.find((lvl) => lvl.id === Number(id));
  console.log("id:", id); // debug
  console.log("config:", config); // debug

  // show intro if no id
  if (!id) {
    return <Intro />;
  }

  // show level if found
  else if (config) {
    return <Level config={config} />;

    // show error if level not found
  } else {
    return (
      <div>
        <div>
          <h1>Error 404: Level Not Found</h1>
          <p>The escape room stage specified in the URL does not exist.</p>
          <button onClick={() => router.push("/escape-room")}>
            Go to Home page
          </button>
        </div>
      </div>
    );
  }
}
