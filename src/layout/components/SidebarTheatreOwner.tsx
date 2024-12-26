import { Link, useLocation } from 'react-router-dom'
import { Home, Film, LayoutGrid } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

const sidebarItems = [
    { icon: Home, label: 'Dashboard', to: '/theatreOwner/dashboard' },
    { icon: LayoutGrid, label: 'Theatres', to: '/theatreOwner/theatres' },
    { icon: Film, label: 'Movies', to: '/theatreOwner/movies' },
    // { icon: Calendar, label: 'Show Time', to: '/theatreOwner/showtime' },
    // { icon: Users, label: 'Customers', to: '/theatreOwner/customers' },
    // { icon: Settings, label: 'Settings', to: '/theatreOwner/settings' },
]

const SidebarTheatreOwner = () => {

    const location = useLocation();
    console.log(location);


    const isActive = (path: string) => {
        console.log("isActive", location.pathname, path);

        return location.pathname.toLowerCase().includes(path.toLowerCase()) ? 'bg-accent text-primary' : '';
    }

    return (
        <Sidebar className="w-64 transition-all duration-300 ease-in-out" collapsible="icon">
            <SidebarHeader className="p-4">
                <div className="flex items-center space-x-2">
                    <Film className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">CinePass TheatreOwner</span>
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
        // <Sidebar className="w-64 border-r">
        //     <SidebarHeader className="p-4">
        //         <h2 className="text-2xl font-bold text-primary">CinePass</h2>
        //         <p className="text-sm text-muted-foreground">Theatre Management</p>
        //     </SidebarHeader>
        //     <SidebarContent>
        //         <SidebarMenu>
        //             {sidebarItems.map((item) => (
        //                 <SidebarMenuItem key={item.label}>
        //                     <SidebarMenuButton asChild>
        //                         <Link to={item.to} className={`${isActive(item.to)}flex items-center`}>
        //                             <item.icon className="mr-2 h-4 w-4" />
        //                             <span>{item.label}</span>
        //                         </Link>
        //                     </SidebarMenuButton>
        //                 </SidebarMenuItem>
        //             ))}
        //         </SidebarMenu>
        //     </SidebarContent>
        // </Sidebar>
    )
}

export default SidebarTheatreOwner;