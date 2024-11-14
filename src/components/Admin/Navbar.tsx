import { FC } from "react";
import ProfileDropdown from "../ProfileDropdown";

interface navbarProps {
    userRole: string
    logout: () => void;
}

const Navbar: FC<navbarProps> = ({ logout, userRole }) => {


    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <div>
                {/* <img src={assets.logo1} alt="logo" className="w-32" /> */}
                <span className="text-xl font-bold text-green-60">CinePass</span>
                <p className="w-38 text-center font-medium text-green-80">{userRole} Panel</p>
            </div>
            <ProfileDropdown logout={logout} />
        </div>
    )
}

export default Navbar