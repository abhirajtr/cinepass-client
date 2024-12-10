import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarAdmin from './components/NavbarAdmin'
import SidebarAdmin from "./components/SidebarAdmin"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { useEffect } from "react"
import { logout } from "@/feature/authSlice"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { backendUrl } from "@/constants"


const AdminLayout = () => {
    const { adminToken } = useSelector((state: RootState) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!adminToken) navigate("/admin/login");
    }, [adminToken, navigate]);

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${backendUrl}/admin/logout`, {}, { withCredentials: true });
            dispatch(logout("admin"));
            toast.success(response.data.responseMessage);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
        }
    }

    if (!adminToken) return null;

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background container">
                {/* Sidebar */}
                <SidebarAdmin />

                {/* Main Content */}
                <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out">
                    {/* Navbar */}
                    <NavbarAdmin logoutAction={handleLogout} />

                    {/* Main Section */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout;