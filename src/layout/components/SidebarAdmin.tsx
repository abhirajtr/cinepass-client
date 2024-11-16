import { BarChart3, Film, Ticket, Users, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";


const SidebarAdmin = () => {
    const location = useLocation(); // Hook to get the current route
    const navigate = useNavigate(); // Hook to programmatically navigate
   

    // Function to check if the current route matches the sidebar item
    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-accent text-primary' : ''; // Apply active styles
    };

    // Function to handle navigation on click
    const handleNavigation = (path: string) => {
        navigate(path); // Navigate to the provided route
    };

    return (
        <Sidebar className="w-64 bg-white transition-all duration-300 ease-in-out" collapsible="icon">
            <SidebarHeader className="p-4">
                <div className="flex items-center space-x-2">
                    <Film className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">CinePass Admin</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={isActive('/admin')}
                            onClick={() => handleNavigation('/admin')}
                        >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={isActive('/admin/bookings')}
                            onClick={() => handleNavigation('/admin/bookings')}
                        >
                            <Ticket className="mr-2 h-4 w-4" />
                            <span>Bookings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={isActive('/admin/movies')}
                            onClick={() => handleNavigation('/admin/movies')}
                        >
                            <Film className="mr-2 h-4 w-4" />
                            <span>Movies</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={isActive('/admin/users')}
                            onClick={() => handleNavigation('/admin/users')}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            <span>Users</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={isActive('/admin/settings')}
                            onClick={() => handleNavigation('/admin/settings')}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};

export default SidebarAdmin;
