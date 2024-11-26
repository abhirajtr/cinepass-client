import * as React from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Film, Menu, User, LogOut, X } from 'lucide-react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { logout } from "@/feature/authSlice"

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const { userToken } = useSelector((state: RootState) => state.authReducer);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogout = () => {
        dispatch(logout("user"));
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="container flex h-16 items-center">
                <Link to="/" className="flex items-center space-x-2 md:mr-6">
                    <Film className="h-6 w-6 text-primary" />
                    <span className="font-bold">CinePass</span>
                </Link>
                <nav className="hidden md:flex flex-1 justify-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
                        Home
                    </Link>
                    <Link to="/movies" className="text-sm font-medium hover:underline underline-offset-4">
                        Movies
                    </Link>
                    <Link to="/theatres" className="text-sm font-medium hover:underline underline-offset-4">
                        Theaters
                    </Link>
                    <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
                        About
                    </Link>
                </nav>

                {userToken ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> :
                    <Link to="/login" className={buttonVariants({ variant: "outline" })}>Log In</Link>


                    // <Link to="/login" className="bg-primary px-2 text-background">Log In</Link>
                    // <Button onClick={() => <Navigate to="/login" />}>Log In</Button>
                }
                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-background md:hidden px-6">
                    <div className="container flex h-16 items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Film className="h-6 w-6" />
                            <span className="font-bold">CinePass</span>
                        </Link>
                        <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleMenu}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <nav className="container grid gap-6 p-6">
                        <Link to="." className="text-lg font-medium hover:underline underline-offset-4">
                            Home
                        </Link>
                        <Link to="/movies" className="text-lg font-medium hover:underline underline-offset-4">
                            Movies
                        </Link>
                        <Link to="/theatres" className="text-lg font-medium hover:underline underline-offset-4">
                            Theaters
                        </Link>
                        <Link to="/about" className="text-lg font-medium hover:underline underline-offset-4">
                            About
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}