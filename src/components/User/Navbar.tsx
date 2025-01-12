import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io('http://localhost:3000', {
    transports: ['websocket'],
});
import { Link } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { Button, buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "../../feature/authSlice";
import { LocationDropdown } from "./LocationDropdown";
import FullScreenSearchModal from "./FullScreenSearchModal";

const Navbar = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { userToken } = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Step 1: Track dropdown state

    useEffect(() => {
        // Listen for connection
        socket.on('connect', () => {
            console.log('Connected to WebSocket:', socket.id);
        });

        socket.on('connect_error', (error) => {
            console.log('WebSocket connection error:', error);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
        });
    }, []);

    const handleLogout = async () => {
        try {
            dispatch(logout("user"));
            setIsDropdownOpen(false); // Close dropdown after logout
        } catch (error) {
            console.log(error);
            // handle error if needed
        }
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false); // Step 2: Close dropdown when any item is clicked
    };

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
                                {/* <Link
                                    to="/movies"
                                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Movies
                                </Link> */}
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
                        <Link to={`/notifications`} className="relative">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-medium text-destructive-foreground">
                                    3
                                </span>
                            </Button>
                        </Link>
                        {userToken ? (
                            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleDropdownClose}>
                                        <Link className="w-full" to="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDropdownClose}>
                                        <Link className="w-full" to="/bookings">My Bookings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDropdownClose}>
                                        <Link className="w-full" to="/wallet">Wallet</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:cursor-pointer"
                                        onClick={() => { handleLogout(); handleDropdownClose(); }}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link to="/login" className={buttonVariants({ variant: "ghost" })}>Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
            <FullScreenSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
        </nav>
    );
}

export default Navbar;