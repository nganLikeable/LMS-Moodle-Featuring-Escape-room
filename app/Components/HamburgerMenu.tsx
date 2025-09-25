"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./HamburgerMenu.module.css";
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
      </div>
      <nav className={isOpen ? styles.menuOpen : styles.menu}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
