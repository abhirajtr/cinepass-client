import { Link, useLocation } from 'react-router-dom'
import { Home, Film, Calendar, Users, Settings, LayoutGrid } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

const sidebarItems = [
    { icon: Home, label: 'Dashboard', to: '/theatreOwner' },
    { icon: LayoutGrid, label: 'Theatres', to: '/theatreOwner/theatres' },
    { icon: Film, label: 'Movies', to: '/theatreOwner/movies' },
    { icon: Calendar, label: 'Showtimes', to: '/theatreOwner/showtimes' },
    { icon: Users, label: 'Customers', to: '/theatreOwner/customers' },
    { icon: Settings, label: 'Settings', to: '/theatreOwner/settings' },
]

const SidebarTheatreOwner = () => {

    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-accent text-primary' : '';
    }

    return (
        <Sidebar className="w-64 border-r">
            <SidebarHeader className="p-4">
                <h2 className="text-2xl font-bold text-primary">CinePass</h2>
                <p className="text-sm text-muted-foreground">Theatre Management</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton asChild>
                                <Link to={item.to} className={`${isActive(item.to)}flex items-center`}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default SidebarTheatreOwner;