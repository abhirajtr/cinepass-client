import { Button } from "../../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { SidebarTrigger } from "../../components/ui/sidebar"
import { LogOut, Menu, Settings, User, Users } from "lucide-react"
import { FC } from "react"




const NavbarAdmin: FC<{ logoutAction: () => void }> = ({ logoutAction }) => {



    return (
        <header className="flex items-center justify-between p-4 bg-background border-b">
            <div className="flex items-center">
                <SidebarTrigger className="lg:hidden mr-2">
                    <Menu className="h-6 w-6" />
                </SidebarTrigger>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <User className="h-5 w-5" />
                        {/* <img src="/placeholder.svg?height=32&width=32" alt="Admin" className="rounded-full" /> */}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutAction}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default NavbarAdmin