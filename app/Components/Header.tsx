"use client";
import styles from "./Header.module.css";
import NavBar from "./NavBar";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.id}>
        <span>21519232</span>
      </div>
      <div className={styles.title}>
        <h1>Moodle</h1>
      </div>
      <hr></hr>
      <div className={styles.below}>
        <NavBar />
        <ThemeToggle />
      </div>
      <hr></hr>
    </header>
  );
}
