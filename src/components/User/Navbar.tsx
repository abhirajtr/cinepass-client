import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocationDropdown } from "./LocationDropDown";
import FullScreenSearchModal from "./FullScreenSearchModal";

const isLoggedIn = true; // This should be dynamically determined based on the user's auth state

export default function Navbar() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    return (
        <nav className="bg-background border-b">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            CinePass
                        </Link>
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                <Link
                                    to="/"
                                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/movies"
                                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Movies
                                </Link>
                                <Link
                                    to="/theatres"
                                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Theatres
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Center Section */}
                    <div className="flex-grow flex justify-center">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Search movies, theatres..."
                                className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                readOnly
                                onClick={() => setIsSearchModalOpen(true)}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <LocationDropdown />
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link to="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/bookings">My Bookings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/logout">Logout</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost">Sign In</Button>
                        )}
                    </div>
                </div>
            </div>
            <FullScreenSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
        </nav>
    );
}

