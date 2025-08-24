"use client";

import styles from "./TabList.module.css";

type Tab = {
  id: number;
  title: string;
  content: string;
};

type TabListProps = {
  tabs: Tab[]; // tabs to display
  activeTab: number | null;
  setActiveTab: (id: number) => void;
};

export default function TabList({
  tabs = [],
  activeTab,
  setActiveTab,
}: TabListProps) {
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
