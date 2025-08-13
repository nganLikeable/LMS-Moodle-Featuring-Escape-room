// app/page.tsx
import HamburgerMenu from "./Components/HamburgerMenu";
import Footer from "./Components/Footer"
export default function Home() {
  return (
    <div>
      <HamburgerMenu />
      <h1>Welcome to My Next.js App</h1>
      <Footer/>
    </div>
  );
}
