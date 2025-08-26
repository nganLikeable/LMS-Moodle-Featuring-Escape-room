// app/page.tsx
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import TabContainer from "./Components/TabContainer";
import Tabs from "./Components/Tabs";
export default function Home() {
  return (
    <div>
      <Header />
      <hr></hr>
      <NavBar />
      <Tabs />
      <TabContainer />
      <Footer />
    </div>
  );
}
