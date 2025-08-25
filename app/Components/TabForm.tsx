"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TabForm.module.css";

type TabFormProps = {
  addTab: (title: string, content: string) => void;
};
export default function GeneratedTabs({ addTab }: TabFormProps) {
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

  const handleAdd = () => {
    addTab(title, content), setTitle(""); // clear input for next entry
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
        <button className={styles.addTabButton} onClick={handleAdd}>
          Add Tab
        </button>
      </div>
    </div>
  );
}
