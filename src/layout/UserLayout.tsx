import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
import Navbar from "@/components/User/Navbar";
import Footer from "@/pages/User/Footer";

const UserLayout = () => {

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default UserLayout;