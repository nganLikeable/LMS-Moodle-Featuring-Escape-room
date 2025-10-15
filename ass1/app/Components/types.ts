export type Tab = {
  id: number;
  title: string;
  content: string;
};
export type TabListProps = {
  tabs: Tab[];
  activeTab: Tab | null;
  setActiveTab: (id: number | null) => void;
  removeTab: (id: number) => void;
  updateTab: (id: number, newTitle: string, newContent: string) => void;
};
