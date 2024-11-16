import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useEffect, useState } from "react"
import Modal from "../../layout/components/Modal"
import axiosInstance from "../../axiosInstance";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface User {
    userId: string;
    name: string;
    email: string;
    phone: string,
    role: string
    isBlocked: boolean,
    createdAt: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User>();
    const [actionType, setActionType] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const params = { search: searchTerm, userRole: roleFilter, isBlocked: statusFilter, limit: 5, currentPage };
                // console.log("Fetching users with params:", params);

                const response = await axiosInstance.get<{ users: User[], totalCount: number }>("/admin/users", { params });
                setUsers(response.data.users);
                // setTotalCount(response.data.totalCount);
                console.log(response);

                // console.log('totalCount', totalCount);

                // console.log(response.data.users);

            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("An unexpected error occured");
                }
            }
        }
        fetchUsers();
    }, [searchTerm, roleFilter, statusFilter, currentPage]);

    const itemsPerPage = 5
    // const filteredUsers = users.filter(user =>
    //     (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    //     (roleFilter === '' || user.role === roleFilter) &&
    //     (statusFilter === '' || user.status === statusFilter)
    // )

    // const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)
    // const paginatedUsers = filteredUsers.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // )

    const handleBlockUnblock = (user: User) => {
        setSelectedUser(user)
        setActionType(user.isBlocked ? 'unblock' : 'block');
        setModalOpen(true);
    }

    const confirmBlockUnblock = async () => {
        const response = await axiosInstance.post<{ updatedUser: User, message: string }>("/admin/users/block-unblock", { userId: selectedUser?.userId, isBlocked: !selectedUser?.isBlocked });
        toast.success(response.data.message);
        setUsers(users.map(u =>
            u.userId === response.data.updatedUser.userId
                ? { ...u, isBlocked: response.data.updatedUser.isBlocked }
                : u
        ))
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="relative mb-4 md:mb-0 md:w-64">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <div className="flex space-x-4">
                    <select
                        className="border rounded-lg px-4 py-2"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        {/* <option value="Admin">Admin</option> */}
                        <option value="regularUser">Regular User</option>
                        <option value="theatreOwner">Theatre Owner</option>
                    </select>
                    <select
                        className="border rounded-lg px-4 py-2"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="false">Unblocked</option>
                        <option value="true">Blocked</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.userId}>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{user.userId}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex min-w-16 justify-center text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleBlockUnblock(user)}
                                        className={`px-4 min-w-24 py-2 rounded-md text-white ${user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                            }`}
                                    >
                                        {user.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div>
                    {/* <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of{' '}
                        <span className="font-medium">{filteredUsers.length}</span> results
                    </p> */}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-md disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-gray-700">
                        {/* Page {currentPage} of {pageCount} */}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                        // disabled={currentPage === pageCount}
                        className="px-3 py-1 border rounded-md disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmBlockUnblock}
                // onConfirm={() => console.log('ccc')}
                target={selectedUser?.email}
                action={actionType}
            />
        </div>
    )
}


export default UserManagement;