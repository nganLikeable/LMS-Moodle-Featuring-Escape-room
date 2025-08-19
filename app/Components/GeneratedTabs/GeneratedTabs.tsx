"use client";
import { useState } from "react";
import styles from "./GeneratedTabs.module.css";

interface Tab {
  id: number;
  title: string;
  content: string;
}

export default function DynamicTabs() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: "Tab 1", content: "Content for Tab 1" },
  ]);
  const [activeId, setActiveId] = useState(1);

  const handleAdd = () => {
    if (tabs.length >= 15) return;
    const newId = Math.max(...tabs.map((t) => t.id)) + 1;
    setTabs([
      ...tabs,
      { id: newId, title: `Tab ${newId}`, content: `Content for Tab ${newId}` },
    ]);
    setActiveId(newId);
  };

  const handleRemove = () => {
    if (tabs.length <= 1) return;
    const remaining = tabs.filter((t) => t.id !== activeId);
    setTabs(remaining);
    setActiveId(remaining[0].id);
  };

  return (
    <div className={styles.dynamicTabs}>
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={handleAdd}
          aria-label="Add Tab"
        >
          +
        </button>
        <button
          className={styles.controlBtn}
          onClick={handleRemove}
          aria-label="Remove Tab"
        >
          –
        </button>
      </div>

      <div className={styles.tabButtons} role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabBtn} ${
                isActive ? styles.tabBtnActive : ""
              }`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div className={styles.tabContent}>
        {tabs.map(
          (tab) =>
            tab.id === activeId && (
              <section key={tab.id} role="tabpanel">
                <h2>{tab.title}</h2>
                <p>{tab.content}</p>
              </section>
            )
        )}
      </div>
    </div>
  );
}
