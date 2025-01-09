import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
import Navbar from "../components/User/Navbar";
import Footer from "../pages/User/Footer";
import ScrollToTop from "../components/ScrollToTop";

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default UserLayout;