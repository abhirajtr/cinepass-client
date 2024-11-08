import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const UserLayout = () => {
    return (
        <div className="bg-bg-dark min-h-[100vh]">
            <Navbar />
            <div className="bg-background px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout

{/* <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Navbar />
            <SearchBar />
            <Outlet />
            <Footer />
</div> */}