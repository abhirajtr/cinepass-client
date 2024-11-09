import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
// import Navbar from "./components/Navbar"
import Nav from "./components/Nav"

const UserLayout = () => {
    return (
        <div className="bg-grey-10 min-h-[100vh]">
            {/* <Navbar /> */}
            <Nav />
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout;