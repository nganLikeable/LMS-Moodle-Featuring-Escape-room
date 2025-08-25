import styles from "././TabContentDisplay.module.css";
import { Tab } from "./types";
type TabContentDisplayProps = {
  tabs: Tab[];
  activeTab: number | null;
};

export default function TabContentDisplay({
  tabs,
  activeTab,
}: TabContentDisplayProps) {
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content || "";

  return (
    <div className={styles.container}>
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
  );
}
