import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Admin/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../feature/authSlice";
import { useEffect } from "react";
import Sidebar from "../components/TheatreOwner/Sidebar";



const AdminLayout = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useSelector((state: RootState) => state.authReducer);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    
    useEffect(() => {
        if (!isAuthenticated || role !== "theatreOwner") {
            navigate("/login");
        }
    }, [isAuthenticated, role, navigate]);

    if (!isAuthenticated || role !== "theatreOwner") return null;

    return (
        <div className="bg-grey-10 min-h-screen flex flex-col">
            <Navbar logout={handleLogout} userRole="Theatre Owner"  />
            <hr />
            <div className="flex flex-1 w-full h-full">
                <Sidebar />
                <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-absolute-white text-base max-h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout