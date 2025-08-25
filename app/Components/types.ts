export type Tab = {
  id: number;
  title: string;
  content: string;
};
export type TabListProps = {
  tabs: Tab[];
  activeTab: number | null;
  setActiveTab: (id: number) => void;
  removeTab: (id: number) => void;
};
