import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./components/Admin/Navbar"
import Sidebar from "./components/Admin/Sidebar"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { logout } from "./feature/authSlice";
// import { useContext } from "react"
// import Login from "./components/Admin/Login";
// import { AdminContext } from "./context/AdminContext";


const AdminLayout = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useSelector((state: RootState) => state.authReducer);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    
    if (!isAuthenticated && role !== "admin") return null;
    
    return (
        <div className="bg-grey-10 min-h-screen">
            <Navbar logout={handleLogout} />
            <hr />
            <div className="flex w-full">
                <Sidebar />
                <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout