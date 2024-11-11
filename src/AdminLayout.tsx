// import Navbar from "./components/Admin/Navbar";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "./store";
import { logout } from "./feature/authSlice";

const AdminLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    }
    return (
        <div className="min-h-[100vh] bg-grey-10 text-white flex flex-col">
            {/* <Navbar/> */}
            <Sidebar logout={handleLogout} />
        </div>
        // <div className="bg-bg-dark min-h-[100vh]">
        //     <Navbar />
        //     <div className="bg-background px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        //         <Outlet />
        //     </div>
        //     <Footer />
        // </div>
    )
}

export default AdminLayout