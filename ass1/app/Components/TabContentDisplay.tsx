"use client";

import styles from "././TabContentDisplay.module.css";
import TabForm from "./TabForm";
import TabList from "./TabList";
import { TabListProps } from "./types";

export default function TabContentDisplay({
  tabs,
  activeTab,
  setActiveTab,
  removeTab,
  updateTab,
}: TabListProps) {
  return (
    <div className={styles.container}>
      {/* show tab list */}
      <TabList
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        removeTab={removeTab}
        updateTab={updateTab}
      />
      {/* if a tab is selected, render edit form */}
      {activeTab && (
        <TabForm
          mode="edit"
          initialTitle={activeTab.title}
          initialContent={activeTab.content}
          onSubmit={(newTitle, newContent) => {
            updateTab(activeTab.id, newTitle, newContent);
          }}
          onCancel={() => {
            setActiveTab(null);
          }} // hide edit form
        />
      )}
    </div>
  );
}
