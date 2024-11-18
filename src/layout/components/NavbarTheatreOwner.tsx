import { FC } from 'react'
import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
// import { Input } from '@/components/ui/input'
import ProfileDropdownTheatreOwner from './ProfileDropDownTheatreOwner'

const NavbarTheatreOwner: FC<{ logout: () => void }> = ({ logout }) => {
    return (
        <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center">
                <SidebarTrigger className="lg:hidden mr-2">
                    <Menu className="h-6 w-6" />
                </SidebarTrigger>
                {/* <Input
                    type="search"
                    placeholder="Search movies, showtimes..."
                    className="w-[200px] lg:w-[300px]"
                /> */}
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <ProfileDropdownTheatreOwner logout={logout} />
            </div>
        </header>
    )
}


export default NavbarTheatreOwner;