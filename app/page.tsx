// app/page.tsx
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Output from "./Components/Output";
import TabContainer from "./Components/TabContainer";
import Tabs from "./Components/Tabs";
import DarkModeToggle from "./Components/ThemeToggle";
export default function Home() {
  return (
    <div>
      <Header />
      <hr></hr>
      <DarkModeToggle />
      <NavBar />
      <Tabs />
      <TabContainer />
      <Output />
      <Footer />
    </div>
  );
}
