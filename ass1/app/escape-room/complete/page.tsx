"use client";
import { resetGame } from "@/app/store/gameSlice";
import { resetTimer } from "@/app/store/timerSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
export default function Complete() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { state } = useSelector((state: any) => state.timer);

  return (
    <div className={styles.container}>
      <h1>Congratulations! You have escaped the room!!</h1>
      <Image
        src="/congrats.jpg"
        width={500}
        height={500}
        alt="Congrats meme."
      ></Image>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => {
            router.push("/escape-room"),
              dispatch(resetTimer()),
              dispatch(resetGame());
          }}
        >
          Restart the game
        </button>
        <button onClick={() => router.push("/")}>Home</button>
      </div>
    </div>
  );
}
