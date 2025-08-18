"use client";

import { useState } from "react";
import styles from "./Tabs.module.css";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("tabs"); // default

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tablinks} ${
            activeTab == "tabs" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("tabs")}
        >
          Tabs
        </button>
        <button
          className={`${styles.tablinks} ${
            activeTab === "prelabs" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("prelabs")}
        >
          Pre-labs Questions
        </button>

        <button
          className={`${styles.tablinks} ${
            activeTab === "escape" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("escape")}
        >
          Escape Room
        </button>

        <button
          className={`${styles.tablinks} ${
            activeTab === "races" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("races")}
        >
          Coding Races
        </button>
      </div>
      {/* Tab content */}
      <div className={styles.tabContent}>
        {activeTab === "tabs" && <p>Tabs content here...</p>}
        {activeTab === "prelabs" && <p>Pre-labs Questions content here...</p>}
        {activeTab === "escape" && <p>Escape Room content here...</p>}
        {activeTab === "races" && <p>Coding Races content here...</p>}
      </div>
    </div>
  );
}
