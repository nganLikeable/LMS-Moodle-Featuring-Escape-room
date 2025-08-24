"use client";

type Tab = {
  id: number;
  title: string;
  content: string;
};

type TabListProps = {
  tabs: Tab[]; // List of tabs to display
  activeTab: number | null; // Currently active tab id
  setActiveTab: (id: number) => void; // Callback to switch tab
};

export default function TabList({
  tabs = [],
  activeTab,
  setActiveTab,
}: TabListProps) {
  return (
    <div
      className="nav flex-column nav-pills me-3"
      style={{ minWidth: "150px" }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-link ${tab.id === activeTab ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
