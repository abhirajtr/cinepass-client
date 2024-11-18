'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import SidebarTheatreOwner from './components/SidebarTheatreOwner'
import NavbarTheatreOwner from './components/NavbarTheatreOwner'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { logoutTheaterOwner } from '@/feature/authSlice'
import { useEffect } from 'react'

export default function TheatreOwnerLayout() {

    const { theaterOwnerToken } = useSelector((state: RootState) => state.authReducer);
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutTheaterOwner());
    }

    useEffect(() => {
        if (!theaterOwnerToken) {
            navigate("/theatreOwner/login");
        }
    }, [theaterOwnerToken, navigate])

    if (!theaterOwnerToken) return null;

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background container">
                <SidebarTheatreOwner />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <NavbarTheatreOwner logout={handleLogout} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}