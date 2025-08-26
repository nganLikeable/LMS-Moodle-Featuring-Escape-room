"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TabForm.module.css";

type TabFormProps = {
  mode: "add" | "edit";
  initialTitle?: string;
  initialContent?: string;
  onCancel?: () => void;
  onSubmit: (title: string, content: string) => void;
};
export default function TabForm({
  mode,
  initialTitle = "",
  initialContent = "",
  onCancel,
  onSubmit,
}: TabFormProps) {
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

  // whenever parent hands down new initial props => overwrite
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]); // dependency array - run whenever one of the values changes

  const handleSubmit = () => {
    if (title.trim() || content.trim()) {
      onSubmit(title, content);
      if (mode === "add") {
        setTitle(""); // clear input for next entry
        setContent("");
      }
    }
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
        <div className={styles.btn}>
          <button onClick={handleSubmit}>
            {mode === "add" ? "Add Tab" : "Save Changes"}
          </button>
          {mode === "edit" && onCancel && (
            <button onClick={onCancel}>Cancel</button>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
