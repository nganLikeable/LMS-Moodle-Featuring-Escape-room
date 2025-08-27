"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import styles from "./ThemeToggle.module.css";
export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  // prevent hydration error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // render nothing on server
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          resolvedTheme == "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        {resolvedTheme === "light" ? <RiMoonLine /> : <RiSunLine />}
      </button>
    </div>
  );
}
