import { LogOut, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Implement logout logic here
        console.log('Logging out...')
        // After logout, redirect to login page
        navigate('/login')
    }

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600 md:hidden" aria-label="Open sidebar">
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold ml-4 md:ml-0">Admin Dashboard</h1>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                aria-label="Logout"
            >
                <LogOut size={20} className="mr-2" />
                Logout
            </button>
        </nav>
    )
}