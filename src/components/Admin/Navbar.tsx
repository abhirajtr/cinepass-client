import { FC } from "react";
import { LuLogOut } from "react-icons/lu";

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
            <div className="flex items-center justify-center border border-grey-15 px-4 py-1 text-absolute-white bg-red-500 rounded-md hover:bg-red-600 hover:cursor-pointer"
                onClick={() => logout()}
            >
                <span className="mr-2">Logout</span>
                <LuLogOut size={28} />
            </div>

            {/* <div>
                <span className="bg-grey-15 border border-grey-20 text-absolute-white px-5 py-2 sm:px-7 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-red-500"
                    onClick={() => logout()}
                >Logout</span>

            </div> */}
        </div>
    )
}

export default Navbar