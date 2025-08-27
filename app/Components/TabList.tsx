"use client";
import { useEffect, useState } from "react";

import styles from "./TabList.module.css";
import { TabListProps } from "./types";

// prevents hydration error - only renders on the client
export default function TabListWrapper(props: TabListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // render nothing on server

  return <TabList {...props} />;
}

function TabList({
  tabs = [],
  activeTab,
  setActiveTab,
  removeTab,
}: TabListProps) {
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <div key={tab.id} className={styles.tabItem}>
          <button
            className={`${styles.tabButton} ${
              activeTab?.id === tab.id ? styles.active : ""
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
