"use client";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import styles from "./ThemeToggle.module.css";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.container}>
      <button
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      >
        {theme === "light" ? <RiMoonLine /> : <RiSunLine />}
      </button>
    </div>
  );
}
