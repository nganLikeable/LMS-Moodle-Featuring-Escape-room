"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./HamburgerMenu.module.css";
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // close menu when clicked
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
      </div>
      <nav className={isOpen ? styles.menuOpen : styles.menu}>
        <ul className={styles.links}>
          <li>
            <Link href="/" onClick={handleClick}>
              Home
            </Link>
            <Link href="/about" onClick={handleClick}>
              About
            </Link>
            <Link href="/tab-generator" onClick={handleClick}>
              Tab Generator
            </Link>
            <Link href="/escape-room/register" onClick={handleClick}>
              Escape Room
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
