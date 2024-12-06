import Footer from "@/components/Footer";
import PasswordGenerator from "../components/PasswordGenerator";
import NavBar from "@/components/Navbar";

export default function Home() {
  return (
    
    <div className="bg-gray-50 overflow-hidden">
      <NavBar></NavBar>
      <div className="grid justify-center bg-gray-50">
          <PasswordGenerator />
          
      </div>
      <Footer></Footer>
    </div>
  );
}
