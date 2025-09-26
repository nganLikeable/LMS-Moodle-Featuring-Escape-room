import styles from "./layout.module.css";

export default function EscapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.escapeRoomContainer}>{children}</div>;
}
