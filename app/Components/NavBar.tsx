"use client";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./NavBar.module.css";
export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <HamburgerMenu />
        <Link href="/about">About </Link>
        <Link href="/escape-room">Escape Room</Link>
        <Link href="/tab-generator">Tab Generator</Link>
      </div>
    </nav>
  );
}
