"use client";

import styles from "./TabList.module.css";
import { Tab } from "./types";

type TabListProps = {
  tabs: Tab[]; // tabs to display
  activeTab: number | null;
  setActiveTab: (id: number) => void;
  removeTab: (id: number) => void;
};

export default function TabList({
  tabs = [],
  activeTab,
  setActiveTab,
  removeTab,
}: TabListProps) {
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <div className={styles.tabItem}>
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => removeTab(tab.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
