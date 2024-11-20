import { BarChart3, Film, Theater, Ticket, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Import useNavigate for navigation

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', to: '/admin' },
    { icon: Users, label: 'Users', to: '/admin/users' },
    { icon: Users, label: 'Theatre Owners', to: '/admin/theatreOwners' },
    { icon: Theater, label: 'Theatres', to: '/admin/theatres' },
    { icon: Ticket, label: 'Bookings', to: '/admin/bookings' },
]


const SidebarAdmin = () => {
    const location = useLocation();
    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-accent text-primary' : '';
    };

    return (
        <Sidebar className="w-64 transition-all duration-300 ease-in-out" collapsible="icon">
            <SidebarHeader className="p-4">
                <div className="flex items-center space-x-2">
                    <Film className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">CinePass Admin</span>
                </div>
            </SidebarHeader>
            <SidebarContent className='px-4'>
                <SidebarMenu>
                    {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton asChild className='hover:bg-secondary hover:text-primary'>
                                <Link to={item.to} className={`${isActive(item.to)} flex items-center`}>
                                    <item.icon className='mr-2 h-4 2-4' />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};

export default SidebarAdmin;
