// app/page.tsx
import Footer from "./Components/Footer";
import GeneratedTabs from "./Components/GeneratedTabs";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Output from "./Components/Output";
import Tabs from "./Components/Tabs";
export default function Home() {
  return (
    <div>
      <Header />
      <hr></hr>
      <NavBar />
      <Tabs />
      <GeneratedTabs />
      <Output />
      <Footer />
    </div>
  );
}
