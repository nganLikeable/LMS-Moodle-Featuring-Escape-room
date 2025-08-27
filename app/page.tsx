// app/page.tsx
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Tabs from "./Components/Tabs";
import DarkModeToggle from "./Components/ThemeToggle";
export default function Home() {
  return (
    <div>
      <Header />
      <DarkModeToggle />
      <NavBar />
      <Tabs />
      <Footer />
    </div>
  );
}
