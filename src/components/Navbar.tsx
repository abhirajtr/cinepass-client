import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../feature/authSlice";

const Navbar = () => {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <header className="bg-grey-11/30 text-gray-800 border-b border-grey-15 sticky top-0 z-10 backdrop-blur-lg">
            <div className="container flex justify-between h-15 mx-auto max-w-7xl px-6 py-3">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center">
                    <p className="text-xl font-bold text-green-60">CinePass</p>
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center justify-center h-10 w-24 px-2 py-2 rounded-full ${isActive ? "bg-grey-15 text-white" : "text-absolute-white"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                `flex items-center justify-center h-10 w-24 px-2 py-2 rounded-full ${isActive ? "bg-grey-15 text-white" : "text-absolute-white"
                                }`
                            }
                        >
                            Movies
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to="/theatres"
                            className={({ isActive }) =>
                                `flex items-center justify-center h-10 w-24 px-2 py-2 rounded-full ${isActive ? "bg-grey-15 text-white" : "text-absolute-white"
                                }`
                            }
                        >
                            Theaters
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to="/about-us"
                            className={({ isActive }) =>
                                `flex items-center justify-center h-10 w-24 px-2 py-2 rounded-full ${isActive ? "bg-grey-15 text-white" : "text-absolute-white"
                                }`
                            }
                        >
                            About Us
                        </NavLink>
                    </li>
                </ul>

                {isAuthenticated ? (
                    <div className="relative">
                        <div className="flex items-center h-full text-absolute-white hover:cursor-pointer hover:text-green-60 relative group">
                            <FaUserCircle size={30} />
                            <div className="absolute bg-absolute-white rounded right-0 top-10 group-hover:flex flex-col hidden w-32 text-center gap-2 py-3 text-black">
                                <span className="hover:bg-green-60">My Profile</span>
                                <span className="hover:bg-green-60">Bookings</span>
                                <span className="hover:bg-green-60" onClick={handleLogout}>Logout</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <NavLink to="/login" className="self-center px-8 py-3 rounded text-absolute-white">
                            Sign in
                        </NavLink>
                        <NavLink to="/signup" className="self-center px-8 py-3 font-semibold rounded bg-green-60 text-grey-11">
                            Sign up
                        </NavLink>
                    </div>
                )}

                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
