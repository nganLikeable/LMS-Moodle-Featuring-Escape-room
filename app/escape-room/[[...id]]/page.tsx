"use client";
import Stage1 from "@/app/Components/Stage1";
import { typeOnScreen } from "@/app/utils/typeOnScreen";
import { useParams, useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";

import styles from "./page.module.css";

function Intro() {
  const intro = ["Prologue", "This is the narrative"];
  const router = useRouter(); // navigate

  return (
    <div className={styles.introContainer}>
      <div className={styles.note}>
        <h1>The Case of the Missing Programmer</h1>
        <Typewriter
          onInit={(typewriter) => typeOnScreen(typewriter, intro)}
          options={{ delay: 50 }}
        />
        <button onClick={() => router.push("/escape-room/1")}>Start</button>
      </div>
    </div>
  );
}
export default function EscapeRoomStage() {
  const params = useParams(); // show content based on url
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // handle single and optional empty routes

  const intro = ["Prologue", "This is the narrative"];

  // if no id => optional page
  if (!id) {
    return Intro();
  }
  switch (id) {
    case "1":
      return <Stage1 />;
  }

  return <div>Stage not found</div>;
}
