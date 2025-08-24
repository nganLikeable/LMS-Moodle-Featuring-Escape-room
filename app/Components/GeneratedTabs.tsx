"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./GeneratedTabs.module.css";
import TabList from "./TabList";

type Tab = {
  id: number;
  title: string;
  content: string;
};

export default function GeneratedTabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // measure and set height of text area dynamically
  const textareaRef = useRef<HTMLTextAreaElement>(null); // object

  // auto resize effect, runs whenever content changes
  useEffect(() => {
    // safety check if
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

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

  const addTab = () => {
    if (!title.trim()) return; // prevent adding tabs with empty title

    const newTab: Tab = {
      id: Date.now(), // unique id
      title,
      content,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    setTitle(""); // clear input for next entry
    setContent("");
  };

  return (
    <div className={styles.container}>
      {/* Form inputs */}
      <div className={styles.inputFields}>
        <input
          type="text"
          className={styles.tabTitle}
          placeholder="Tab Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          ref={textareaRef}
          className={styles.tabContent}
          placeholder="Tab Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className={styles.addTabButton} onClick={addTab}>
          Add Tab
        </button>
      </div>
      {/* Left-side Tab Bar */}
      <div className={styles.tabBar}>
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {/* Right-side Active Tab Content */}
      <div className={styles.tabContentDisplay}>
        {activeTab
          ? tabs.find((tab) => tab.id === activeTab)?.content
          : "Select a tab or add a new one."}
      </div>{" "}
    </div>
  );
}
