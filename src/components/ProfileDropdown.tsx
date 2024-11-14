import { FC, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ProfileDropdown: FC<{ logout: () => void }> = ({ logout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    let timeoutId: ReturnType<typeof setTimeout>;

    // Handle opening the dropdown
    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsDropdownOpen(true);
    };

    // Handle closing the dropdown with a slight delay
    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200); // delay in milliseconds
    };

    return (
        <div
            className="relative inline-block text-left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Profile Icon */}
            <button className="flex items-center justify-center w-10 h-10 text-absolute-white rounded-full focus:outline-none">
                {/* <img
                    className="w-8 h-8 rounded-full"
                    src="https://via.placeholder.com/40" // Replace with your profile image URL
                    alt="Profile"
                /> */}
                <FaUserCircle size={32} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    className="absolute right-0 mt-2 bg-absolute-white w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    onMouseEnter={handleMouseEnter}   // Keep open when hovering over the dropdown
                    onMouseLeave={handleMouseLeave}   // Close when leaving the dropdown area
                >
                    <div className="py-1">
                        <button
                            onClick={logout}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-60"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
