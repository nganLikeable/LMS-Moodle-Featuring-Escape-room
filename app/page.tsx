// app/page.tsx
import Tabs from "./Components/Tabs";
import DarkModeToggle from "./Components/ThemeToggle";

export default function Home() {
  return (
    <div>
      <DarkModeToggle />
      <Tabs />
    </div>
  );
}
