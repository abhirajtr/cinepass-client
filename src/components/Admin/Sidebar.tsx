import { FaUsers } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { SlScreenDesktop } from "react-icons/sl";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-[18%] border-r-2 border-grey-15 text-absolute-white">
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-grey-15 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-green-60 text-grey-10' : ''}`}
                >
                    <FaUsers size={28} />
                    <p className="hidden md:block">Users</p>
                </NavLink>
                <NavLink
                    to="/admin/theatres"
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-grey-15 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-green-60 text-grey-10' : ''}`}
                >
                    <SlScreenDesktop size={28} />
                    <p className="hidden md:block">Theatres</p>
                </NavLink>
                <NavLink
                    to="/admin/movies"
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-grey-15 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-green-60 text-grey-10' : ''}`}
                >
                    <RiMovie2Fill size={28} />
                    <p className="hidden md:block">Movies</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
