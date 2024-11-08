import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { logout } from "../feature/authSlice";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <nav className="sticky top-0 z-30 text-text-muted">
            <div className="bg-bg-dark-secondary/30 backdrop-blur-lg rounded">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-brand-primary text-2xl font-bold">CinePass</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/home" className="hover:text-highlight-text">Home</Link>
                        <Link to="/movies" className="hover:text-highlight-text">Movies</Link>
                        <Link to="/theatres" className="hover:text-highlight-text">Theatres</Link>
                        <Link to="/bookings" className="hover:text-highlight-text">Bookings</Link>
                        <Link to="/contact" className="hover:text-highlight-text">Contact</Link>
                    </div>

                    <div className="flex gap-5">

                        <div className='group relative flex h-full cursor-pointer'>
                            <Link to='/login'>
                                <FaUserCircle size={24} className='group-hover:text-highlight-text' />
                            </Link>
                            {/* Increase z-index to ensure dropdown is on top */}
                            <div className='group-hover:block hidden absolute dropdown-menu right-2 pt-6 z-20'>
                                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-primary-text rounded bg-highlight-text text-bg-dark'>
                                    <Link to="/profile" className='cursor-pointer hover:text-brand-primary'>My Profile</Link>
                                    <Link to="/oders" className='cursor-pointer hover:text-brand-primary'>Orders</Link>
                                    <p className='cursor-pointer hover:text-brand-primary'
                                        onClick={handleLogout}
                                    >Logout</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden text-white focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
            {/* Mobile Menu */}
            <div
                className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-black text-white p-4`}
            >
                <Link to="/home" className="block py-2 hover:bg-light-purple hover:text-black">Home</Link>
                <Link to="/movies" className="block py-2 hover:bg-light-purple hover:text-black">Movies</Link>
                <Link to="/theatres" className="block py-2 hover:bg-light-purple hover:text-black">Theatres</Link>
                <Link to="/bookings" className="block py-2 hover:bg-light-purple hover:text-black">Bookings</Link>
                <Link to="/contact" className="block py-2 hover:bg-light-purple hover:text-black">Contact</Link>
            </div>

        </nav>
    );
};

export default Navbar;
