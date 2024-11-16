import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Outlet } from 'react-router-dom'
import { Menu, X, LayoutDashboard, Users, Theater } from 'lucide-react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside className={`
      fixed left-0 top-0 z-40 h-screen w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button onClick={toggleSidebar} className="md:hidden">
                    <X size={24} />
                </button>
            </div>
            <nav className="p-4">
                <NavLink to="/" end className={({ isActive }) => `
          flex items-center p-2 rounded-lg transition-colors duration-200
          ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
        `}>
                    <LayoutDashboard className="mr-2" size={20} />
                    Dashboard
                </NavLink>
                <NavLink to="/users" className={({ isActive }) => `
          flex items-center p-2 rounded-lg transition-colors duration-200 mt-2
          ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
        `}>
                    <Users className="mr-2" size={20} />
                    Users
                </NavLink>
                <NavLink to="/theatres" className={({ isActive }) => `
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

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-md p-4 flex items-center md:hidden">
                    <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600">
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-semibold ml-4">Admin Dashboard</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

const Dashboard = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Theatres</h3>
                <p className="text-3xl font-bold">56</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Shows</h3>
                <p className="text-3xl font-bold">23</p>
            </div>
        </div>
    </div>
)

const Users = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                        <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap">jane@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap">User</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)

const Theatres = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Theatres</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Grand Theatre</td>
                        <td className="px-6 py-4 whitespace-nowrap">New York</td>
                        <td className="px-6 py-4 whitespace-nowrap">500</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Starlight Cinema</td>
                        <td className="px-6 py-4 whitespace-nowrap">Los Angeles</td>
                        <td className="px-6 py-4 whitespace-nowrap">300</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)