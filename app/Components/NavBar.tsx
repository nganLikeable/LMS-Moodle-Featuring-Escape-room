"use client";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/*Left side tabs*/}
        {/* <div className={styles.tabs}>
          <Tabs />
        </div>
 */}
        {/*Right links and menu*/}
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
