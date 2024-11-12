import { FaUsers } from "react-icons/fa"
import { RiMovie2Fill } from "react-icons/ri"
import { SlScreenDesktop } from "react-icons/sl"
import { NavLink } from "react-router-dom"
// import { assets } from "../../assets/assets"

const Sidebar = () => {
    return (
        <div className="w-[18%] border-r-2 border-grey-15 text-absolute-white">
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink to="/admin/users" className="flex items-center gap-3 border border-grey-15 border-r-0 px-3 py-2 rounded-l" >
                    {/* <img src={assets.add_icon} alt="" className="w-5 h-5" /> */}
                    <FaUsers size={28} className="text-absolute-white" />
                    <p className="hidden md:block">users</p>
                </NavLink>
                <NavLink to="/admin/theatres" className="flex items-center gap-3 border border-grey-15 border-r-0 px-3 py-2 rounded-l" >
                    {/* <img src={assets.order_icon} alt="" className="w-5 h-5" /> */}
                    {/* <FaTheaterMasks size={28} className="text-absolute-white" /> */}
                    <SlScreenDesktop size={28} />
                    <p className="hidden md:block">Theatres</p>
                </NavLink>
                <NavLink to="/admin/movies" className="flex items-center gap-3 border border-grey-15 border-r-0 px-3 py-2 rounded-l" >
                    {/* <FaUsers size={28} className="text-absolute-white" /> */}
                    <RiMovie2Fill size={28} />
                    {/* <img src={assets.add_icon} alt="" className="w-5 h-5" /> */}
                    <p className="hidden md:block">Movies</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar