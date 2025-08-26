"use client";
import { useEffect, useState } from "react";

import Output from "./Output";
import TabContentDisplay from "./TabContentDisplay";
import TabForm from "./TabForm";
import { Tab } from "./types";

import styles from "./TabContainer.module.css";

interface TabContainerProps {
  tabs: Tab[];
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
}
export default function TabContainer({ tabs, setTabs }: TabContainerProps) {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const addTab = (title: string, content: string) => {
    if (!title.trim()) return; // prevent adding tabs with empty title

    if (tabs.length >= 15) {
      alert("You can only create 15 tabs!!");
      return;
    }
    const newTab: Tab = {
      id: Date.now(), // unique id
      title,
      content,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  // load saved tabs on mount
  useEffect(() => {
    const saved = localStorage.getItem("tabs");
    if (saved) {
      setTabs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  const removeTab = (id: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    // check if deleted tab is currently active => make the first tab active or nothing is shown if no tabs left
    if (activeTabId === id) {
      setActiveTabId(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    }
  };
  const updateTab = (id: number, title: string, content: string) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === id ? { ...tab, title: title, content: content } : tab
      )
    );
    alert("Tab is updated!");
  };

  // derive active tab obj

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || null;
  return (
    <div className={styles.container}>
      <TabForm
        mode="add"
        onSubmit={(title, content) => addTab(title, content)}
      />
      <TabContentDisplay
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTabId}
        removeTab={removeTab}
        updateTab={updateTab}
      />
      <Output />
    </div>
  );
}
