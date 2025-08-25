"use client";
import { useEffect, useState } from "react";

import TabContentDisplay from "./TabContentDisplay";
import GeneratedTabs from "./TabForm";
import { Tab } from "./types";

export default function TabContainer() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
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
    setActiveTab(newTab.id);
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
    if (activeTab === id) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    }
  };
  return (
    <div>
      <GeneratedTabs addTab={addTab} />
      <TabContentDisplay
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        removeTab={removeTab}
      />
    </div>
  );
}
