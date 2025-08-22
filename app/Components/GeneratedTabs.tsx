"use client";
import { useState } from "react";
import styles from "./GeneratedTabs.module.css";

type Tab = {
  id: number;
  title: string;
  content: string;
};

export default function GeneratedTabs() {
  const [tab, setTab] = useState<Tab[]>([]); // add a new tab
  const [activeTab, setActiveTab] = useState<number | null>(null); // either a tab or none is active
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addTab = () => {
    if (!title.trim()) return; // avoid empty title field

    const newTab: Tab = {
      id: Date.now(), // unique id
      title: title,
      content: content,
    };
    setTab([...tab, newTab]); // add new tab to list
    setActiveTab(newTab.id); // switch to new tab
    setTitle(""); // reset input fields after adding
    setContent("");
  };
  return (
    <div>
      {/* Input fields */}
      <input
        type="text"
        className={styles.form}
        placeholder="Tab Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>

      <input
        type="text"
        className={styles.form}
        placeholder="Tab Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>

      <button onClick={addTab}>Add Tab</button>
    </div>
  );
}
