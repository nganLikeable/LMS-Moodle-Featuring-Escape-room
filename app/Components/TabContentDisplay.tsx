import styles from "././TabContentDisplay.module.css";
import TabList from "./TabList";
import { TabListProps } from "./types";

export default function TabContentDisplay({
  tabs,
  activeTab,
  setActiveTab,
  removeTab,
}: TabListProps) {
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content || "";

  return (
    <div className={styles.container}>
      <TabList
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        removeTab={removeTab}
      />
      <div className={styles.content}>
        {activeTab ? (
          <div
            dangerouslySetInnerHTML={{
              __html:
                tabs
                  .find((tab) => tab.id === activeTab)
                  ?.content.replace(/\n/g, "<br>") || "",
            }} // store raw text in localStorage with '\n' but when displaying, replace it with <br> to reserve line breaks
          />
        ) : (
          "Select a tab or add a new one."
        )}
      </div>
    </div>
  );
}
