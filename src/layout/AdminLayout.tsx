'use client'

import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarAdmin from './components/NavbarAdmin'
import SidebarAdmin from "./components/SidebarAdmin"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useEffect } from "react"


const AdminLayout = () => {
    // Removed 'useSidebar' from here to ensure proper usage.

    const { adminToken } = useSelector((state: RootState) => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminToken) navigate("/admin/login");
    }, [adminToken, navigate]);

    if (!adminToken) return null;

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background container">
                {/* Sidebar */}
                <SidebarAdmin />

                {/* Main Content */}
                <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out">
                    {/* Navbar */}
                    <NavbarAdmin />

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