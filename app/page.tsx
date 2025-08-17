// app/page.tsx
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
export default function Home() {
  return (
    <div>
      <Header />
      <hr></hr>
      <NavBar />
      <Footer />
    </div>
  );
}
