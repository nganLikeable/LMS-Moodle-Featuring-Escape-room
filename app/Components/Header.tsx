"use client";
import styles from "./Header.module.css";
import NavBar from "./NavBar";
export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <ul>
          <li>21519232</li>
          <li>Moodle</li>
        </ul>
      </div>
      <div className={styles.nav}>
        <NavBar />
      </div>
    </header>
  );
}
