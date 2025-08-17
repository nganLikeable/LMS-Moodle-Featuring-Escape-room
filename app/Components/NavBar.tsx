"use client";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/*Left side tabs*/}
        <div className={styles.tabs}>
          <button onClick={() => {}}>Tabs</button>
          <button onClick={() => {}}>Pre-labs Questions</button>
          <button onClick={() => {}}>Escape Room</button>
          <button onClick={() => {}}>Coding Races</button>
        </div>

        {/*Right links*/}
        <ul className={styles.rightLinks}>
          <li>
            <Link href="/about">About</Link>
          </li>
          <HamburgerMenu />
        </ul>
      </div>
    </nav>
  );
}
