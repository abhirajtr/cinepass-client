import { LayoutDashboard, Theater, Users, X } from "lucide-react"
import { NavLink } from "react-router-dom"

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside className={`
        fixed left-0 top-0 z-40 h-screen w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button onClick={toggleSidebar} className="md:hidden" aria-label="Close sidebar">
                    <X size={24} />
                </button>
            </div>
            <nav className="p-4">
                <NavLink to="/admin/" end className={({ isActive }) => `
            flex items-center p-2 rounded-lg transition-colors duration-200
            ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
          `}>
                    <LayoutDashboard className="mr-2" size={20} />
                    Dashboard
                </NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => `
            flex items-center p-2 rounded-lg transition-colors duration-200 mt-2
            ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
          `}>
                    <Users className="mr-2" size={20} />
                    Users
                </NavLink>
                <NavLink to="/admin/theatres" className={({ isActive }) => `
            flex items-center p-2 rounded-lg transition-colors duration-200 mt-2
            ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
          `}>
                    <Theater className="mr-2" size={20} />
                    Theatres
                </NavLink>
            </nav>
        </aside>
    )
}