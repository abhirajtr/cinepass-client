import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Footer } from "@/components/User/Footer";

const UserLayout = () => {    

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default UserLayout;