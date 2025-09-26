import { TimerProvider } from "@/context/TimerContext";
import { ReactNode } from "react";
import styles from "./layout.module.css";

export default function EscapeRoomLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TimerProvider>
      <div className={styles.escapeRoomContainer}>{children}</div>
    </TimerProvider>
  );
}
