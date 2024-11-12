import { FC } from "react";

interface navbarProps {
    logout: () => void;
}

const Navbar: FC<navbarProps> = ({ logout }) => {

    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <div>
                {/* <img src={assets.logo1} alt="logo" className="w-32" /> */}
                <span className="text-xl font-bold text-green-60">CinePass</span>
                <p className="w-32 text-center font-medium text-green-80">Admin Panel</p>
            </div>
            <button className="bg-grey-15 border border-grey-20 text-absolute-white px-5 py-2 sm:px-7 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-red-500"
                onClick={() => logout()}
            >Logout</button>
        </div>
    )
}

export default Navbar