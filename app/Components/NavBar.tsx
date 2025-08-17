"use client";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/*Left side links*/}
        <ul className={styles.leftLinks}>
          <li>
            <Link href="/tabs">Tabs</Link>
          </li>
          <li>
            <Link href="/pre-labs-questions">Pre-labs Questions</Link>
          </li>
          <li>
            <Link href="/escape-room">Escape Room</Link>
          </li>
          <li>
            <Link href="coding-races">Coding Races</Link>
          </li>
        </ul>

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
