"use client";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <HamburgerMenu />
        <a href="/about">About </a>
      </div>
    </nav>
  );
}
