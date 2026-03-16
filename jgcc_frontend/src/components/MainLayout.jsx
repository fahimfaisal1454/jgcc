import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import HeaderBanner from "./HeaderBanner";
import NewsTicker from "./NewsTicker";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
//   const location = useLocation();
//   const isHome = location.pathname === "/";

  return (
    <div className="bg-white min-h-screen">

      <TopBar />

      <div className="max-w-5xl mx-auto bg-white shadow-md">
        <HeaderBanner />
        <Navbar />

        

        <NewsTicker />

        <Outlet />

      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;